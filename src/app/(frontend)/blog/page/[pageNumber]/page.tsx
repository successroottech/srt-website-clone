import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import PageClient from '../../../posts/page.client'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function BlogPageNumber({ params }: Args) {
  const { pageNumber } = await params
  const sanitizedPageNumber = Number(pageNumber)
  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 1) notFound()

  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })
  if (!posts.docs.length) notFound()

  return (
    <main className="posts-page">
      <PageClient />
      <section className="posts-hero posts-hero--compact">
        <div className="container posts-hero-inner">
          <span className="posts-kicker">SRT Intelligence</span>
          <h1>Ideas for the AI-first era.</h1>
          <p>Practical insights on AI, data, cloud, cybersecurity, and modern technology careers.</p>
        </div>
      </section>
      <section className="posts-index">
        <div className="container posts-range">
          <PageRange collection="posts" currentPage={posts.page} limit={12} totalDocs={posts.totalDocs} />
        </div>
        <CollectionArchive posts={posts.docs} />
        <div className="container posts-pagination">
          {posts.page && posts.totalPages > 1 && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { pageNumber } = await params
  return {
    title: `Technology Insights – Page ${pageNumber}`,
    description:
      'Explore practical insights on artificial intelligence, data analytics, cloud, cybersecurity, and career-ready technology skills.',
    alternates: { canonical: `/blog/page/${pageNumber}/` },
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })
  const totalPages = Math.ceil(totalDocs / 12)
  return Array.from({ length: totalPages }, (_, index) => ({ pageNumber: String(index + 1) }))
}
