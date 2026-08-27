import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container posts-archive')}>
      <div className="post-grid">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <Card
                className="h-full"
                doc={result}
                key={result.slug || index}
                relationTo="posts"
                showCategories
              />
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
