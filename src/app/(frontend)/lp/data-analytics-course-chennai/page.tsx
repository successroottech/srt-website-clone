import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  BarChart3,
  BriefcaseBusiness,
  Check,
  FileSpreadsheet,
  Laptop,
  MapPin,
  Presentation,
  Users,
} from 'lucide-react'

import { DataAnalyticsLeadActions, DataAnalyticsLeadForm } from './DataAnalyticsLeadForm'
import styles from './page.module.css'

const canonical = 'https://successroottech.com/courses/data-analytics-course-chennai/'

export const metadata: Metadata = {
  title: { absolute: 'Data Analytics Course in Chennai | Fees, Training & Placement Assistance | SRT' },
  description:
    'Explore SRT’s Data Analytics training in Chennai with practical learning, projects, Power BI, SQL, Excel, Python and placement assistance. Get current fees and batch details.',
  alternates: { canonical },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Data Analytics Course in Chennai with Placement Assistance',
    description:
      'Practical Data Analytics training in Excel, SQL, Power BI and Python at SRT Chennai.',
    url: canonical,
  },
}

const modules = [
  ['Advanced Excel', 'Formulas, lookups, Pivot Tables, data cleaning, charts and business reporting.', FileSpreadsheet],
  ['SQL', 'Queries, joins, grouping, aggregation and practical business-data analysis.', BarChart3],
  ['Power BI', 'Power Query, data modelling, DAX and interactive dashboard development.', Presentation],
  ['Python & Pandas', 'Python fundamentals, data cleaning, transformation and analysis workflows.', Laptop],
] as const

const projects = [
  ['Sales Dashboard', 'Turn sales data into a clear dashboard for performance monitoring.'],
  ['Business Performance Analysis', 'Explore business data and communicate useful findings.'],
  ['Excel Reporting Project', 'Clean, analyse and present data using advanced Excel.'],
  ['SQL Data Analysis', 'Query relational datasets to answer practical business questions.'],
  ['Power BI Dashboard', 'Build an interactive report using Power Query, modelling and DAX.'],
]

const reasons = [
  ['Practical, Hands-On Training', 'Learn through guided practice instead of theory alone.', Laptop],
  ['Trainer Guidance', 'Get instructor-led support while building core analytics skills.', Users],
  ['Career-Focused Curriculum', 'Develop skills relevant to entry-level analytics roles.', BarChart3],
  ['Interview Preparation', 'Prepare your profile, projects and technical explanations.', BriefcaseBusiness],
  ['Placement Assistance', 'Access resume guidance, mock interviews and job updates.', Presentation],
  ['Flexible Learning Options', 'Choose classroom or online training with weekday and weekend batches.', MapPin],
] as const

const reviews = [
  ['Sonia Anbu Selvam', 'Great learning experience. The trainer explained concepts clearly, and the hands-on practice helped me understand Data Analytics very well.'],
  ['Raja K', 'I recently completed the Excel and Power BI training program at Success Root Technologies, and it exceeded my expectations.'],
  ['Dharshini Venkatesan', 'Interactive classes, good platform to gain knowledge.'],
]

const faqs = [
  ['What is the Data Analytics course duration?', 'The structured program duration is 16 weeks. Contact SRT for the current batch calendar.'],
  ['Is classroom training available in Chennai?', 'Yes. Classroom training is available at SRT in West Mambalam, Chennai.'],
  ['Is online training available?', 'Yes. Online training is available along with the classroom option.'],
  ['What tools are covered?', 'The course covers Advanced Excel, SQL, Power BI, Power Query, DAX, Python and Pandas.'],
  ['Are practical projects included?', 'Yes. The program includes practical exercises, reporting projects, dashboards and a final analytics capstone.'],
  ['Can freshers and beginners join?', 'Yes. The program is beginner friendly and suitable for students, fresh graduates, job seekers and career switchers.'],
  ['Does SRT provide placement assistance?', 'Yes. Support includes resume and profile guidance, interview preparation, mock interviews and job opportunity updates. Placement assistance does not guarantee employment.'],
  ['How can I get current fees and batch timings?', 'Complete the short enquiry form or contact SRT by phone or WhatsApp for current fees and the next available batch.'],
]

export default function DataAnalyticsAdsLandingPage() {
  return (
    <main className={`srt-ad-landing ${styles.page}`}>
      <header className={styles.miniHeader}>
        <div className={styles.shell}>
          <Link href="/" aria-label="Success Root Technologies main website">
            <Image src="/srt-logo-lockup.png" alt="Success Root Technologies" width={205} height={64} priority unoptimized />
          </Link>
          <DataAnalyticsLeadActions compact />
        </div>
      </header>

      <section className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>DATA ANALYTICS TRAINING • CHENNAI</span>
            <h1>Data Analytics Course in Chennai with Placement Assistance</h1>
            <p className={styles.heroLead}>Build practical skills in Advanced Excel, SQL, Power BI and Python through hands-on training, projects and career-focused support.</p>
            <div className={styles.benefits}>
              {['Classroom & Online Training', 'Practical Projects', 'Placement Assistance', 'Interview Preparation', 'Weekday / Weekend Batches'].map((item) => <span key={item}><Check size={17} />{item}</span>)}
            </div>
            <div className={styles.location}><MapPin size={19} /><div><strong>West Mambalam, Chennai</strong><span>Beginner-friendly · 16-week structured program</span></div></div>
          </div>
          <DataAnalyticsLeadForm />
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="Course highlights">
        <div className={styles.shell}>
          {['Practical Training', 'Project-Based Learning', 'Placement Assistance', 'Interview Preparation', 'Chennai Classroom', 'Online Training'].map((item) => <span key={item}><Check size={16} />{item}</span>)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>COURSE CURRICULUM</span><h2>What You’ll Learn</h2><p>Build a practical analytics toolkit through guided exercises and portfolio-oriented projects.</p></div>
          <div className={styles.moduleGrid}>{modules.map(([title, copy, Icon]) => <article key={title}><div className={styles.icon}><Icon size={24} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <DataAnalyticsLeadActions />
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>WHY SUCCESS ROOT TECHNOLOGIES</span><h2>Why Choose SRT for Data Analytics Training?</h2></div>
          <div className={styles.reasonGrid}>{reasons.map(([title, copy, Icon]) => <article key={title}><Icon size={22} /><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.shell} ${styles.proofGrid}`}>
          <div className={styles.proofCopy}><span className={styles.eyebrowDark}>REAL SRT CLASSROOMS · 2026</span><h2>Real Training. Practical Learning.</h2><p>See how learners at Success Root Technologies build practical skills through classroom sessions, guided exercises and project-based learning.</p><ul>{['Instructor-led classroom sessions', 'Hands-on computer practice', 'West Mambalam training centre'].map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul></div>
          <div className={styles.gallery}>
            <figure className={styles.galleryFeature}><Image src="/course-trust/srt-training-centre-2026.jpg" alt="Success Root Technologies training centre classroom in West Mambalam Chennai" fill sizes="(max-width: 800px) 100vw, 45vw" /><figcaption>SRT training centre</figcaption></figure>
            <figure><Image src="/course-trust/srt-classroom-training-2026.jpg" alt="Instructor-led classroom training at Success Root Technologies in Chennai" fill sizes="(max-width: 800px) 50vw, 22vw" /><figcaption>Classroom sessions</figcaption></figure>
            <figure><Image src="/course-trust/srt-practical-lab-2026.jpg" alt="Students completing practical computer exercises at Success Root Technologies" fill sizes="(max-width: 800px) 50vw, 22vw" /><figcaption>Practical learning</figcaption></figure>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.reviews}`}>
        <div className={styles.shell}>
          <div className={styles.reviewTop}><div className={styles.sectionHeading}><span>VERIFIED GOOGLE REVIEWS</span><h2>What Our Learners Say</h2></div><a href="https://www.google.com/search?q=Success+Root+Technologies+West+Mambalam+Chennai+reviews" target="_blank" rel="noreferrer"><strong>4.8/5</strong><span>★★★★★</span><small>Based on 74 Google reviews · verified August 2026</small></a></div>
          <div className={styles.reviewGrid}>{reviews.map(([name, text]) => <article key={name}><div aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{text}”</blockquote><strong>{name}</strong><small>Google review · 2026</small></article>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>BUILD YOUR PORTFOLIO</span><h2>Build Practical Data Analytics Projects</h2></div>
          <div className={styles.projectGrid}>{projects.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.career}`}>
        <div className={`${styles.shell} ${styles.careerGrid}`}>
          <div><span className={styles.eyebrow}>CAREER-FOCUSED SUPPORT</span><h2>Career & Placement Support</h2><p>Prepare to present your skills, projects and profile with confidence while receiving guidance on suitable opportunities.</p><DataAnalyticsLeadActions /></div>
          <div className={styles.supportList}>{['Resume Preparation', 'LinkedIn & Profile Guidance', 'Portfolio Guidance', 'Interview Preparation', 'Mock Interviews', 'Technical Interview Guidance', 'Job Opportunity Updates', 'Placement Assistance'].map((item) => <span key={item}><Check size={17} />{item}</span>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>BEGINNER FRIENDLY</span><h2>Who Can Join?</h2></div>
          <div className={styles.audienceGrid}>{['Students', 'Fresh Graduates', 'Job Seekers', 'Working Professionals', 'Career Switchers', 'Beginners interested in analytics'].map((item) => <article key={item}><Users size={20} /><strong>{item}</strong></article>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.format}`}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>COURSE FORMAT</span><h2>Plan Your Data Analytics Training</h2><p>Speak with an advisor for current fees and the next available batch.</p></div>
          <div className={styles.formatGrid}>{[['Duration', '16 Weeks'], ['Training Mode', 'Classroom / Online'], ['Batch Options', 'Weekday / Weekend'], ['Location', 'West Mambalam, Chennai'], ['Learning', 'Practical + Project Based'], ['Career Support', 'Placement Assistance']].map(([label, value]) => <article key={label}><small>{label}</small><strong>{value}</strong></article>)}</div>
          <DataAnalyticsLeadActions />
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.shell} ${styles.locationGrid}`}>
          <div><span className={styles.eyebrowDark}>CHENNAI CLASSROOM TRAINING</span><h2>Data Analytics Training in Chennai</h2><p><strong>Success Root Technologies</strong><br />Old No. 8/1, New No. 15/1, First Floor,<br />Rajaji Street, West Mambalam,<br />Chennai, Tamil Nadu 600033</p></div>
          <div className={styles.locationCard}><MapPin size={30} /><h3>Visit SRT in West Mambalam</h3><p>Meet the course team and learn about the syllabus, current fees and batch options.</p><DataAnalyticsLeadActions directions /></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className={`${styles.shell} ${styles.faqLayout}`}>
          <div className={styles.sectionHeading}><span>COURSE QUESTIONS</span><h2>Data Analytics Course FAQs</h2><p>Clear answers about the curriculum, learning format and career support.</p></div>
          <div className={styles.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.shell}><span>START YOUR DATA ANALYTICS JOURNEY</span><h2>Get Current Fees & Next Batch Details</h2><p>Complete the short form and an SRT course advisor will contact you with the latest information.</p><DataAnalyticsLeadActions /></div>
      </section>

      <footer className={styles.miniFooter}>
        <div className={styles.shell}><span>© {new Date().getFullYear()} Success Root Technologies</span><nav aria-label="Essential links"><Link href="/privacy-policy/">Privacy Policy</Link><Link href="/contact-us/">Contact</Link><Link href="/">Main Website</Link></nav></div>
      </footer>

      <div className={styles.mobileSticky} aria-label="Contact SRT"><DataAnalyticsLeadActions sticky /></div>
    </main>
  )
}
