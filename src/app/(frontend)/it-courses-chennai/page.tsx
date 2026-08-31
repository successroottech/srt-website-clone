import type { Metadata } from 'next'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Medal,
  MessageCircle,
  Phone,
  SearchCheck,
  Users,
} from 'lucide-react'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import Link from 'next/link'

import { getServerSideURL } from '@/utilities/getURL'
import { CourseDiscovery } from './CourseDiscovery'
import { advancedAIPrograms, popularCourses } from './courseCatalog'
import styles from './catalog.module.css'

const phone = '+918939069135'
const whatsapp = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent('Hi SRT, I need help choosing the right IT course.')}`
const directions =
  'https://www.google.com/maps/search/?api=1&query=Success+Root+Technologies+West+Mambalam+Chennai+600033'

export const metadata: Metadata = {
  title: { absolute: 'IT Courses in Chennai | Job-Oriented Training | Success Root Technologies' },
  description:
    'Explore Full Stack, Data Analytics, Python, Java, Power BI, AI and Cyber Security courses in Chennai with practical training and placement assistance.',
  alternates: { canonical: '/it-courses-chennai/' },
  openGraph: {
    title: 'IT Courses in Chennai | Success Root Technologies',
    description:
      'Compare practical, job-oriented IT training programs in Chennai and choose the right learning path for your career goal.',
    url: '/it-courses-chennai/',
  },
}

export default function ITCoursesChennaiPage() {
  const siteURL = getServerSideURL().replace(/\/$/, '')
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteURL}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'IT Courses in Chennai',
          item: `${siteURL}/it-courses-chennai/`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Popular IT courses in Chennai',
      itemListElement: popularCourses.map((course, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: course.title,
        url: `${siteURL}/courses/${course.slug}/`,
      })),
    },
  ]

  return (
    <main className={styles.page} data-course-catalog>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <span className={styles.eyebrow}>JOB-ORIENTED IT TRAINING · WEST MAMBALAM</span>
            <h1>IT Courses in Chennai for Practical, Job-Ready Skills</h1>
            <p>
              Compare career-focused programs in software development, data analytics, programming,
              AI, cyber security and digital skills—all in one place.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#popular-courses">
                Explore Popular Courses <ArrowRight size={18} />
              </a>
              <a className={styles.secondaryButton} data-course-guidance href="#course-guidance">
                Get Course Guidance <MessageCircle size={18} />
              </a>
            </div>
            <div className={styles.heroNotes}>
              <span>
                <CheckCircle2 /> Classroom & online options
              </span>
              <span>
                <CheckCircle2 /> Live projects
              </span>
              <span>
                <CheckCircle2 /> Placement assistance
              </span>
            </div>
          </div>
          <aside className={styles.finderCard}>
            <SearchCheck aria-hidden="true" />
            <span>FIND YOUR COURSE</span>
            <h2>Not sure where to start?</h2>
            <p>
              Search by course, skill or career goal below, or speak with our Chennai course
              advisor.
            </p>
            <a data-course-guidance href="#course-guidance">
              Talk to an advisor <ArrowRight size={17} />
            </a>
          </aside>
        </div>
      </section>

      <section className="ai-proof home-full-banner-proof" aria-label="SRT training highlights">
        <div>
          <Users />
          <span>
            <AnimatedNumber end={300} suffix="+" />
            <b>Students placed</b>
            <small>Successful IT careers</small>
          </span>
        </div>
        <div>
          <Building2 className="trust-icon-gold" />
          <span>
            <AnimatedNumber end={20} suffix="+" />
            <b>Partner companies</b>
            <small>Hiring our students</small>
          </span>
        </div>
        <div>
          <Medal />
          <span>
            <AnimatedNumber end={3} suffix="+" />
            <b>Years of excellence</b>
            <small>Trusted since 2022</small>
          </span>
        </div>
        <div>
          <span className="google-g" aria-hidden="true">G</span>
          <span>
            <AnimatedNumber decimals={1} end={4.8} suffix="/5" />
            <b>
              Google rating <span className="google-stars" aria-label="5 stars">★★★★★</span>
            </b>
            <small>Based on 74 reviews</small>
          </span>
        </div>
      </section>

      <CourseDiscovery />

      <section className={styles.advancedSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>ADVANCED TECHNOLOGY PATHS</span>
              <h2>Build beyond the foundations</h2>
            </div>
            <p>
              Specialized programs for learners ready to explore modern AI, cloud, automation and
              security systems.
            </p>
          </div>
          <div className={styles.advancedGrid}>
            {advancedAIPrograms.map((course) => (
              <Link data-course={course.title} href={`/courses/${course.slug}/`} key={course.slug}>
                <span>{course.title}</span>
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.jobReady}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>THE SRT LEARNING APPROACH</span>
              <h2>Training built around practical outcomes</h2>
            </div>
            <p>
              Every learner starts at a different level. Our programs combine structured instruction
              with guided practice and career preparation.
            </p>
          </div>
          <div className={styles.outcomeGrid}>
            <article>
              <GraduationCap />
              <h3>Learn from the basics</h3>
              <p>Clear, instructor-led lessons designed for beginners and career changers.</p>
            </article>
            <article>
              <BriefcaseBusiness />
              <h3>Build project proof</h3>
              <p>
                Apply each skill through exercises, portfolio projects and practical explanations.
              </p>
            </article>
            <article>
              <CheckCircle2 />
              <h3>Prepare for opportunities</h3>
              <p>
                Resume guidance, project presentation, interview preparation and placement
                assistance.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.locationSection}>
        <div className={`container ${styles.locationGrid}`}>
          <div>
            <span className={styles.kicker}>CLASSROOM TRAINING IN CHENNAI</span>
            <h2>Learn at SRT in West Mambalam</h2>
            <p>
              Old No. 8/1, New No. 15/1, First Floor, Rajaji Street, West Mambalam, Chennai, Tamil
              Nadu 600033.
            </p>
          </div>
          <div className={styles.locationActions}>
            <a href={directions} target="_blank" rel="noreferrer">
              <MapPin size={18} /> Get Directions
            </a>
            <a href={`tel:${phone}`}>
              <Phone size={18} /> +91 89390 69135
            </a>
          </div>
        </div>
      </section>

      <section className={styles.guidance} id="course-guidance">
        <div className="container">
          <div>
            <span>PERSONAL COURSE GUIDANCE</span>
            <h2>Not sure which IT course is right for you?</h2>
            <p>
              Tell us your background and career goal. Our advisor will help you compare courses,
              fees and upcoming batches.
            </p>
          </div>
          <div className={styles.guidanceActions}>
            <Link data-course-guidance href="/contact-us/?intent=course-guidance">
              Get Course Guidance <ArrowRight size={18} />
            </Link>
            <a href={whatsapp} target="_blank" rel="noreferrer">
              <WhatsAppIcon height={18} width={18} /> WhatsApp SRT
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
