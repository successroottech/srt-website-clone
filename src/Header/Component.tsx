import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo/Logo'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { MobileNavigation } from './MobileNavigation'

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
        <MobileNavigation links={links} />
        <a
          aria-label="Chat with SRT on WhatsApp"
          className="header-cta"
          href="https://wa.me/918939069135"
          title="Chat with SRT on WhatsApp"
        >
          <WhatsAppIcon height={24} width={24} />
        </a>
      </div>
    </header>
  )
}
