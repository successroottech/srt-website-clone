import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import RichText from '@/components/RichText'
import { PostHero } from '@/heros/PostHero'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 2000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const pageParams = pages.docs
    .filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  const pageSlugs = new Set(pageParams.map(({ slug }) => slug))
  const postParams = posts.docs
    .filter(({ slug }) => Boolean(slug) && !pageSlugs.has(slug))
    .map(({ slug }) => ({ slug }))

  return [...pageParams, ...postParams]
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

function withoutFirstRichTextNode<T>(value: T): T {
  if (!value || typeof value !== 'object') return value
  const root = (value as { root?: { children?: unknown[] } }).root
  if (!Array.isArray(root?.children) || root.children.length === 0) return value

  return {
    ...value,
    root: {
      ...root,
      children: root.children.slice(1),
    },
  } as T
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })
  const post = page ? null : await queryPostBySlug({ slug: decodedSlug })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page && !post) {
    return <PayloadRedirects url={url} />
  }

  if (post) {
    const siteURL = getServerSideURL()
    const image =
      typeof post.meta?.image === 'object' && post.meta.image?.url
        ? new URL(post.meta.image.url, siteURL).toString()
        : typeof post.heroImage === 'object' && post.heroImage?.url
          ? new URL(post.heroImage.url, siteURL).toString()
          : undefined
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.meta?.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      image,
      mainEntityOfPage: `${siteURL}/${post.slug}/`,
      author: {
        '@type': 'Organization',
        name: 'Success Root Technologies',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Success Root Technologies',
        logo: {
          '@type': 'ImageObject',
          url: `${siteURL}/srt-logo.png`,
        },
      },
    }

    return (
      <article className="post-detail-page">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          type="application/ld+json"
        />
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}
        <PostHero post={post} />
        <div className="post-detail-content flex flex-col items-center gap-4">
          <div className="container">
            {post.legacyHTML ? (
              <div
                className="legacy-content prose prose-lg max-w-[48rem] mx-auto"
                dangerouslySetInnerHTML={{ __html: post.legacyHTML }}
              />
            ) : post.content ? (
              <RichText
                className="max-w-[48rem] mx-auto"
                data={post.title ? post.content : withoutFirstRichTextNode(post.content)}
                enableGutter={false}
              />
            ) : null}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <RelatedPosts
                className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                docs={post.relatedPosts.filter((relatedPost) => typeof relatedPost === 'object')}
              />
            )}
          </div>
        </div>
      </article>
    )
  }

  if (!page) return <PayloadRedirects url={url} />

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      {page.legacyHTML ? (
        <div
          className="legacy-content prose prose-lg container max-w-[60rem] py-12"
          dangerouslySetInnerHTML={{ __html: page.legacyHTML }}
        />
      ) : (
        <RenderBlocks blocks={layout || []} />
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })
  const post = page ? null : await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({
    doc: page || post,
    canonicalPath: `/${decodedSlug}/`,
    type: post ? 'article' : 'website',
  })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
