import Link from 'next/link'
import type { Metadata } from 'next'

import { BusinessContact, CompliancePage } from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'About Success Root Technologies',
  description: 'Learn about Success Root Technologies, a Chennai technology training and software development provider.',
  alternates: { canonical: '/about-us/' },
}

export default function AboutPage() {
  return (
    <CompliancePage
      eyebrow="About our business"
      intro="Success Root Technologies provides practical technology training, career support and software development services from Chennai."
      title="About Success Root Technologies"
    >
      <section>
        <h2>What we do</h2>
        <p>We deliver instructor-led technology training for students, freshers, working professionals, career returners, business owners and trainers. Our learning areas include artificial intelligence, programming, data analytics, web development, business tools and job-readiness skills.</p>
      </section>
      <section>
        <h2>AI workshop</h2>
        <p>Our practical AI workshop introduces responsible AI usage, prompting, productivity and automation. The displayed registration fee is INR 99. Schedule and joining information are communicated to registered participants.</p>
        <Link className="compliance-cta" href="/ai-workshop/">View AI Workshop and INR 99 pricing</Link>
      </section>
      <section>
        <h2>Software development</h2>
        <p>We also design and build web applications, AI-enabled solutions and business automation systems. Software project pricing and delivery timelines are provided through a written proposal based on the confirmed scope.</p>
      </section>
      <section>
        <h2>Business details</h2>
        <BusinessContact />
      </section>
    </CompliancePage>
  )
}
