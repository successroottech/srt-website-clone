'use client'

import { useEffect } from 'react'

const conversionSendTo = 'AW-17697110474/TTn8CMqX0-scEMrz0fZB'
const productionHosts = new Set(['successroottech.com', 'www.successroottech.com'])
const whatsappHosts = new Set(['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'])
const duplicateWindowMs = 1500

let lastConversionAt = 0

type GoogleTagWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

function isWhatsAppLink(link: HTMLAnchorElement) {
  try {
    return whatsappHosts.has(new URL(link.href, window.location.href).hostname.toLowerCase())
  } catch {
    return false
  }
}

export function WhatsAppConversionTracker() {
  useEffect(() => {
    if (!productionHosts.has(window.location.hostname.toLowerCase())) return

    const trackClick = (event: MouseEvent) => {
      if (event.button !== 0) return

      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest<HTMLAnchorElement>('a[href]')
      if (!link || !isWhatsAppLink(link)) return

      const gtag = (window as GoogleTagWindow).gtag
      if (typeof gtag !== 'function') return

      const now = Date.now()
      if (now - lastConversionAt < duplicateWindowMs) return
      lastConversionAt = now

      gtag('event', 'conversion', {
        send_to: conversionSendTo,
        value: 1.0,
        currency: 'INR',
      })
    }

    document.addEventListener('click', trackClick, true)
    return () => document.removeEventListener('click', trackClick, true)
  }, [])

  return null
}
