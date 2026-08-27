import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className, loading = 'lazy', priority = 'low' } = props

  return (
    <span className={`brand-lockup ${className || ''}`} aria-label="Success Root Technologies">
      <Image
        alt="Success Root Technologies — From Basic to Brilliance"
        className="brand-logo-lockup"
        height={213}
        loading={loading}
        priority={priority === 'high'}
        sizes="(max-width: 640px) 190px, 250px"
        src="/srt-logo-lockup.png"
        unoptimized
        width={683}
      />
    </span>
  )
}
