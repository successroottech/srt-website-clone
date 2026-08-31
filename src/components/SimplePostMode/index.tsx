'use client'

import { useEffect } from 'react'

export default function SimplePostMode() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const normalizedPath = window.location.pathname.replace(/\/$/, '')
    const isSimpleCreate =
      normalizedPath.endsWith('/admin/collections/posts/create') && params.get('simple') === '1'

    if (!isSimpleCreate) return

    window.location.replace('/admin/quick-post/')
  }, [])

  return null
}
