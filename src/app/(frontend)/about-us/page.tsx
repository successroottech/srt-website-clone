import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, BriefcaseBusiness, Check, Code2, GraduationCap, Handshake,
  Lightbulb, MessageSquareText, Network, Rocket, Route, Settings2,
  ShieldCheck, Sparkles, Target, UsersRound,
} from 'lucide-react'

import styles from './page.module.css'

const canonical = 'https://successroottech.com/about-us/'

export const metadata: Metadata = {
  title: { absolute: 'About Success Root Technologies | Training, IT Staffing & Software Development' },
  description: 'Learn about Success Root Technologies, a Chennai-based company providing IT training and placement, IT staffing and recruitment, and software development services.',
  alternates: { canonical },
  openGraph: {
    title: 'About Success Root Technologies',
    description: 'A Chennai technology and workforce solutions company connecting practical skills, capable talent and reliable digital delivery.',
    url: canonical,
    type: 'website',
  },
}

const divisions = [
  {
    number: '01', title: 'Training & Placement', icon: GraduationCap,
    description: 'We provide practical, industry-focused IT training designed to help students, freshers and working professionals build job-ready technical skills and prepare for career opportunities.',
    highlights: ['Full Stack Development', 'Data Analytics', 'Java & Python', 'React & Web Technologies', 'Power BI & Advanced Excel', 'Real-Time Projects', 'Interview Preparation', 'Placement Assistance'],
    href: '/it-courses-chennai/', cta: 'Explore Courses', secondaryHref: '/it-job-placement-training-chennai/', secondary: 'Placement Support',
  },
  {
    number: '02', title: 'IT Staffing & Recruitment', icon: UsersRound,
    description: 'We support companies and HR teams with requirement-based sourcing, screening and coordination of skilled IT candidates across multiple technologies and experience levels.',
    highlights: ['Permanent Staffing', 'Contract Staffing', 'Junior & Experienced Candidates', 'Developer Recruitment', 'QA & Testing Resources', 'Data Analytics Resources', 'Candidate Screening', 'Interview Coordination'],
    href: '/contact-us/', cta: 'Hire IT Talent',
  },
  {
    number: '03', title: 'IT Project Development', icon: Code2,
    description: 'We help businesses plan, build, integrate and maintain modern digital solutions — from websites and custom applications to AI, automation, analytics and cloud-based systems.',
    highlights: ['Website Development', 'Custom Web Applications', 'AI Solutions & AI Agents', 'Business Automation', 'Data Analytics & Dashboards', 'API Integration', 'Cloud & DevOps', 'Maintenance & Support'],
    href: '/software-development/', cta: 'Explore Development Services', secondaryHref: '/contact-us/', secondary: 'Discuss Your Project',
  },
]

const audiences = [
  [GraduationCap, 'Students & Freshers', 'People looking for practical IT skills, real-time project exposure and career support.'],
  [Route, 'Working Professionals', 'Professionals looking to upskill, reskill or move into modern technology roles.'],
  [BriefcaseBusiness, 'HR & Hiring Teams', 'Organizations looking for screened technology candidates and staffing support.'],
  [Rocket, 'Startups & Businesses', 'Companies requiring websites, applications, automation, AI, analytics and technology support.'],
] as const

const ecosystem = [
  ['Learn', 'Training & Skill Development', GraduationCap],
  ['Build Careers', 'Placement Support', Target],
  ['Connect Talent', 'IT Staffing & Recruitment', Network],
  ['Build Solutions', 'IT Project Development', Code2],
] as const

const approach = [
  ['01', 'Understand', 'We begin by understanding the learner, hiring or technology requirement.'],
  ['02', 'Plan', 'We define the right training path, talent strategy or technology approach.'],
  ['03', 'Execute', 'Our team delivers with practical execution, communication and clear milestones.'],
  ['04', 'Support', 'We continue to provide guidance and support beyond initial delivery.'],
] as const

const benefits = [
  [BriefcaseBusiness, 'Practical Industry Focus', 'Training, hiring and development aligned with real-world requirements.'],
  [Sparkles, 'Three Capabilities Under One Roof', 'Skills, staffing and software development from one technology partner.'],
  [Target, 'Requirement-Based Approach', 'Solutions tailored to individual, hiring or business requirements.'],
  [Settings2, 'Technology-Focused Team', 'Experience across modern software, analytics and digital technologies.'],
  [MessageSquareText, 'Clear Communication', 'Transparent coordination throughout training, hiring and project delivery.'],
  [ShieldCheck, 'Continued Support', 'Ongoing assistance wherever required after initial engagement.'],
] as const

const aboutSchema = {
  '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Success Root Technologies', url: canonical,
  description: 'Success Root Technologies provides IT training and placement, IT staffing and recruitment, and software development services in Chennai.',
  about: { '@type': 'Organization', name: 'Success Root Technologies', url: 'https://successroottech.com/' },
}

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>About Success Root Technologies</span>
            <h1>Building Skills, Connecting Talent &amp; Delivering Technology</h1>
            <p>Success Root Technologies is a Chennai-based technology and workforce solutions company helping individuals build industry-ready skills, organizations hire the right IT talent, and businesses develop practical digital solutions.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/services/">Explore Our Services <ArrowRight size={18} /></Link>
              <Link className={styles.secondaryButton} href="/contact-us/">Talk to Our Team <ArrowRight size={18} /></Link>
            </div>
            <div className={styles.heroHighlights}>
              <span><GraduationCap size={17} /> Training &amp; Placement</span>
              <span><UsersRound size={17} /> IT Staffing</span>
              <span><Code2 size={17} /> IT Project Development</span>
            </div>
          </div>
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.visualCore}><span>SRT</span><small>Skills · Talent · Technology</small></div>
            <div className={`${styles.visualNode} ${styles.visualNodeOne}`}><GraduationCap /><span>Learn</span></div>
            <div className={`${styles.visualNode} ${styles.visualNodeTwo}`}><UsersRound /><span>Connect</span></div>
            <div className={`${styles.visualNode} ${styles.visualNodeThree}`}><Code2 /><span>Build</span></div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.whoGrid}`}>
          <div><span className={styles.eyebrow}>Who We Are</span><h2>One organization connecting people, opportunity and technology.</h2></div>
          <div className={styles.whoCopy}>
            <p>Success Root Technologies (SRT) brings together technology training, talent solutions and software development under one organization.</p>
            <p>We work with students and professionals who want to strengthen their careers, companies looking for skilled IT resources, and businesses that need reliable technology solutions.</p>
            <p>Our approach combines practical learning, requirement-based talent sourcing and technology delivery with a strong focus on communication, quality and long-term support.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.divisionsSection}`}>
        <div className="container">
          <div className={styles.sectionHeading}><span className={styles.eyebrow}>What We Do</span><h2>Three focused divisions. One technology partner.</h2></div>
          <div className={styles.divisions}>
            {divisions.map(({ icon: Icon, ...division }) => (
              <article className={styles.divisionCard} key={division.number}>
                <div className={styles.cardTop}><span>{division.number}</span><Icon size={28} /></div>
                <h3>{division.title}</h3><p>{division.description}</p>
                <ul>{division.highlights.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
                <div className={styles.cardActions}>
                  <Link href={division.href}>{division.cta} <ArrowRight size={17} /></Link>
                  {division.secondaryHref && <Link className={styles.textLink} href={division.secondaryHref}>{division.secondary}</Link>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.purposeSection}`}>
        <div className="container">
          <div className={styles.sectionHeadingLight}><span className={styles.eyebrow}>Our Purpose</span><h2>Progress built around practical opportunity.</h2></div>
          <div className={styles.purposeGrid}>
            <article><div><Target /></div><span>Mission</span><p>To create practical technology opportunities by helping people build relevant skills, helping organizations access capable talent, and helping businesses solve problems through reliable technology.</p></article>
            <article><div><Lightbulb /></div><span>Vision</span><p>To grow Success Root Technologies into a trusted technology partner connecting skills, talent and digital innovation.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeading}><span className={styles.eyebrow}>Who We Work With</span><h2>Focused support for every side of the technology ecosystem.</h2></div>
          <div className={styles.audienceGrid}>{audiences.map(([Icon, title, description]) => <article key={title}><div><Icon /></div><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ecosystemSection}`}>
        <div className="container">
          <div className={styles.sectionHeading}><span className={styles.eyebrow}>The SRT Ecosystem</span><h2>From learning to careers, talent and solutions.</h2><p>We connect education, employment and technology through one practical operating model.</p></div>
          <div className={styles.ecosystemFlow}>{ecosystem.map(([title, description, Icon], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><Icon /><h3>{title}</h3><p>{description}</p></div>{index < ecosystem.length - 1 && <ArrowRight className={styles.flowArrow} />}</article>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.approachSection}`}>
        <div className={`container ${styles.approachGrid}`}>
          <div className={styles.approachIntro}><span className={styles.eyebrow}>How We Work</span><h2>A clear approach from requirement to continued support.</h2><p>Every engagement begins with understanding. The path changes, but our focus on practical execution and communication stays consistent.</p></div>
          <div className={styles.steps}>{approach.map(([number, title, description]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeading}><span className={styles.eyebrow}>Why SRT</span><h2>Why Success Root Technologies?</h2></div>
          <div className={styles.benefitGrid}>{benefits.map(([Icon, title, description]) => <article key={title}><Icon /><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
        </div>
      </section>

      <section className={styles.profileSection}>
        <div className={`container ${styles.profileCard}`}>
          <div><span className={styles.eyebrow}>Corporate Information</span><h2>Looking for Our Complete Company Profile?</h2><p>Explore SRT&apos;s complete capabilities across training, staffing, recruitment and technology services.</p></div>
          <Link className={styles.primaryButton} href="/company-profile/">View Company Profile <ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className="container"><div><span className={styles.eyebrow}>Start a Conversation</span><h2>Let&apos;s Build the Next Opportunity Together</h2><p>Whether you are building your career, hiring technology talent or planning your next digital project, Success Root Technologies is ready to support you.</p></div><div className={styles.finalActions}><Link className={styles.primaryButton} href="/services/">Explore Services <ArrowRight size={18} /></Link><Link className={styles.lightButton} href="/contact-us/">Contact SRT <Handshake size={18} /></Link></div></div>
      </section>
    </main>
  )
}
