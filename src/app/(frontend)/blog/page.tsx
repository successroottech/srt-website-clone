import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from '../posts/page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <main className="posts-page">
      <PageClient />
      <section className="posts-hero">
        <div className="container posts-hero-inner">
          <span className="posts-kicker">SRT Intelligence</span>
          <h1>Ideas for the AI-first era.</h1>
          <p>
            Practical insights on AI, data, cloud, cybersecurity, and the skills shaping modern
            careers.
          </p>
        </div>
      </section>

      <section className="posts-index">
        <div className="container posts-range">
          <PageRange collection="posts" currentPage={posts.page} limit={12} totalDocs={posts.totalDocs} />
        </div>
        <CollectionArchive posts={posts.docs} />
        <div className="container posts-pagination">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'AI, Data & Technology Insights',
  description:
    'Explore practical insights on artificial intelligence, data analytics, cloud, cybersecurity, and career-ready technology skills.',
  alternates: { canonical: '/blog/' },
}
