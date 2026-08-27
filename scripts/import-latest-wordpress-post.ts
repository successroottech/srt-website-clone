import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'
import type { Post } from '@/payload-types'

const source = 'https://successroottech.com'
const slug =
  'analytics-combo-course-in-chennai-learn-advanced-excel-sql-python-power-bi-for-a-successful-data-analytics-career'

type WPPost = {
  categories?: number[]
  content?: { rendered?: string }
  date?: string
  excerpt?: { rendered?: string }
  id: number
  link?: string
  slug: string
  title: { rendered: string }
}

type WPCategory = {
  id: number
  name: string
  slug: string
}

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

const emptyRichText: NonNullable<Post['content']> = {
  root: {
    type: 'root',
    children: [],
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  },
}

const response = await fetch(`${source}/wp-json/wp/v2/posts?slug=${slug}&_embed=1`)
if (!response.ok) throw new Error(`WordPress returned ${response.status}`)
const [post] = (await response.json()) as WPPost[]
if (!post) throw new Error(`WordPress post not found: ${slug}`)

const payload = await getPayload({ config })
const existing = await payload.find({
  collection: 'posts',
  limit: 1,
  where: {
    or: [{ wordpressId: { equals: post.id } }, { slug: { equals: post.slug } }],
  },
})

if (existing.totalDocs) {
  console.log(`Post already imported: ${post.slug}`)
  process.exit(0)
}

const categoryIDs: number[] = []
for (const categoryID of post.categories || []) {
  const categoryResponse = await fetch(`${source}/wp-json/wp/v2/categories/${categoryID}`)
  if (!categoryResponse.ok) continue
  const category = (await categoryResponse.json()) as WPCategory
  const found = await payload.find({
    collection: 'categories',
    limit: 1,
    where: { slug: { equals: category.slug } },
  })
  const document =
    found.docs[0] ||
    (await payload.create({
      collection: 'categories',
      data: { slug: category.slug, title: decode(category.name) },
    }))
  categoryIDs.push(document.id)
}

await payload.create({
  collection: 'posts',
  context: { disableRevalidate: true },
  data: {
    _status: 'published',
    categories: categoryIDs,
    content: emptyRichText,
    legacyHTML: safeHTML(post.content?.rendered),
    meta: {
      description: decode(post.excerpt?.rendered).slice(0, 155),
      title: decode(post.title.rendered).slice(0, 60),
    },
    originalURL: post.link,
    publishedAt: post.date,
    slug: post.slug,
    title: decode(post.title.rendered),
    wordpressId: post.id,
  },
})

console.log(`Imported WordPress post ${post.id}: ${post.slug}`)
process.exit(0)
