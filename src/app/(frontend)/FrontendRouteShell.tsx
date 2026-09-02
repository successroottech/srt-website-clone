'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type FrontendRouteShellProps = {
  children: ReactNode
  standardFooter: ReactNode
  standardHeader: ReactNode
}

export function FrontendRouteShell({
  children,
  standardFooter,
  standardHeader,
}: FrontendRouteShellProps) {
  const pathname = usePathname()
  const isLandingPage = pathname === '/lp' || pathname.startsWith('/lp/')

  return (
    <>
      {!isLandingPage && standardHeader}
      {children}
      {!isLandingPage && standardFooter}
    </>
  )
}
