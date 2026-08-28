'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

type MobileNavigationProps = {
  links: string[][]
}

export function MobileNavigation({ links }: MobileNavigationProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const pathname = usePathname()

  const closeMenu = () => {
    detailsRef.current?.removeAttribute('open')
  }

  useEffect(() => {
    closeMenu()
  }, [pathname])

  return (
    <details className="mobile-nav" ref={detailsRef}>
      <summary aria-label="Open navigation menu">
        <span></span><span></span><span></span>
      </summary>
      <nav aria-label="Mobile navigation">
        {links.map(([label, href]) => (
          <Link href={href} key={href} onClick={closeMenu}>
            {label}
          </Link>
        ))}
      </nav>
    </details>
  )
}
