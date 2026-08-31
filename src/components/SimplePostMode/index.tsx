'use client'

import { useEffect } from 'react'

const hiddenFieldIDs = ['field-title', 'field-excerpt', 'field-legacyHTML']

export default function SimplePostMode() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const normalizedPath = window.location.pathname.replace(/\/$/, '')
    const isSimpleCreate =
      normalizedPath.endsWith('/admin/collections/posts/create') && params.get('simple') === '1'

    if (!isSimpleCreate) return

    const root = document.documentElement
    root.classList.add('srt-simple-post-mode')

    const simplifyForm = () => {
      hiddenFieldIDs.forEach((id) => {
        const field = document.getElementById(id)
        const wrapper = field?.closest('.field-type') || field
        wrapper?.classList.add('srt-simple-post-hidden')
      })

      document.querySelectorAll<HTMLElement>('[role="tab"]').forEach((tab) => {
        const label = tab.textContent?.trim()
        if (label === 'Meta' || label === 'SEO') tab.classList.add('srt-simple-post-hidden')
      })
    }

    simplifyForm()
    const observer = new MutationObserver(simplifyForm)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      root.classList.remove('srt-simple-post-mode')
    }
  }, [])

  return null
}
