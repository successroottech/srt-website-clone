import configPromise from '@payload-config'
import { ArrowRight, BrainCircuit, BriefcaseBusiness, Check, GraduationCap, RefreshCw } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

import { featuredCourses } from '@/data/courses'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'

const slug = 'it-training-courses-chennai'

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

export default function ITTrainingPage() {
  const siteURL = getServerSideURL()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'IT Training Courses in Chennai',
    description:
      'Career-focused technology training covering AI, programming, data, cloud, cybersecurity and business tools.',
    url: `${siteURL}/${slug}/`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Success Root Technologies',
      url: siteURL,
    },
  }

  return (
    <main className="audience-page training-audience-page">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} type="application/ld+json" />
      <section className="audience-hero">
        <div className="container audience-hero-grid">
          <div>
            <span className="ai-kicker">IT training courses · Chennai · Online · Hybrid</span>
            <h1>Build skills employers can see, test and trust.</h1>
            <p>
              Learn AI, software development, data, cloud and modern business technology through
              instructor guidance, practical projects and career-focused preparation.
            </p>
            <div className="audience-actions">
              <Link className="ai-button ai-button-gold" href="/it-courses-chennai/">
                Explore all courses <ArrowRight size={18} />
              </Link>
              <a className="ai-button ai-button-ghost" href="https://wa.me/918939069135">
                Get course guidance
              </a>
            </div>
          </div>
          <div className="audience-signal-card">
            <span>Learning system</span>
            {['Understand the fundamentals', 'Build guided projects', 'Use current AI tools', 'Present job-ready proof'].map((item, index) => (
              <div key={item}><b>{String(index + 1).padStart(2, '0')}</b><strong>{item}</strong><Check size={16} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-paths">
        <div className="container">
          <div className="ai-section-head">
            <div><span className="ai-kicker">Designed around your starting point</span><h2>Choose the learning journey that fits you</h2></div>
          </div>
          <div className="audience-path-grid">
            <article><GraduationCap /><span>Freshers & beginners</span><h3>Start with strong foundations</h3><p>Build confidence from the basics through guided practice and clear explanations.</p></article>
            <article><RefreshCw /><span>Career changers</span><h3>Move into a technology role</h3><p>Connect transferable experience with current tools, projects and interview preparation.</p></article>
            <article><BriefcaseBusiness /><span>Working professionals</span><h3>Upgrade for modern teams</h3><p>Add AI, automation, cloud, data or development capabilities to your professional toolkit.</p></article>
          </div>
        </div>
      </section>

      <section className="audience-programs">
        <div className="container">
          <div className="ai-section-head">
            <div><span className="ai-kicker">Popular modern programs</span><h2>Train for skills shaping today&apos;s work</h2></div>
            <Link href="/it-courses-chennai/">View complete catalog <ArrowRight size={16} /></Link>
          </div>
          <div className="audience-program-grid">
            {featuredCourses.slice(0, 6).map((course, index) => (
              <Link href={`/courses/${course.slug}/`} key={course.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <BrainCircuit size={21} />
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <strong>{course.duration} · {course.level}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-cta">
        <div className="container">
          <div><span className="ai-kicker">Not sure which course to choose?</span><h2>Get a learning roadmap for your goal.</h2></div>
          <a className="ai-button ai-button-gold" href="https://wa.me/918939069135">
            Talk to a course advisor <ArrowRight size={18} />
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
