'use client'

import Link from 'next/link'
import React from 'react'

export default function SimplePostCreateButton() {
  return (
    <Link className="srt-simple-post-create" href="/admin/collections/posts/create?simple=1">
      Create Simple Post
    </Link>
  )
}
