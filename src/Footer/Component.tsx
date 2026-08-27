import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/">
            <Logo />
          </Link>
          <p>Career-focused technology training with placement support and modern software development for growing businesses.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/it-courses-chennai/">Training & Courses</Link>
          <Link href="/company-profile/">Company Profile</Link>
          <Link href="/ai-workshop/">AI Workshop Enrollment</Link>
          <Link href="/it-job-placement-training-chennai/">Placement Support</Link>
          <Link href="/software-development">Software Development</Link>
          <Link href="/blog/">AI Insights</Link>
          <Link href="/faq/">FAQs</Link>
        </div>
        <div>
          <h2>Start building</h2>
          <a href="tel:+918939069135">+91 89390 69135</a>
          <a href="mailto:contact@successroottech.com">contact@successroottech.com</a>
          <span>Chennai · Online · Hybrid</span>
        </div>
        <div>
          <h2>Customer policies</h2>
          <Link href="/about-us/">About Us</Link>
          <Link href="/contact-us/">Contact Us</Link>
          <Link href="/terms-and-conditions/">Terms & Conditions</Link>
          <Link href="/privacy-policy/">Privacy Policy</Link>
          <Link href="/refund-and-cancellation-policy/">Refund & Cancellation</Link>
          <Link href="/shipping-and-delivery-policy/">Delivery Policy</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Success Root Technologies · Training & Software Development</span>
        <span>West Mambalam, Chennai, Tamil Nadu 600033</span>
      </div>
    </footer>
  )
}
