import configPromise from '@payload-config'
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Check, FileUser, MessagesSquare, Target } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'

const slug = 'it-job-placement-training-chennai'

async function getPageDocument() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] || null
}

const steps = [
  ['Build', 'Complete practical learning and projects aligned with your target role.'],
  ['Present', 'Improve your resume, LinkedIn, GitHub and portfolio evidence.'],
  ['Practice', 'Prepare technical answers, project walkthroughs and communication.'],
  ['Apply', 'Use a focused job-search plan and suitable placement opportunities.'],
]

export default function PlacementTrainingPage() {
  const siteURL = getServerSideURL()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'IT Job Placement Training and Career Preparation',
    description:
      'Technology training, portfolio preparation, resume support, mock interviews and placement assistance for eligible candidates.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Success Root Technologies',
      url: siteURL,
    },
    areaServed: 'Chennai',
    url: `${siteURL}/${slug}/`,
  }

  return (
    <main className="audience-page placement-audience-page">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} type="application/ld+json" />
      <section className="audience-hero">
        <div className="container audience-hero-grid">
          <div>
            <span className="ai-kicker">Job seekers · Freshers · Career changers</span>
            <h1>Turn your learning into interview-ready proof.</h1>
            <p>
              Build practical skills, strengthen your professional profile and prepare to explain
              your work confidently through structured placement assistance.
            </p>
            <div className="audience-actions">
              <Link className="ai-button ai-button-gold" href="/it-courses-chennai/">
                Choose a career course <ArrowRight size={18} />
              </Link>
              <Link className="ai-button ai-button-ghost" href="/#placements">
                View success stories
              </Link>
            </div>
          </div>
          <div className="placement-promise-card">
            <BadgeCheck size={28} />
            <span>Responsible placement support</span>
            <h2>Preparation, guidance and opportunity—not an unrealistic guarantee.</h2>
            <p>
              Hiring decisions depend on employer requirements, learner eligibility, skills and
              interview performance. Our role is to help eligible candidates become better prepared.
            </p>
          </div>
        </div>
      </section>

      <section className="placement-journey">
        <div className="container">
          <div className="ai-section-head">
            <div><span className="ai-kicker">The career launch system</span><h2>From course completion to confident applications</h2></div>
          </div>
          <div className="placement-step-grid">
            {steps.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="placement-support-detail">
        <div className="container placement-support-grid">
          <div>
            <span className="ai-kicker">What support can include</span>
            <h2>Build every part of your candidate story</h2>
            <p>Support is aligned to your selected program, target role and readiness.</p>
          </div>
          <div className="placement-support-cards">
            <article><FileUser /><h3>Profile preparation</h3><p>Resume, LinkedIn, GitHub, portfolio and project presentation.</p></article>
            <article><MessagesSquare /><h3>Interview practice</h3><p>Technical questions, HR conversations and project walkthroughs.</p></article>
            <article><Target /><h3>Focused job search</h3><p>Role selection, application strategy and suitable opportunity guidance.</p></article>
            <article><BriefcaseBusiness /><h3>Professional readiness</h3><p>Communication, workplace expectations and confident follow-up.</p></article>
          </div>
        </div>
      </section>

      <section className="placement-readiness">
        <div className="container">
          <div>
            <span className="ai-kicker">Eligibility matters</span>
            <h2>What helps candidates get the most from placement assistance</h2>
          </div>
          <ul>
            {['Complete the required learning and assignments', 'Build and explain your projects independently', 'Attend preparation sessions and act on feedback', 'Apply consistently to roles matching your current skills'].map((item) => (
              <li key={item}><Check size={17} /> {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="audience-cta">
        <div className="container">
          <div><span className="ai-kicker">Ready to build your career plan?</span><h2>Start with the right skills and realistic next steps.</h2></div>
          <a className="ai-button ai-button-gold" href="https://wa.me/918939069135">
            Talk to a career advisor <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    canonicalPath: `/${slug}/`,
    doc: await getPageDocument(),
  })
}
