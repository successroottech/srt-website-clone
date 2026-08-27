import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  CloudCog,
  DatabaseZap,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getServerSideURL } from '@/utilities/getURL'

const capabilities = [
  {
    title: 'Custom Web Applications',
    description:
      'Responsive customer portals, internal systems, SaaS products, e-commerce experiences, and workflow applications.',
    icon: Braces,
    stack: ['Next.js', 'React', 'TypeScript', 'Python'],
  },
  {
    title: 'AI Solutions & Agents',
    description:
      'AI assistants, RAG knowledge systems, tool-using agents, document intelligence, and human-approved workflows.',
    icon: Bot,
    stack: ['LLMs', 'RAG', 'Agents', 'MCP'],
  },
  {
    title: 'Business Automation',
    description:
      'Connect repetitive processes across teams, data, email, documents, approvals, and existing business tools.',
    icon: Workflow,
    stack: ['n8n', 'Power Automate', 'APIs', 'Webhooks'],
  },
  {
    title: 'Data Platforms & Dashboards',
    description:
      'Reliable data pipelines, operational reporting, Power BI dashboards, analytics products, and decision-support tools.',
    icon: DatabaseZap,
    stack: ['PostgreSQL', 'Power BI', 'Python', 'ETL'],
  },
  {
    title: 'APIs & System Integration',
    description:
      'Secure APIs and integrations that connect CRMs, ERPs, payments, communication platforms, and custom software.',
    icon: Network,
    stack: ['FastAPI', 'REST', 'PostgreSQL', 'OAuth'],
  },
  {
    title: 'Cloud, DevOps & Modernization',
    description:
      'Modernize existing applications, improve reliability, automate delivery, and deploy securely to the cloud.',
    icon: CloudCog,
    stack: ['Docker', 'CI/CD', 'Cloud', 'Observability'],
  },
]

const deliverySteps = [
  ['01', 'Discover', 'Clarify users, business outcomes, constraints, data, risks, and success measures.'],
  ['02', 'Design', 'Define product scope, experience, architecture, integrations, delivery plan, and milestones.'],
  ['03', 'Build', 'Deliver in visible increments with reviews, testing, security checks, and stakeholder feedback.'],
  ['04', 'Launch & improve', 'Deploy, document, train users, monitor performance, and continue improving the product.'],
]

export const metadata: Metadata = {
  title: 'Custom Software Development & AI Automation in Chennai',
  description:
    'Custom web applications, AI agents, workflow automation, data platforms, dashboards, APIs, cloud modernization and ongoing software support from Success Root Technologies.',
  alternates: { canonical: '/software-development' },
  openGraph: {
    title: 'Software Development & AI Automation | Success Root Technologies',
    description:
      'Build secure web applications, AI solutions, business automation, integrations and data platforms with a practical delivery partner.',
    url: '/software-development',
    images: [{ url: '/og-ai.png' }],
  },
}

export default function SoftwareDevelopmentPage() {
  const siteURL = getServerSideURL()
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom Software Development and AI Automation',
    description:
      'Custom web applications, AI agents, workflow automation, data platforms, APIs, integrations and cloud modernization.',
    provider: {
      '@type': 'Organization',
      name: 'Success Root Technologies',
      url: siteURL,
    },
    areaServed: ['India', 'Worldwide'],
    serviceType: [
      'Custom Software Development',
      'AI Automation',
      'Web Application Development',
      'Data Platform Development',
      'API Integration',
    ],
    url: `${siteURL}/software-development/`,
  }

  return (
    <main className="software-page">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        type="application/ld+json"
      />

      <section className="software-hero">
        <div className="software-grid-bg" />
        <div className="container software-hero-grid">
          <div>
            <span className="ai-kicker">Software development · AI automation · Chennai</span>
            <h1>Software built around your business—not the other way around.</h1>
            <p>
              From a focused internal tool to a complete AI-enabled platform, we design, build,
              integrate, deploy, and improve software that creates measurable operational value.
            </p>
            <div className="ai-actions">
              <a
                className="ai-button ai-button-gold"
                href="https://wa.me/918939069135?text=I%20want%20to%20discuss%20a%20software%20development%20project"
              >
                Discuss your project <ArrowRight size={18} />
              </a>
              <a className="ai-button ai-button-ghost" href="mailto:contact@successroottech.com">
                Email project brief
              </a>
            </div>
          </div>
          <div className="software-system" aria-label="Software delivery system">
            <div className="software-system-head">
              <span><i /> SRT DELIVERY ENGINE</span>
              <strong>ONLINE</strong>
            </div>
            <div className="software-system-core">
              <div><Layers3 /><span>Product</span><small>Experience & workflows</small></div>
              <div><Bot /><span>Intelligence</span><small>AI agents & automation</small></div>
              <div><DatabaseZap /><span>Data</span><small>APIs & platforms</small></div>
              <div><ShieldCheck /><span>Operations</span><small>Cloud, quality & security</small></div>
            </div>
            <div className="software-system-status"><i /> Discover → Design → Build → Launch</div>
          </div>
        </div>
      </section>

      <section className="ai-section software-capabilities">
        <div className="container">
          <div className="ai-section-head">
            <div>
              <span className="ai-kicker">What we build</span>
              <h2>Modern software from idea to production</h2>
            </div>
            <p>
              Start with one high-value problem or engage us across a complete product lifecycle.
              Every solution is shaped around users, operations, data, security, and measurable outcomes.
            </p>
          </div>
          <div className="software-capability-grid">
            {capabilities.map(({ title, description, icon: Icon, stack }, index) => (
              <article key={title}>
                <div className="software-capability-top">
                  <div className="software-capability-icon"><Icon /></div>
                  <span className="software-capability-number">0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="software-capability-stack">
                  {stack.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-section software-delivery">
        <div className="container software-delivery-grid">
          <div>
            <span className="ai-kicker">A clear delivery model</span>
            <h2>Visible progress. Practical decisions. Production ownership.</h2>
            <p>
              You receive working increments, plain-language updates, documented decisions, and a
              solution your team can operate—not a black box.
            </p>
            <ul>
              <li><Check size={16} /> Outcome-led scope and milestone planning</li>
              <li><Check size={16} /> Security, quality, and performance built into delivery</li>
              <li><Check size={16} /> Documentation, knowledge transfer, and post-launch support</li>
            </ul>
          </div>
          <ol className="software-step-list">
            {deliverySteps.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <div><strong>{title}</strong><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ai-section software-engineering">
        <div className="container">
          <div className="ai-section-head">
            <div>
              <span className="ai-kicker">Engineering principles</span>
              <h2>Built to remain useful after launch</h2>
            </div>
          </div>
          <div className="software-principle-grid">
            <div><Gauge /><h3>Performance</h3><p>Fast interfaces, efficient APIs, measured bottlenecks, and practical scalability.</p></div>
            <div><ShieldCheck /><h3>Security</h3><p>Least privilege, protected data, secure integration, review, and responsible AI controls.</p></div>
            <div><GitBranch /><h3>Maintainability</h3><p>Clear architecture, version control, automated checks, documentation, and handover.</p></div>
            <div><Layers3 /><h3>Extensibility</h3><p>Modular systems designed to add workflows, integrations, teams, and intelligence over time.</p></div>
          </div>
        </div>
      </section>

      <section className="software-cta">
        <div className="container">
          <div>
            <span className="ai-kicker">Have a problem worth solving?</span>
            <h2>Let’s turn it into working software.</h2>
            <p>Share the current process, desired outcome, users, and timeline. We’ll help shape the right first step.</p>
          </div>
          <a
            className="ai-button ai-button-gold"
            href="https://wa.me/918939069135?text=I%20want%20to%20discuss%20a%20software%20development%20project"
          >
            Start project discussion <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="software-training-link">
        <div className="container">
          <span>Looking for career training and placement support?</span>
          <Link href="/it-courses-chennai/">Explore all training programs <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  )
}
