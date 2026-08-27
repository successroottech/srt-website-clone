import Link from 'next/link'
import type { ReactNode } from 'react'

const policyLinks = [
  ['/terms-and-conditions/', 'Terms & Conditions'],
  ['/privacy-policy/', 'Privacy Policy'],
  ['/refund-and-cancellation-policy/', 'Refund & Cancellation'],
  ['/shipping-and-delivery-policy/', 'Delivery Policy'],
  ['/contact-us/', 'Contact Us'],
]

type Props = {
  children: ReactNode
  eyebrow: string
  intro: string
  title: string
}

export function CompliancePage({ children, eyebrow, intro, title }: Props) {
  return (
    <main className="compliance-page">
      <section className="compliance-hero">
        <div className="container">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <small>Last updated: 29 July 2026</small>
        </div>
      </section>
      <div className="container compliance-layout">
        <nav aria-label="Customer policies" className="compliance-nav">
          <strong>Customer information</strong>
          {policyLinks.map(([href, label]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
        <article className="compliance-content">{children}</article>
      </div>
    </main>
  )
}

export function BusinessContact() {
  return (
    <div className="compliance-contact">
      <strong>Success Root Technologies</strong>
      <span>Old No. 8/1, New No. 15/1, First Floor, Rajaji Street, West Mambalam, Chennai, Tamil Nadu 600033, India</span>
      <a href="tel:+918939069135">+91 89390 69135</a>
      <a href="mailto:contact@successroottech.com">contact@successroottech.com</a>
    </div>
  )
}
