import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

const SOURCE = 'https://successroottech.com'
const API = `${SOURCE}/wp-json/wp/v2`
const adminEmail = process.env.SRT_ADMIN_EMAIL || 'contact@successroottech.com'
const adminPassword = process.env.SRT_ADMIN_PASSWORD

if (!adminPassword) throw new Error('SRT_ADMIN_PASSWORD is required')

type WPItem = {
  id: number
  date?: string
  modified?: string
  slug: string
  link?: string
  title: { rendered: string }
  name?: string
  content?: { rendered: string }
  excerpt?: { rendered: string }
  featured_media?: number
  categories?: number[]
  source_url?: string
  mime_type?: string
  alt_text?: string
}

const payload = await getPayload({ config })

const decode = (input = '') =>
  input
    .replace(/&#8211;|&#x2013;/g, '–')
    .replace(/&#8217;|&#x2019;/g, '’')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/<[^>]+>/g, '')
    .trim()

const safeHTML = (html = '') =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+=(?:"[^"]*"|'[^']*')/gi, '')
    .replace(/\sjavascript:/gi, ' ')

const emptyRichText = {
  root: {
    type: 'root',
    children: [],
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  },
}

async function fetchAll(endpoint: string): Promise<WPItem[]> {
  const first = await fetch(`${API}/${endpoint}?per_page=100&page=1&_embed=1`)
  if (!first.ok) throw new Error(`${endpoint}: ${first.status}`)
  const pages = Number(first.headers.get('x-wp-totalpages') || 1)
  const all = (await first.json()) as WPItem[]

  for (let page = 2; page <= pages; page += 1) {
    const response = await fetch(`${API}/${endpoint}?per_page=100&page=${page}&_embed=1`)
    if (!response.ok) throw new Error(`${endpoint} page ${page}: ${response.status}`)
    all.push(...((await response.json()) as WPItem[]))
    console.log(`${endpoint}: ${all.length} fetched`)
  }
  return all
}

async function ensureAdmin() {
  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    where: { email: { equals: adminEmail } },
  })
  if (!existing.totalDocs) {
    await payload.create({
      collection: 'users',
      data: { email: adminEmail, name: 'Success Root Technologies', password: adminPassword },
    })
  }
}

async function run() {
  await ensureAdmin()

  const [wpCategories, wpMedia, wpPosts, wpPages, wpCourses] = await Promise.all([
    fetchAll('categories'),
    fetchAll('media'),
    fetchAll('posts'),
    fetchAll('pages'),
    fetchAll('courses'),
  ])

  const categoryMap = new Map<number, number | string>()
  for (const item of wpCategories) {
    const existing = await payload.find({
      collection: 'categories',
      limit: 1,
      where: { slug: { equals: item.slug } },
    })
    const doc =
      existing.docs[0] ||
      (await payload.create({
        collection: 'categories',
        data: { title: decode(item.name || item.title?.rendered || item.slug), slug: item.slug },
      }))
    categoryMap.set(item.id, doc.id)
  }

  const mediaMap = new Map<number, number | string>()
  const urlMap = new Map<string, string>()
  for (const [index, item] of wpMedia.entries()) {
    if (!item.source_url) continue
    const existing = await payload.find({
      collection: 'media',
      limit: 1,
      where: { alt: { equals: `wp:${item.id}` } },
    })
    let doc = existing.docs[0]
    if (!doc) {
      try {
        const response = await fetch(item.source_url)
        if (!response.ok) throw new Error(String(response.status))
        const buffer = Buffer.from(await response.arrayBuffer())
        const originalName = new URL(item.source_url).pathname.split('/').pop() || `media-${item.id}`
        const cleanName = originalName.replace(/[^\w.-]+/g, '-')
        doc = await payload.create({
          collection: 'media',
          data: { alt: `wp:${item.id}` },
          file: {
            data: buffer,
            mimetype: item.mime_type || response.headers.get('content-type') || 'application/octet-stream',
            name: `${item.id}-${cleanName}`,
            size: buffer.length,
          },
        })
      } catch (error) {
        console.warn(`media ${item.id} skipped: ${String(error)}`)
        continue
      }
    }
    mediaMap.set(item.id, doc.id)
    if (doc.url) urlMap.set(item.source_url, doc.url)
    if ((index + 1) % 25 === 0) console.log(`media: ${index + 1}/${wpMedia.length} imported`)
  }

  const localizeHTML = (html = '') => {
    let result = safeHTML(html)
    for (const [source, local] of urlMap) result = result.split(source).join(local)
    return result
  }

  for (const [index, item] of wpPosts.entries()) {
    const existing = await payload.find({
      collection: 'posts',
      limit: 1,
      where: { wordpressId: { equals: item.id } },
    })
    const data = {
      title: decode(item.title.rendered),
      slug: item.slug,
      wordpressId: item.id,
      originalURL: item.link,
      legacyHTML: localizeHTML(item.content?.rendered),
      content: emptyRichText,
      heroImage: item.featured_media ? mediaMap.get(item.featured_media) : undefined,
      categories: item.categories?.map((id) => categoryMap.get(id)).filter(Boolean),
      publishedAt: item.date,
      meta: {
        title: decode(item.title.rendered).slice(0, 60),
        description: decode(item.excerpt?.rendered).slice(0, 155),
        image: item.featured_media ? mediaMap.get(item.featured_media) : undefined,
      },
      _status: 'published' as const,
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'posts',
        id: existing.docs[0].id,
        data: data as never,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'posts',
        data: data as never,
        context: { disableRevalidate: true },
      })
    }
    if ((index + 1) % 25 === 0) console.log(`posts: ${index + 1}/${wpPosts.length} imported`)
  }

  for (const item of [...wpPages, ...wpCourses]) {
    const slug = item.slug === 'home' ? 'legacy-home' : item.slug
    const existing = await payload.find({
      collection: 'pages',
      limit: 1,
      where: { wordpressId: { equals: item.id } },
    })
    const data = {
      title: decode(item.title.rendered),
      slug,
      wordpressId: item.id,
      originalURL: item.link,
      legacyHTML: localizeHTML(item.content?.rendered),
      hero: { type: 'none' as const },
      layout: [],
      publishedAt: item.date,
      meta: {
        title: decode(item.title.rendered).slice(0, 60),
        description: decode(item.excerpt?.rendered).slice(0, 155),
      },
      _status: 'published' as const,
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: data as never,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'pages',
        data: data as never,
        context: { disableRevalidate: true },
      })
    }
  }

  console.log(
    `Migration complete: ${wpPosts.length} posts, ${wpPages.length} pages, ${wpCourses.length} courses, ${mediaMap.size} media.`,
  )
}

await run()
process.exit(0)
