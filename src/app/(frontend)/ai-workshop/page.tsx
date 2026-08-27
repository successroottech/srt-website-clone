import { Bot, BrainCircuit, Check, Lightbulb, Sparkles, Workflow } from 'lucide-react'
import type { Metadata } from 'next'

import { WorkshopEnrollmentForm } from '@/components/WorkshopEnrollmentForm'
import { getServerSideURL } from '@/utilities/getURL'

export const metadata: Metadata = {
  title: 'AI Workshop Enrollment in Chennai',
  description:
    'Enroll for the Success Root Technologies AI workshop covering practical AI tools, prompting, productivity and automation for students, professionals and businesses.',
  alternates: { canonical: '/ai-workshop/' },
  openGraph: {
    title: 'AI Workshop Enrollment | Success Root Technologies',
    description:
      'Register your interest in a practical AI workshop for students, freshers, professionals, trainers and business owners.',
    url: '/ai-workshop/',
  },
}

const outcomes = [
  ['AI foundations', 'Understand what modern AI can do, where it helps and where human judgment matters.', BrainCircuit],
  ['Better prompting', 'Create clear prompts, reusable instructions and more reliable AI-assisted workflows.', Sparkles],
  ['Everyday productivity', 'Apply AI to research, documents, spreadsheets, communication and idea development.', Lightbulb],
  ['Practical automation', 'See how tools, data and repeatable tasks can connect through responsible automation.', Workflow],
]

export default function AIWorkshopPage() {
  const siteURL = getServerSideURL()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Workshop Enrollment',
    description:
      'AI workshop enrollment for students, freshers, working professionals, career returners, business owners and trainers.',
    url: `${siteURL}/ai-workshop/`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Success Root Technologies',
      url: siteURL,
    },
  }

  return (
    <main className="workshop-page">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} type="application/ld+json" />
      <section className="workshop-hero">
        <div className="workshop-orb workshop-orb-one" aria-hidden="true" />
        <div className="workshop-orb workshop-orb-two" aria-hidden="true" />
        <div className="container workshop-hero-grid">
          <div className="workshop-copy">
            <span className="workshop-kicker"><Bot size={15} /> Practical AI workshop</span>
            <h1>Learn how to use AI with clarity, confidence and purpose.</h1>
            <p>
              A practical workshop for students, freshers, professionals, career returners,
              business owners and trainers who want to use modern AI tools more effectively.
            </p>
          </div>
          <WorkshopEnrollmentForm />
          <div className="workshop-support">
            <div className="workshop-audience">
              {['Students & freshers', 'Working professionals', 'Business owners', 'Trainers & educators'].map((item) => (
                <span key={item}><Check size={14} /> {item}</span>
              ))}
            </div>
            <div className="workshop-trust-line">
              <strong>SRT</strong>
              <div><span>Success Root Technologies</span><small>From basics to brilliance</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="workshop-outcomes">
        <div className="container">
          <div className="ai-section-head">
            <div><span className="ai-kicker">What you will explore</span><h2>Useful AI skills for study, work and business</h2></div>
            <p>Focused on practical understanding and responsible usage—not hype or shortcuts.</p>
          </div>
          <div className="workshop-outcome-grid">
            {outcomes.map(([title, description, Icon], index) => {
              const OutcomeIcon = Icon as typeof BrainCircuit
              return (
                <article key={String(title)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <OutcomeIcon />
                  <h3>{String(title)}</h3>
                  <p>{String(description)}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
