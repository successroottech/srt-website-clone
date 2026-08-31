'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  decimals?: number
  end: number
  suffix?: string
}

export function AnimatedNumber({ decimals = 0, end, suffix = '' }: Props) {
  const [value, setValue] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setValue(end)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const startedAt = performance.now()
        const duration = 1400
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const factor = 10 ** decimals
          setValue(Math.round(end * eased * factor) / factor)
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.35 },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [decimals, end])

  return (
    <strong aria-label={`${end.toFixed(decimals)}${suffix}`} ref={elementRef}>
      {value.toFixed(decimals)}{suffix}
    </strong>
  )
}
