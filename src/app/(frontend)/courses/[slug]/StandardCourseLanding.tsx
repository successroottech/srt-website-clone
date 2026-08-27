import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'

import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

import { CourseLeadForm } from './CourseLeadForm'
import { getCourseProfile } from './coursePageProfiles'
import styles from './standard-course.module.css'

type StandardCourseLandingProps = {
  description: string
  duration: string
  legacyHTML?: string
  level: string
  modules: string[]
  outcomes: string[]
  slug: string
  title: string
  tools: string[]
}

const phone = '+918939069135'
const directions =
  'https://www.google.com/maps/search/?api=1&query=Success+Root+Technologies+West+Mambalam+Chennai+600033'

export function StandardCourseLanding(props: StandardCourseLandingProps) {
  const { description, duration, legacyHTML, level, modules, outcomes, slug, title, tools } = props
  const profile = getCourseProfile(slug)
  const whatsapp = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(`Hi SRT, I want fees, syllabus and batch details for ${title}.`)}`
  const syllabus = modules.length
    ? modules
    : profile.skills.map((skill) => `${skill}: concepts, guided practice and practical application`)
  const skillList = Array.from(new Set([...profile.skills, ...tools])).slice(0, 10)
  const preservedLegacyHTML = legacyHTML
    ?.replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '')
    .replace(/<h1([^>]*)>/gi, '<h3$1>')
    .replace(/<\/h1>/gi, '</h3>')
    .replace(/<p[^>]*>(?:\s|&nbsp;|<br\s*\/?\s*>)*<\/p>/gi, '')
    .replace(/<div[^>]*>(?:\s|&nbsp;|<br\s*\/?\s*>)*<\/div>/gi, '')
    .replace(/(?:<br\s*\/?\s*>\s*){2,}/gi, '<br />')

  const faq = [
    [
      `Who can join the ${title} course?`,
      `This course is suitable for ${profile.audiences.join(', ').toLowerCase()}. Speak with SRT if you would like help checking whether it matches your background.`,
    ],
    [
      `What is the duration of the ${title} course?`,
      `The current published duration is ${duration}. Batch calendars can vary, so contact SRT for the latest weekday and weekend schedule.`,
    ],
    [
      `Does ${title} include practical training?`,
      `Yes. Training includes guided exercises, practical tasks and course-appropriate project work.`,
    ],
    [
      'Are projects included?',
      `The learning path includes practical work such as ${profile.projects.join(', ').toLowerCase()}. Exact project scope may vary by batch.`,
    ],
    [
      'Is placement assistance available?',
      'SRT provides resume guidance, interview preparation, mock-interview support and job-opportunity guidance. Placement assistance is not a job guarantee.',
    ],
    [
      'Where is the training centre?',
      'Success Root Technologies is located at Rajaji Street, West Mambalam, Chennai 600033. Classroom and available online options can be confirmed with the course advisor.',
    ],
    [
      'How can I get the current fees and batch timing?',
      'Submit the short enquiry form or contact SRT by phone or WhatsApp for the latest fees, available offers and batch schedule.',
    ],
  ]

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <nav aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/it-courses-chennai/">IT Courses in Chennai</Link>
              <span>/</span>
              <span>{title}</span>
            </nav>
            <span className={styles.eyebrow}>
              JOB-READY {title.toUpperCase()} TRAINING · WEST MAMBALAM
            </span>
            <h1>{title} Course in Chennai</h1>
            <p>{description}</p>
            <div className={styles.heroChecks}>
              <span>
                <CheckCircle2 /> Practical Training
              </span>
              <span>
                <CheckCircle2 /> Guided Projects
              </span>
              <span>
                <CheckCircle2 /> Placement Assistance
              </span>
              <span>
                <CheckCircle2 /> Interview Preparation
              </span>
            </div>
            <div className={styles.meta}>
              <span>
                <Clock3 /> {duration}
              </span>
              <span>
                <GraduationCap /> {level}
              </span>
            </div>
            <div className={styles.actions}>
              <a className={styles.primary} href="#course-enquiry">
                Get Fees & Batch Details <ArrowRight />
              </a>
              <a className={styles.secondary} href="#syllabus">
                <BookOpen /> View Course Syllabus
              </a>
            </div>
          </div>
          <div className={styles.heroSide}>
            <CourseLeadForm course={title} />
          </div>
        </div>
      </section>

      <section className={styles.lightSection}>
        <div className={`container ${styles.twoCol}`}>
          <div>
            <span className={styles.kicker}>COURSE OVERVIEW</span>
            <h2>Build practical {title} skills</h2>
            <p>{description}</p>
            <p>
              At SRT, concepts are reinforced through trainer-led demonstrations, guided exercises,
              reviews and practical application—not theory alone.
            </p>
          </div>
          <div>
            <span className={styles.kicker}>WHO SHOULD JOIN?</span>
            <div className={styles.audienceGrid}>
              {profile.audiences.map((item) => (
                <span key={item}>
                  <CheckCircle2 />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.navySection}>
        <div className="container">
          <div className={styles.heading}>
            <span className={styles.kicker}>SKILLS & TOOLS</span>
            <h2>What you will work with</h2>
            <p>Course-specific concepts and tools taught through structured practice.</p>
          </div>
          <div className={styles.skillsGrid}>
            {skillList.map((skill) => (
              <div key={skill}>{skill}</div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.syllabusSection} id="syllabus">
        <div className="container">
          <div className={styles.heading}>
            <span className={styles.kicker}>DETAILED SYLLABUS</span>
            <h2>A structured, practical learning path</h2>
            <p>Modules progress from foundations to application and project work.</p>
          </div>
          <div className={styles.moduleList}>
            {syllabus.map((module, index) => (
              <div className={styles.moduleCard} key={module}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>Module {index + 1}</strong>
                <b>{module}</b>
              </div>
            ))}
          </div>
          {preservedLegacyHTML && (
            <details className={styles.existingContent}>
              <summary>View course information</summary>
              <article dangerouslySetInnerHTML={{ __html: preservedLegacyHTML }} />
            </details>
          )}
        </div>
      </section>

      <section className={styles.projectSection}>
        <div className="container">
          <div className={styles.heading}>
            <span className={styles.kicker}>PRACTICAL LEARNING</span>
            <h2>Practice with course-relevant work</h2>
            <p>Build confidence through exercises, assignments and portfolio-oriented use cases.</p>
          </div>
          <div className={styles.projectGrid}>
            {profile.projects.map((project, index) => (
              <article key={project}>
                <span>0{index + 1}</span>
                <h3>{project}</h3>
                <p>
                  Complete a guided implementation, document your approach and practise explaining
                  the result.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.approach}>
        <div className="container">
          <div className={styles.heading}>
            <span className={styles.kicker}>THE SRT APPROACH</span>
            <h2>Learn, practise, build and prepare</h2>
          </div>
          <div className={styles.steps}>
            {[
              ['Learn', 'Understand concepts with trainer guidance.'],
              ['Practise', 'Strengthen each skill through guided exercises.'],
              ['Build', 'Apply your learning through project work.'],
              ['Prepare', 'Improve project explanation and interview confidence.'],
            ].map(([name, text], index) => (
              <article key={name}>
                <span>0{index + 1}</span>
                <h3>{name}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.careerSection}>
        <div className={`container ${styles.twoCol}`}>
          <div>
            <span className={styles.kicker}>CAREER OPPORTUNITIES</span>
            <h2>Roles related to these skills</h2>
            <p>
              Career paths may include the following roles depending on your broader skills,
              experience and interview performance.
            </p>
            <div className={styles.roles}>
              {profile.careers.map((role) => (
                <span key={role}>
                  <BriefcaseBusiness />
                  {role}
                </span>
              ))}
            </div>
          </div>
          <aside>
            <ShieldCheck />
            <h2>Placement support at SRT</h2>
            <ul>
              <li>Resume and profile guidance</li>
              <li>Project presentation support</li>
              <li>Interview preparation and mock interviews</li>
              <li>Job-opportunity guidance and placement assistance</li>
            </ul>
            <small>
              Placement assistance supports your job search; it is not a guaranteed job offer.
            </small>
          </aside>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.heading}>
            <span className={styles.kicker}>WHY SUCCESS ROOT TECHNOLOGIES?</span>
            <h2>Practical training in West Mambalam</h2>
          </div>
          <div className={styles.whyGrid}>
            {[
              'Trainer guidance',
              'Hands-on exercises',
              'Project-based learning',
              'Interview preparation',
              'Placement assistance',
              'Chennai classroom location',
            ].map((item) => (
              <div key={item}>
                <CheckCircle2 />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.location}>
        <div className={`container ${styles.locationInner}`}>
          <div>
            <span className={styles.kicker}>CLASSROOM TRAINING IN CHENNAI</span>
            <h2>Learn {title} at SRT in West Mambalam</h2>
            <p>
              Old No. 8/1, New No. 15/1, First Floor, Rajaji Street, West Mambalam, Chennai, Tamil
              Nadu 600033.
            </p>
          </div>
          <div className={styles.locationActions}>
            <a href={directions} rel="noreferrer" target="_blank">
              <MapPin />
              Get Directions
            </a>
            <a href={`tel:${phone}`}>
              <Phone />
              Call SRT
            </a>
            <a href={whatsapp} rel="noreferrer" target="_blank">
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.heading}>
            <span className={styles.kicker}>COURSE FAQ</span>
            <h2>Questions about {title}</h2>
          </div>
          <div className={styles.faqList}>
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.relatedSection}>
        <div className="container">
          <div className={styles.heading}>
            <span className={styles.kicker}>RELATED COURSES</span>
            <h2>Explore connected learning paths</h2>
          </div>
          <div className={styles.relatedGrid}>
            {profile.related
              .filter((course) => course.slug !== slug)
              .map((course) => (
                <Link href={`/courses/${course.slug}/`} key={course.slug}>
                  {course.title}
                  <ArrowRight />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className="container">
          <div>
            <span>START YOUR LEARNING PATH</span>
            <h2>Ready to Start Your {title} Training?</h2>
            <p>Get the latest course syllabus, fees and upcoming batch details.</p>
          </div>
          <div>
            <a href="#course-enquiry">
              <ArrowRight /> Get Fees & Batch Details
            </a>
            <a href={whatsapp} rel="noreferrer" target="_blank">
              <WhatsAppIcon /> WhatsApp SRT
            </a>
          </div>
        </div>
      </section>
      <div className={styles.mobileSticky}>
        <a href={`tel:${phone}`}>
          <Phone /> Call
        </a>
        <a href={whatsapp}>
          <WhatsAppIcon /> WhatsApp
        </a>
        <a href="#course-enquiry">
          <MessageCircle /> Enquire
        </a>
      </div>
    </main>
  )
}
