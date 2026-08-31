'use client'

import Link from 'next/link'
import React from 'react'

export default function SimplePostCreateButton() {
  return (
    <Link className="srt-simple-post-create" href="/admin/quick-post/">
      Create Quick Post
    </Link>
  )
}
