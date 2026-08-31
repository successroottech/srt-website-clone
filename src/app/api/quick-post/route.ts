import configPromise from '@payload-config'
import { randomUUID } from 'crypto'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { getPayload } from 'payload'

export const runtime = 'nodejs'

const allowedTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
])

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)

const toLexical = (description: string) => ({
  root: {
    children: description
      .split(/\r?\n/)
      .filter((line) => line.trim())
      .map((line) => ({
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: line.trim(),
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        type: 'paragraph',
        version: 1,
      })),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root',
    version: 1,
  },
})

export async function POST(request: Request) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: request.headers })

  if (!user) {
    return Response.json({ message: 'Please log in as an administrator.' }, { status: 403 })
  }

  const formData = await request.formData().catch(() => null)
  const description = formData?.get('description')
  const image = formData?.get('image')

  if (typeof description !== 'string' || !description.trim()) {
    return Response.json({ message: 'Paste the blog description.' }, { status: 400 })
  }

  if (!(image instanceof File)) {
    return Response.json({ message: 'Choose a blog image.' }, { status: 400 })
  }

  const extension = allowedTypes.get(image.type)
  if (!extension || image.size < 1_000 || image.size > 15_000_000) {
    return Response.json(
      { message: 'Upload a JPG, PNG or WebP image smaller than 15 MB.' },
      { status: 400 },
    )
  }

  const firstLine = description.split(/\r?\n/).find((line) => line.trim())?.trim() || 'SRT Blog Post'
  const timestamp = Date.now()
  const slug = `${slugify(firstLine) || 'srt-blog-post'}-${timestamp}`
  const tempDirectory = path.join(tmpdir(), 'srt-quick-posts')
  const tempFile = path.join(tempDirectory, `${randomUUID()}.${extension}`)
  let mediaID: number | string | undefined

  try {
    await mkdir(tempDirectory, { recursive: true })
    await writeFile(tempFile, Buffer.from(await image.arrayBuffer()))

    const media = await payload.create({
      collection: 'media',
      data: { alt: firstLine.slice(0, 160) },
      filePath: tempFile,
      overrideAccess: false,
      user,
    })
    mediaID = media.id

    const post = await payload.create({
      collection: 'posts',
      data: {
        _status: 'published',
        content: toLexical(description.trim()),
        heroImage: media.id,
        publishedAt: new Date().toISOString(),
        slug,
      },
      overrideAccess: false,
      user,
    })

    return Response.json({ id: post.id, slug: post.slug, success: true })
  } catch (error) {
    if (mediaID) {
      await payload
        .delete({ collection: 'media', id: mediaID, overrideAccess: true })
        .catch(() => undefined)
    }
    console.error('Quick post creation failed', error)
    return Response.json({ message: 'The post could not be saved. Please try again.' }, { status: 500 })
  } finally {
    await unlink(tempFile).catch(() => undefined)
  }
}
