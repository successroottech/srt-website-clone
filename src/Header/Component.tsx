import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo/Logo'

const links = [
  ['Home', '/'],
  ['About Us', '/about-us/'],
  ['Services', '/services/'],
  ['Software Development', '/software-development/'],
  ['Courses', '/it-courses-chennai/'],
  ['Placements', '/it-job-placement-training-chennai/'],
  ['Blog', '/blog/'],
  ['Contact Us', '/contact-us/'],
]

export async function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" aria-label="Success Root Technologies home">
          <Logo loading="eager" priority="high" />
        </Link>
        <nav aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation menu">
            <span></span><span></span><span></span>
          </summary>
          <nav aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
        </details>
        <a className="header-cta" href="https://wa.me/918939069135">Start a conversation</a>
      </div>
    </header>
  )
}
