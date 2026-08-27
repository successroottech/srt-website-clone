import type { Metadata } from 'next'

import { CollectionArchive } from '@/components/CollectionArchive'
import legacyTags from '@/data/legacyTags.json'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

type LegacyTag = {
  name: string
  posts: string[]
  slug: string
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

const tags = legacyTags as LegacyTag[]

export const dynamic = 'force-static'
export const revalidate = 600

export default async function TagArchivePage({ params }: Args) {
  const { slug } = await params
  const tag = tags.find((item) => item.slug === decodeURIComponent(slug))
  if (!tag) notFound()

  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
    pagination: false,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      slug: {
        in: tag.posts,
      },
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <main className="posts-page">
      <section className="posts-hero posts-hero--compact">
        <div className="container posts-hero-inner">
          <span className="posts-kicker">Topic archive</span>
          <h1>{tag.name}</h1>
          <p>Articles and practical learning resources related to {tag.name}.</p>
        </div>
      </section>
      <section className="posts-index">
        <div className="container posts-range">
          Showing {posts.totalDocs} {posts.totalDocs === 1 ? 'article' : 'articles'}
        </div>
        <CollectionArchive posts={posts.docs} />
      </section>
    </main>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const tag = tags.find((item) => item.slug === decodeURIComponent(slug))
  if (!tag) return {}

  return {
    title: `${tag.name} Articles`,
    description: `Explore Success Root Technologies articles and practical resources about ${tag.name}.`,
    alternates: { canonical: `/tag/${tag.slug}/` },
  }
}

export function generateStaticParams() {
  return tags.map(({ slug }) => ({ slug }))
}
