import type { Metadata } from 'next'
import { getAbsoluteURL } from '@/utilities/getURL'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  GraduationCap,
  Mail,
  MapPin,
  Network,
  Phone,
  SearchCheck,
  ShieldCheck,
  Target,
  UsersRound,
} from 'lucide-react'

import { PrintProfileButton } from '@/components/PrintProfileButton'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Company Profile – Recruitment, Staffing & IT Training',
  description:
    'Success Root Technologies is a Chennai recruitment, staffing, IT training and HR solutions company supporting IT and non-IT hiring across India.',
  alternates: { canonical: '/company-profile/' },
  openGraph: {
    title: 'Success Root Technologies Corporate Profile',
    description:
      'Recruitment, staffing, IT training and end-to-end HR solutions for growing organizations.',
    images: [{ url: '/website-template-OG.webp' }],
    type: 'website',
  },
}

const recruitmentServices = [
  'Permanent Staffing',
  'Contract Staffing',
  'Bulk Hiring',
  'Campus Recruitment',
  'Lateral Hiring',
  'Executive Search',
  'Walk-in Drive Management',
  'Interview Coordination',
]

const trainingServices = [
  'Full Stack Development',
  'Python Development',
  'Java Development',
  'Data Analytics',
  'Data Science',
  'AI & Generative AI',
  'SAP',
  'Digital Marketing',
  'Tally Prime & GST',
  'Cloud Computing',
  'DevOps',
  'Software Testing',
]

const hrServices = [
  'Candidate Screening',
  'Resume Shortlisting',
  'Interview Scheduling',
  'Background Verification Coordination',
  'Payroll Support',
  'Employee Onboarding Support',
]

const industries = [
  'Information Technology',
  'Banking & Financial Services',
  'BPO & KPO',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Logistics',
  'Education',
  'E-Commerce',
  'Telecom',
]

const itRoles = [
  'Software Developer',
  'Full Stack Developer',
  'Python Developer',
  'Java Developer',
  'React Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Analyst',
  'Data Scientist',
  'Power BI Developer',
  'SQL Developer',
  'QA Engineer',
  'Automation Tester',
  'Manual Tester',
  'DevOps Engineer',
  'Cloud Engineer',
  'SAP Consultant',
]

const nonItRoles = [
  'Business Development Executive',
  'Sales Executive',
  'Telecaller',
  'Customer Support Executive',
  'HR Executive',
  'Recruiter',
  'Process Associate',
  'Operations Executive',
  'Office Administrator',
  'Accounts Executive',
]

const reasons = [
  'Large Candidate Database',
  'Dedicated Recruitment Team',
  'Fast Turnaround Time',
  'Pre-Screened Candidates',
  'Technical Assessment Support',
  'HR Interview Coordination',
  'Customized Hiring Solutions',
  'Flexible Recruitment Models',
  'Freshers & Experienced Professionals',
  'End-to-End Recruitment Support',
]

const process = [
  'Requirement Understanding',
  'Candidate Sourcing',
  'Resume Screening',
  'Technical Assessment',
  'HR Screening',
  'Client Interview Coordination',
  'Offer Management',
  'Joining Support',
  'Post-Joining Follow-up',
]

const strengths = [
  'Strong Network Across Colleges',
  'Experienced Recruitment Team',
  'Industry-Oriented Training Programs',
  'Quick Hiring Support',
  'Quality Candidate Screening',
  'Dedicated Relationship Manager',
  'Continuous Candidate Engagement',
]

const serviceGroups = [
  {
    icon: UsersRound,
    label: 'Recruitment Services',
    copy: 'Flexible talent acquisition support for individual, lateral and high-volume requirements.',
    items: recruitmentServices,
  },
  {
    icon: GraduationCap,
    label: 'IT Training',
    copy: 'Industry-focused technical programs designed to build practical, employable capabilities.',
    items: trainingServices,
  },
  {
    icon: BriefcaseBusiness,
    label: 'HR Solutions',
    copy: 'Reliable operational support across screening, interviews, verification and onboarding.',
    items: hrServices,
  },
]

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'EmploymentAgency'],
  name: 'Success Root Technologies',
  url: 'https://successroottech.com/',
  logo: getAbsoluteURL('/srt-logo.png'),
  description:
    'Chennai-based recruitment, staffing, IT training and HR solutions organization serving IT and non-IT hiring requirements.',
  email: 'contact@successroottech.com',
  telephone: '+91-89390-69135',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 9/5, Station Road, West Mambalam',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600033',
    addressCountry: 'IN',
  },
  areaServed: 'India',
  slogan: 'Building Careers. Empowering Businesses.',
}

function List({ items }: { items: string[] }) {
  return (
    <ul className={styles.cleanList}>
      {items.map((item) => (
        <li key={item}>
          <CheckCircle2 aria-hidden="true" size={16} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function CompanyProfilePage() {
  return (
    <main className={styles.page}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        type="application/ld+json"
      />

      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <Building2 aria-hidden="true" size={17} /> Corporate Profile
            </span>
            <h1>Building Careers.<br /><span>Empowering Businesses.</span></h1>
            <p>
              Success Root Technologies connects employers with capable talent through focused
              recruitment, flexible staffing, industry-oriented IT training and dependable HR solutions.
            </p>
            <div className={styles.heroTags}>
              <span>Recruitment</span><span>Staffing</span><span>IT Training</span><span>HR Solutions</span>
            </div>
            <div className={styles.heroActions}>
              <a href="https://wa.me/918939069135?text=Hello%20SRT%2C%20I%20would%20like%20to%20discuss%20a%20recruitment%20or%20staffing%20requirement.">
                Discuss a Hiring Requirement <ArrowRight aria-hidden="true" size={18} />
              </a>
              <PrintProfileButton />
            </div>
          </div>
          <aside className={styles.heroCard}>
            <Image alt="Success Root Technologies" height={138} priority src="/srt-logo.png" width={138} />
            <small>Success Root Technologies</small>
            <strong>Recruitment. Training.<br />Business Growth.</strong>
            <div className={styles.heroFacts}>
              <div><MapPin size={17} /><span>Chennai, Tamil Nadu</span></div>
              <div><Network size={17} /><span>IT & Non-IT Talent Network</span></div>
              <div><ShieldCheck size={17} /><span>End-to-End Hiring Support</span></div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={`container ${styles.aboutGrid}`}>
          <div>
            <span className={styles.sectionTag}>About us</span>
            <h2>A reliable talent and training partner for growing organizations</h2>
          </div>
          <div className={styles.aboutCopy}>
            <p>
              <strong>Success Root Technologies</strong> is a Chennai-based IT training, recruitment and
              staffing organization dedicated to bridging the gap between talented job seekers and leading employers.
            </p>
            <p>
              We source, screen, train and deploy candidates across IT and non-IT domains. Our process is
              designed to deliver relevant talent efficiently, helping organizations reduce hiring time and
              improve recruitment outcomes.
            </p>
            <p>
              Our talent network includes fresh graduates, experienced professionals and trained candidates,
              enabling support for bulk hiring, lateral hiring, campus recruitment and project-based staffing.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionTag}>Our services</span><h2>Integrated workforce solutions</h2></div>
            <p>One accountable partner across talent acquisition, capability development and HR operations.</p>
          </div>
          <div className={styles.serviceGrid}>
            {serviceGroups.map(({ copy, icon: Icon, items, label }, index) => (
              <article className={styles.serviceCard} key={label}>
                <div className={styles.cardTop}>
                  <span className={styles.serviceNumber}>0{index + 1}</span>
                  <Icon aria-hidden="true" size={28} />
                </div>
                <h3>{label}</h3>
                <p>{copy}</p>
                <List items={items} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.industriesSection}>
        <div className={`container ${styles.industriesGrid}`}>
          <div className={styles.darkIntro}>
            <span className={styles.sectionTag}>Industries we serve</span>
            <h2>Talent support across high-growth sectors</h2>
            <p>Our adaptable sourcing and screening model supports varied business environments and role requirements.</p>
            <Building2 aria-hidden="true" size={54} />
          </div>
          <div className={styles.industryTiles}>
            {industries.map((industry, index) => (
              <div key={industry}><span>{String(index + 1).padStart(2, '0')}</span><strong>{industry}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.rolesSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionTag}>Roles we hire</span><h2>Technology and business talent</h2></div>
            <p>Coverage for entry-level, specialist, lateral and operational hiring requirements.</p>
          </div>
          <div className={styles.roleGrid}>
            <article>
              <div className={styles.roleTitle}><SearchCheck size={25} /><h3>IT Roles</h3></div>
              <div className={styles.rolePills}>{itRoles.map((role) => <span key={role}>{role}</span>)}</div>
            </article>
            <article>
              <div className={styles.roleTitle}><BriefcaseBusiness size={25} /><h3>Non-IT Roles</h3></div>
              <div className={styles.rolePills}>{nonItRoles.map((role) => <span key={role}>{role}</span>)}</div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={`container ${styles.whyGrid}`}>
          <div>
            <span className={styles.sectionTag}>Why choose SRT</span>
            <h2>Built for responsive, quality-focused hiring</h2>
            <p>We combine talent access, structured assessment and coordinated delivery to support confident hiring decisions.</p>
            <div className={styles.reasonGrid}>
              {reasons.map((reason) => <div key={reason}><BadgeCheck size={19} /><span>{reason}</span></div>)}
            </div>
          </div>
          <aside className={styles.strengthCard}>
            <span>Our strengths</span>
            <h3>A practical recruitment ecosystem</h3>
            <List items={strengths} />
          </aside>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div><span className={styles.sectionTag}>Recruitment process</span><h2>From requirement to successful joining</h2></div>
            <p>A clear, coordinated workflow with consistent communication at every stage.</p>
          </div>
          <ol className={styles.processFlow}>
            {process.map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.purposeSection}>
        <div className={`container ${styles.purposeGrid}`}>
          <article>
            <Target aria-hidden="true" size={30} />
            <span>Our mission</span>
            <h2>Empower talent and organizations</h2>
            <p>To empower organizations with exceptional talent while helping job seekers build successful careers through quality recruitment, staffing and professional training.</p>
          </article>
          <article>
            <Network aria-hidden="true" size={30} />
            <span>Our vision</span>
            <h2>Become a trusted national partner</h2>
            <p>To become one of India&apos;s most trusted recruitment and training organizations by delivering excellence, innovation and long-term business partnerships.</p>
          </article>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={`container ${styles.contactCard}`}>
          <div>
            <span className={styles.sectionTag}>Partner with us</span>
            <h2>Let&apos;s build your next high-performing team.</h2>
            <p>Share your hiring, staffing or training requirement with our Chennai team.</p>
          </div>
          <address>
            <a href="tel:+918939069135"><Phone size={19} /><span><small>Call or WhatsApp</small>+91 89390 69135</span></a>
            <a href="mailto:contact@successroottech.com"><Mail size={19} /><span><small>Email</small>contact@successroottech.com</span></a>
            <div><MapPin size={19} /><span><small>Office</small>No. 9/5, Station Road, West Mambalam,<br />Chennai – 600033, Tamil Nadu</span></div>
          </address>
          <div className={styles.contactActions}>
            <a href="https://wa.me/918939069135">Start a Conversation <ArrowRight size={18} /></a>
            <Link href="/contact-us/">Contact Page</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
