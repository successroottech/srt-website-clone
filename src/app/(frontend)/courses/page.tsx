import { ArrowRight, Clock3, Layers3, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { featuredCourses, getLegacyCourseImage } from '@/data/courses'
import { getServerSideURL } from '@/utilities/getURL'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'AI and Modern Technology Programs in Chennai',
  description:
    'Explore hands-on courses in AI engineering, AI agents, full-stack development, Python, data analytics, Power BI, SQL, cloud, MLOps and cybersecurity.',
  alternates: { canonical: '/courses' },
  openGraph: {
    title: 'AI and Modern Technology Programs in Chennai',
    description:
      'Career-focused technology courses with live projects, mentor guidance, and practical job preparation.',
    images: [{ url: '/ai-first-career-training-banner.png', width: 1729, height: 910 }],
  },
}

export default async function CoursesPage() {
  const siteURL = getServerSideURL()
  const payload = await getPayload({ config: configPromise })
  const migratedCourses = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 100,
    pagination: false,
    sort: 'title',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { originalURL: { contains: '/courses/' } },
      ],
    },
    select: {
      title: true,
      slug: true,
      meta: true,
    },
  })

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Success Root Technologies Courses',
    itemListElement: [...featuredCourses, ...migratedCourses.docs].map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.title,
      url: `${siteURL}/courses/${course.slug}/`,
    })),
  }

  return (
    <main className="ai-site courses-page">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        type="application/ld+json"
      />
      <section className="inner-hero ai-courses-hero">
        <div className="container">
          <span className="eyebrow">AI-first programs · Chennai · Online · Hybrid</span>
          <h1>Learn the stack shaping the next decade</h1>
          <p>
            Build real systems with the languages, frameworks, AI models, data platforms, and
            cloud tools used by modern teams.
          </p>
          <a className="ai-button ai-button-gold" href="https://wa.me/918939069135">
            Get a personalized roadmap <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="ai-section course-catalog">
        <div className="container">
          <div className="ai-section-head">
            <div>
              <span className="ai-kicker">Featured career tracks</span>
              <h2>Build modern, AI-ready skills</h2>
            </div>
            <p>
              Structured learning paths with current tools, portfolio projects, mentor feedback,
              and interview preparation.
            </p>
          </div>
          <div className="course-card-grid">
            {featuredCourses.map((course) => (
              <article className="course-image-card" key={course.slug}>
                <Link
                  aria-label={`View ${course.title}`}
                  className="course-card-image"
                  href={`/courses/${course.slug}`}
                >
                  <Image
                    alt={`${course.title} training at Success Root Technologies`}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    src={course.image}
                  />
                </Link>
                <div className="course-card-content">
                  <div className="course-card-meta">
                    <span><Clock3 size={14} /> {course.duration}</span>
                    <span><Layers3 size={14} /> {course.level}</span>
                  </div>
                  <div className="course-tools-preview">
                    <Sparkles size={13} />
                    {course.tools.slice(0, 3).map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                  <h2><Link href={`/courses/${course.slug}`}>{course.title}</Link></h2>
                  <p>{course.description}</p>
                  <Link className="course-card-link" href={`/courses/${course.slug}`}>
                    View course details <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-section legacy-course-catalog">
        <div className="container">
          <div className="ai-section-head">
            <div>
              <span className="ai-kicker">Complete course catalog</span>
              <h2>Practical skills for every starting point</h2>
            </div>
            <p>
              Explore focused programs in programming, analytics, business tools, web development,
              and digital skills.
            </p>
          </div>
          <div className="course-card-grid">
            {migratedCourses.docs.map((course) => (
              <article className="course-image-card" key={course.id}>
                <Link
                  aria-label={`View ${course.title}`}
                  className="course-card-image"
                  href={`/courses/${course.slug}`}
                >
                  <Image
                    alt={`${course.title} course in Chennai`}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    src={getLegacyCourseImage(course.slug)}
                  />
                </Link>
                <div className="course-card-content">
                  <span className="course-card-label"><Sparkles size={12} /> Now includes AI tools</span>
                  <h2><Link href={`/courses/${course.slug}`}>{course.title}</Link></h2>
                  <p>
                    {course.meta?.description ||
                      'Practical, career-focused training with expert guidance and hands-on exercises.'}
                  </p>
                  <Link className="course-card-link" href={`/courses/${course.slug}`}>
                    View course details <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
