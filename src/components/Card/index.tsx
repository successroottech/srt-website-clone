'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

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

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = relationTo === 'posts' ? `/${slug}/` : `/${slug}/`
  const hasImage = Boolean(metaImage && typeof metaImage !== 'string')
  const showImage = hasImage && !imageFailed

  return (
    <article
      className={cn('post-card', !showImage && 'post-card--text-only', className)}
      ref={card.ref}
    >
      {showImage && typeof metaImage !== 'string' && (
        <div className="post-card-media">
          <Media
            imgClassName="post-card-image"
            onError={() => setImageFailed(true)}
            resource={metaImage}
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
        {description && <p className="post-card-description">{sanitizedDescription}</p>}
        <Link className="post-card-link" href={href} aria-label={`Read ${titleToUse || 'post'}`}>
          Read insight <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </article>
  )
}
