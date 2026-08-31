'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'content' | 'excerpt' | 'heroImage' | 'meta' | 'title'
>

const getRichTextPreview = (value: unknown): string => {
  if (!value) return ''
  if (Array.isArray(value)) return value.map(getRichTextPreview).join(' ')
  if (typeof value !== 'object') return ''

  const node = value as Record<string, unknown>
  if (typeof node.text === 'string') return node.text
  return Object.values(node).map(getRichTextPreview).join(' ')
}

const getRichTextChildren = (value: unknown): unknown[] => {
  if (!value || typeof value !== 'object') return []
  const root = (value as { root?: { children?: unknown[] } }).root
  return Array.isArray(root?.children) ? root.children : []
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const [imageFailed, setImageFailed] = useState(false)
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, content, excerpt, heroImage, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const contentChildren = getRichTextChildren(content)
  const derivedTitle = getRichTextPreview(contentChildren[0]).replace(/\s+/g, ' ').trim()
  const titleToUse = titleFromProps || title || derivedTitle
  const bodyContent = title ? contentChildren : contentChildren.slice(1)
  const preview = excerpt || description || getRichTextPreview(bodyContent)
  const sanitizedDescription = preview?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = relationTo === 'posts' ? `/${slug}/` : `/${slug}/`
  const cardImage = heroImage || metaImage
  const hasImage = Boolean(cardImage && typeof cardImage !== 'string')
  const showImage = hasImage && !imageFailed

  return (
    <article
      className={cn('post-card', !showImage && 'post-card--text-only', className)}
      ref={card.ref}
    >
      {showImage && cardImage && typeof cardImage !== 'string' && (
        <div className="post-card-media">
          <Media
            imgClassName="post-card-image"
            onError={() => setImageFailed(true)}
            resource={cardImage}
            size="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="post-card-body">
        {showCategories && hasCategories && (
          <div className="post-card-categories">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category

                const categoryTitle = titleFromCategory || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment> / </Fragment>}
                  </Fragment>
                )
              }

              return null
            })}
          </div>
        )}
        {titleToUse && (
          <div className="post-card-title">
            <h2>
              <Link href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h2>
          </div>
        )}
        {preview && <p className="post-card-description">{sanitizedDescription}</p>}
        <Link className="post-card-link" href={href} aria-label={`Read ${titleToUse || 'post'}`}>
          View more <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </article>
  )
}
