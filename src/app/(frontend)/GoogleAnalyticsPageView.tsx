'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

type GoogleAnalyticsPageViewProps = {
  measurementID: string
}

type GoogleTagWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

const isProductionHost = (hostname: string) =>
  hostname === 'successroottech.com' || hostname === 'www.successroottech.com'

export function GoogleAnalyticsPageView({ measurementID }: GoogleAnalyticsPageViewProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (!isProductionHost(window.location.hostname)) return

    const gtag = (window as GoogleTagWindow).gtag
    if (!gtag) return

    gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: `${pathname}${window.location.search}`,
      send_to: measurementID,
    })
  }, [measurementID, pathname])

  return null
}
