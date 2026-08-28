import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Check,
  CloudCog,
  Code2,
  Database,
  GraduationCap,
  Handshake,
  Layers3,
  Network,
  Rocket,
  SearchCheck,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'

import styles from './services.module.css'

const canonical = 'https://successroottech.com/services/'

export const metadata: Metadata = {
  title: { absolute: 'IT Services, Training, Staffing & Software Development in Chennai | SRT' },
  description:
    'Success Root Technologies provides IT training and placement support, IT staffing and recruitment, and custom software development services in Chennai.',
  alternates: { canonical },
  openGraph: {
    title: 'Skills, Talent & Technology Services | Success Root Technologies',
    description:
      'IT training, staffing and software development services for individuals, hiring teams and growing businesses.',
    url: canonical,
    type: 'website',
  },
}

const services = [
  {
    number: '01',
    title: 'Training & Placement',
    subtitle: 'Build Skills. Become Job Ready.',
    description:
      'Industry-focused IT training for students, freshers and professionals through hands-on learning, real-time projects and career support.',
    icon: GraduationCap,
    highlights: [
      'Full Stack & Data Analytics training',
      'Java, Python, React & web technologies',
      'Power BI & Advanced Excel',
      'Real-time project training',
      'Resume and interview preparation',
      'Placement assistance & career guidance',
    ],
    href: '/it-courses-chennai/',
    cta: 'Explore Training Programs',
    secondaryHref: '/it-job-placement-training-chennai/',
    secondary: 'Placement Support',
  },
  {
    number: '02',
    title: 'IT Staffing & Recruitment',
    subtitle: 'Find the Right IT Talent Faster.',
    description:
      'We help companies identify and connect with skilled IT professionals based on technology, experience, availability and project needs.',
    icon: Users,
    highlights: [
      'Permanent & contract staffing',
      'Junior and experienced candidates',
      'Development, QA & testing resources',
      'Data analytics professionals',
      'Candidate screening & coordination',
      'Requirement-based talent sourcing',
    ],
    href: '/contact-us/',
    cta: 'Hire IT Talent',
  },
  {
    number: '03',
    title: 'IT Project Development',
    subtitle: 'From Idea to Production.',
    description:
      'We design, develop, integrate and maintain modern digital solutions aligned with the needs of startups, businesses and enterprises.',
    icon: Code2,
    highlights: [
      'Websites & custom web applications',
      'E-commerce development',
      'AI solutions & business automation',
      'Analytics, dashboards & integrations',
      'Cloud, DevOps & modernization',
      'Maintenance & technical support',
    ],
    href: '/software-development/',
    cta: 'Explore Development Services',
    secondaryHref: '/contact-us/',
    secondary: 'Discuss Your Project',
  },
]

const audiences = [
  {
    title: 'Students & Job Seekers',
    description:
      'Build practical IT skills, work on real-time projects and prepare for interviews with placement-focused career support.',
    icon: GraduationCap,
    href: '/it-courses-chennai/',
    cta: 'Explore Courses',
  },
  {
    title: 'HR & Hiring Teams',
    description:
      'Access screened IT candidates across development, testing, analytics and other technology roles.',
    icon: BriefcaseBusiness,
    href: '/contact-us/',
    cta: 'Hire Talent',
  },
  {
    title: 'Businesses & Startups',
    description:
      'Turn business requirements into scalable websites, applications, automation and AI-powered digital solutions.',
    icon: Rocket,
    href: '/software-development/',
    cta: 'Start a Project',
  },
]

const capabilities = [
  [Code2, 'Custom Web Applications', 'Purpose-built portals, products and workflow applications.'],
  [Bot, 'AI Solutions & AI Agents', 'Practical assistants, knowledge systems and agent workflows.'],
  [Workflow, 'Business Automation', 'Connect repetitive tasks, approvals, data and business tools.'],
  [BarChart3, 'Data Analytics & Dashboards', 'Decision-ready reporting, Power BI and analytics solutions.'],
  [Network, 'API & System Integration', 'Secure connections across platforms, services and existing systems.'],
  [CloudCog, 'Cloud & DevOps', 'Reliable deployments, delivery automation and cloud operations.'],
  [ShoppingCart, 'E-Commerce Solutions', 'Customer-focused online commerce and operational integrations.'],
  [Settings2, 'Application Modernization', 'Improve legacy applications for performance and maintainability.'],
] as const

const process = [
  ['01', 'Understand', 'We understand your training, hiring or technology requirement.'],
  ['02', 'Plan', 'Our team defines the right approach, resources and delivery roadmap.'],
  ['03', 'Execute', 'Work progresses through clear activities, milestones and communication.'],
  ['04', 'Validate', 'We review quality, outcomes and alignment with the requirement.'],
  ['05', 'Support', 'We provide continued support after delivery wherever required.'],
]

const benefits = [
  [BriefcaseBusiness, 'Practical Industry Experience'],
  [Code2, 'Technology-Focused Team'],
  [Layers3, 'Training + Staffing + Development'],
  [Handshake, 'Flexible Engagement Models'],
  [SearchCheck, 'Transparent Communication'],
  [ShieldCheck, 'Ongoing Support'],
] as const

const technologies = [
  'Java', 'Python', 'React', 'Next.js', 'Node.js', 'TypeScript',
  'PostgreSQL', 'Power BI', 'Advanced Excel', 'AI / LLM', 'REST APIs', 'Cloud / DevOps',
]

export default function ServicesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Success Root Technologies Services',
    url: canonical,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
          '@type': 'Organization',
          name: 'Success Root Technologies',
          url: 'https://successroottech.com/',
        },
      },
    })),
  }

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}><Sparkles size={15} /> Skills · Talent · Technology</span>
            <h1>One Partner for Skills, Talent & Technology</h1>
            <p>
              Success Root Technologies helps individuals build job-ready skills, companies hire
              skilled IT professionals, and businesses design and develop reliable technology solutions.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="#core-services">Explore Our Services <ArrowRight size={18} /></a>
              <Link className={styles.secondaryButton} href="/contact-us/">Talk to Our Team</Link>
            </div>
          </div>
          <div className={styles.heroVisual} aria-label="SRT service verticals">
            <div className={styles.orbit}><span>SRT</span></div>
            <div className={`${styles.heroPill} ${styles.pillOne}`}><GraduationCap /><span>Training & Placement</span></div>
            <div className={`${styles.heroPill} ${styles.pillTwo}`}><Users /><span>IT Staffing</span></div>
            <div className={`${styles.heroPill} ${styles.pillThree}`}><Code2 /><span>IT Project Development</span></div>
          </div>
        </div>
        <div className={`container ${styles.heroHighlights}`}>
          <span><GraduationCap /> Training & Placement</span>
          <span><Users /> IT Staffing</span>
          <span><Code2 /> IT Project Development</span>
        </div>
      </section>

      <section className={styles.section} id="core-services">
        <div className="container">
          <div className={styles.sectionHead}>
            <div><span className={styles.eyebrow}>Our core services</span><h2>Three connected ways to help you move forward</h2></div>
            <p>Build capability, find the right people, or deliver the technology your organization needs.</p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map(({ icon: Icon, ...service }) => (
              <article className={styles.serviceCard} key={service.number}>
                <div className={styles.cardTop}><span>{service.number}</span><div><Icon /></div></div>
                <h3>{service.title}</h3>
                <strong>{service.subtitle}</strong>
                <p>{service.description}</p>
                <ul>{service.highlights.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
                {service.number === '02' && (
                  <div className={styles.staffingFlow} aria-label="Staffing process">
                    {['Requirement', 'Screening', 'Shortlisting', 'Interview', 'Hiring'].map((step, index) => (
                      <span key={step}>{step}{index < 4 && <ArrowRight size={11} />}</span>
                    ))}
                  </div>
                )}
                <div className={styles.cardActions}>
                  <Link href={service.href}>{service.cta}<ArrowRight size={16} /></Link>
                  {service.secondaryHref && <Link className={styles.textLink} href={service.secondaryHref}>{service.secondary}</Link>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.audienceSection}`}>
        <div className="container">
          <div className={styles.centerHead}><span className={styles.eyebrow}>Who we serve</span><h2>Solutions for Every Stage of Growth</h2></div>
          <div className={styles.audienceGrid}>
            {audiences.map(({ icon: Icon, ...audience }) => (
              <article key={audience.title}><div><Icon /></div><h3>{audience.title}</h3><p>{audience.description}</p><Link href={audience.href}>{audience.cta}<ArrowRight size={16} /></Link></article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className="container">
          <div className={styles.sectionHeadDark}>
            <div><span className={styles.eyebrow}>IT project development</span><h2>Our Technology Capabilities</h2></div>
            <p>Focused engineering capabilities for modern operations, products and customer experiences.</p>
          </div>
          <div className={styles.capabilityGrid}>
            {capabilities.map(([Icon, title, description]) => <article key={title}><Icon /><h3>{title}</h3><p>{description}</p></article>)}
          </div>
          <Link className={styles.darkLink} href="/software-development/">Explore all development services <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.centerHead}><span className={styles.eyebrow}>A clear approach</span><h2>How We Work</h2></div>
          <ol className={styles.processGrid}>
            {process.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.whySection}`}>
        <div className="container">
          <div className={styles.sectionHead}><div><span className={styles.eyebrow}>The SRT advantage</span><h2>Why Choose Success Root Technologies?</h2></div><p>A practical, technology-led partner focused on clear requirements and useful outcomes.</p></div>
          <div className={styles.benefitGrid}>{benefits.map(([Icon, title]) => <article key={title}><Icon /><h3>{title}</h3></article>)}</div>
        </div>
      </section>

      <section className={styles.techSection}>
        <div className="container">
          <div className={styles.centerHead}><span className={styles.eyebrow}>Modern technology</span><h2>Technologies We Work With</h2></div>
          <div className={styles.techGrid}>{technologies.map((technology) => <span key={technology}><Database size={17} />{technology}</span>)}</div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={`container ${styles.finalCtaInner}`}>
          <div><span className={styles.eyebrow}>Start a conversation</span><h2>What Can SRT Help You With?</h2><p>Whether you want to build your career, hire the right IT professionals, or develop your next technology solution, our team is ready to help.</p></div>
          <div className={styles.finalActions}>
            <Link href="/it-courses-chennai/">Explore Courses</Link>
            <Link href="/contact-us/">Hire IT Talent</Link>
            <Link href="/software-development/">Discuss a Project</Link>
            <Link className={styles.contactLink} href="/contact-us/">Contact Us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <div className={styles.internalLinks}>
        <div className="container"><span>Learn more about SRT:</span><Link href="/about-us/">About Us</Link><Link href="/contact-us/">Contact Us</Link></div>
      </div>
    </main>
  )
}
