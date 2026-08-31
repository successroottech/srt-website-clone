import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, excerpt, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <header className="post-detail-hero">
      <div className="container post-detail-shell">
        <div className="post-detail-heading">
          <div className="post-detail-categories">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          {title && <h1>{title}</h1>}
          {excerpt && <p className="post-detail-excerpt">{excerpt}</p>}

          <div className="post-detail-meta">
            {hasAuthors && (
              <div>
                <small>Author</small>
                <span>{formatAuthors(populatedAuthors)}</span>
              </div>
            )}
            {publishedAt && (
              <div>
                <small>Date published</small>
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
        {heroImage && typeof heroImage !== 'string' && (
          <div className="post-detail-image">
            <Media priority imgClassName="post-detail-image-element" resource={heroImage} />
          </div>
        )}
      </div>
    </header>
  )
}
