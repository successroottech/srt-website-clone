import configPromise from '@payload-config'
import { ArrowRight, MessageCircleQuestion, PhoneCall } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

import { FAQList, type FAQListItem } from '@/components/FAQList'
import { faqCategoryLabels, type FAQCategory } from '@/data/faqs'
import { getServerSideURL } from '@/utilities/getURL'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Courses, Placement and Software Development',
  description:
    'Answers about Success Root Technologies courses, AI-enabled training, placement assistance, admissions, fees and custom software development in Chennai.',
  alternates: { canonical: '/faq/' },
  openGraph: {
    title: 'Success Root Technologies Frequently Asked Questions',
    description:
      'Find clear answers about technology courses, placement support, admission and software development services.',
    url: '/faq/',
  },
}

export default async function FAQPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'faqs',
    depth: 0,
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    sort: 'sortOrder',
    where: { _status: { equals: 'published' } },
    select: {
      answer: true,
      category: true,
      question: true,
      slug: true,
    },
  })
  const faqs = result.docs as FAQListItem[]
  const siteURL = getServerSideURL()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    url: `${siteURL}/faq/`,
  }
  const categories = Object.keys(faqCategoryLabels) as FAQCategory[]

  return (
    <main className="faq-page">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        type="application/ld+json"
      />
      <section className="faq-hero">
        <div className="container faq-hero-grid">
          <div>
            <span className="ai-kicker"><MessageCircleQuestion size={14} /> Help centre</span>
            <h1>Clear answers before you take the next step</h1>
            <p>
              Explore common questions about training, placement preparation, enrollment and
              software development with Success Root Technologies.
            </p>
          </div>
          <div className="faq-hero-card">
            <span>Need a personal answer?</span>
            <strong>Talk to our team</strong>
            <p>Share your learning goal or software requirement and receive relevant guidance.</p>
            <a href="https://wa.me/918939069135">
              Ask on WhatsApp <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="faq-directory">
        <div className="container">
          {categories.map((category) => {
            const categoryFAQs = faqs.filter((faq) => faq.category === category)
            if (!categoryFAQs.length) return null

            return (
              <section className="faq-category" key={category}>
                <div className="faq-category-heading">
                  <span>{String(categories.indexOf(category) + 1).padStart(2, '0')}</span>
                  <div>
                    <h2>{faqCategoryLabels[category]}</h2>
                    <p>{categoryFAQs.length} practical answers</p>
                  </div>
                </div>
                <FAQList faqs={categoryFAQs} />
              </section>
            )
          })}
        </div>
      </section>

      <section className="faq-contact">
        <div className="container">
          <div>
            <span className="ai-kicker">Still need help?</span>
            <h2>Let&apos;s discuss your goal directly</h2>
          </div>
          <div>
            <a href="tel:+918939069135"><PhoneCall size={17} /> Call +91 89390 69135</a>
            <Link href="/contact-us/">Contact us <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
