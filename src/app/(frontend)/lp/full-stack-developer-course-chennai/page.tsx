import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Braces, BriefcaseBusiness, Check, CloudUpload, Code2, Database, GitBranch, Laptop, MapPin, Network, Server, Users } from 'lucide-react'

import { FullStackLeadActions, FullStackLeadForm } from './FullStackLeadForm'
import styles from './page.module.css'

const canonical = 'https://successroottech.com/courses/full-stack-developer-course-chennai/'

export const metadata: Metadata = {
  title: { absolute: 'Full Stack Developer Course in Chennai | Training & Placement Assistance | SRT' },
  description: 'Explore SRT’s Full Stack Developer training in Chennai with practical coding, real-time projects, frontend and backend development, and placement assistance. Get current fees and batch details.',
  alternates: { canonical },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Full Stack Developer Course in Chennai with Placement Assistance',
    description: 'Practical MERN Full Stack training in React JS, Node.js, Express.js and MongoDB at SRT Chennai.',
    url: canonical,
  },
}

const modules = [
  ['HTML & CSS', 'Build structured, responsive web pages using HTML5, CSS3 and modern layout techniques.', Code2],
  ['JavaScript', 'Learn ES6+ fundamentals and write interactive browser-based applications.', Braces],
  ['React JS', 'Develop reusable components and responsive frontend application experiences.', Laptop],
  ['Node.js & Express.js', 'Build backend services, application routes and REST APIs.', Server],
  ['MongoDB', 'Work with document databases and connect application data to the backend.', Database],
  ['Git, GitHub & Postman', 'Manage source code, collaborate through GitHub and test APIs with Postman.', GitBranch],
  ['REST APIs & JSON', 'Connect frontend and backend systems through REST APIs, JSON and API integration.', Network],
  ['Application Deployment', 'Prepare and deploy the Full Stack capstone application.', CloudUpload],
] as const

const projects = [
  ['Responsive Web Application', 'Build a responsive user interface with HTML, CSS and JavaScript.'],
  ['React Application', 'Create reusable React components and interactive frontend experiences.'],
  ['REST API Project', 'Develop and test backend endpoints using Node.js, Express.js and Postman.'],
  ['MongoDB Application', 'Connect application workflows to a MongoDB database.'],
  ['Full Stack Capstone', 'Integrate frontend, backend and database work into a deployable application.'],
]

const outcomes = [
  ['Responsive Frontends', 'Build responsive interfaces using HTML, CSS, JavaScript and React JS.'],
  ['Backend APIs', 'Develop Node.js and Express.js routes and REST API workflows.'],
  ['Database Integration', 'Store and work with application data using MongoDB.'],
  ['Full Stack Integration', 'Connect frontend experiences with backend services and databases.'],
  ['Capstone Development', 'Apply the stack through assignments, mini projects and a Full Stack capstone.'],
]

const reasons = [
  ['Practical Coding Sessions', 'Learn through instructor-guided coding and exercises.', Laptop],
  ['Frontend + Backend Learning', 'Develop skills across React, Node.js, Express.js and MongoDB.', Code2],
  ['Real-Time Project Development', 'Apply the curriculum through assignments and projects.', Braces],
  ['Trainer Guidance', 'Get structured support while building development confidence.', Users],
  ['Interview Preparation', 'Prepare technical explanations, projects and your developer profile.', BriefcaseBusiness],
  ['Placement Assistance', 'Access resume guidance, mock interviews and job opportunity updates.', GitBranch],
] as const

const reviews = [
  ['Murali Lakshmanan', 'I am very happy to share that I received my Front-End Developer job offer letter today. A heartfelt thank you to Success Root Technologies.'],
  ['Padmanaban', 'Very helpful to get placement and learn new things with the help of the staff members.'],
  ['B Dhanashree', 'I’m really happy with my experience with Success Root Technologies. They provided excellent placement support and guidance.'],
]

const faqs = [
  ['What is the Full Stack course duration?', 'Duration can vary by batch plan. Request the latest syllabus and schedule for the current duration.'],
  ['What technologies are covered?', 'The core curriculum covers HTML, CSS, JavaScript, React JS, Node.js, Express.js, MongoDB, REST APIs, GitHub and Postman.'],
  ['Is React JS included?', 'Yes. React JS is included as the core frontend application framework.'],
  ['Is backend development included?', 'Yes. Backend development includes Node.js, Express.js, REST APIs, JSON and API integration.'],
  ['Are practical projects included?', 'Yes. Training includes weekly assignments, mini projects and a Full Stack capstone project.'],
  ['Is classroom and online training available?', 'Yes. Classroom training is available in West Mambalam, Chennai, and online training is also available.'],
  ['Does SRT provide placement assistance?', 'Yes. Support includes resume and GitHub guidance, interview preparation, mock interviews and job opportunity updates. Placement assistance does not guarantee employment.'],
  ['Can freshers and beginners join?', 'Yes. The course starts with web fundamentals and is suitable for students, fresh graduates, job seekers and career switchers.'],
]

export default function FullStackAdsLandingPage() {
  return (
    <main className={`srt-ad-landing ${styles.page}`}>
      <header className={styles.miniHeader}>
        <div className={styles.shell}>
          <Link href="/" aria-label="Success Root Technologies main website">
            <Image src="/srt-full-logo.png" alt="Success Root Technologies" width={700} height={300} priority unoptimized />
          </Link>
          <FullStackLeadActions compact />
        </div>
      </header>

      <section className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>FULL STACK DEVELOPER TRAINING • CHENNAI</span>
            <h1>Full Stack Developer Course in Chennai with Placement Assistance</h1>
            <p className={styles.heroLead}>Build practical development skills in React JS, Node.js, Express.js and MongoDB through hands-on training, assignments and projects.</p>
            <div className={styles.benefits}>
              {['Classroom & Online Training', 'Practical Coding Sessions', 'Real-Time Projects', 'Placement Assistance', 'Interview Preparation', 'Weekday / Weekend Batches'].map((item) => <span key={item}><Check size={17} />{item}</span>)}
            </div>
            <div className={styles.location}><MapPin size={19} /><div><strong>West Mambalam, Chennai</strong><span>Beginner-friendly · Instructor-led training</span></div></div>
          </div>
          <FullStackLeadForm />
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="Course highlights">
        <div className={styles.shell}>
          {['React JS', 'Node.js', 'Express.js', 'MongoDB', 'Practical Projects', 'Placement Assistance'].map((item) => <span key={item}><Check size={16} />{item}</span>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.credentials}`} aria-labelledby="credentials-title">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>SRT CREDENTIALS</span><h2 id="credentials-title">Trusted Training. Recognized Standards.</h2><p>Build your career with practical training supported by established quality standards and career-focused learning.</p></div>
          <div className={styles.credentialGrid}>
            <article><div><Image src="/trust/iso-9001.png" alt="ISO 9001:2015 certification" width={820} height={552} sizes="160px" /></div><h3>ISO 9001:2015</h3><p>Quality Management Standard</p></article>
            <article><div><Image src="/trust/msme.png" alt="MSME registered business" width={500} height={395} sizes="160px" /></div><h3>MSME Registered</h3><p>Registered Business</p></article>
            <article><div><Image src="/trust/iaf-accreditation.webp" alt="International Accreditation Forum recognition" width={500} height={395} sizes="180px" /></div><h3>IAF Recognition</h3><p>International Accreditation Forum</p></article>
          </div>
          <div className={styles.credentialStats} aria-label="SRT outcomes and experience">
            <div><strong>300+</strong><span>Students Placed</span></div>
            <div><strong>20+</strong><span>Partner Companies</span></div>
            <div><strong>3+</strong><span>Years of Experience</span></div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>FULL STACK CURRICULUM</span><h2>Technologies You’ll Learn</h2><p>Build frontend, backend and database skills through a verified MERN Stack curriculum.</p></div>
          <div className={styles.moduleGrid}>{modules.map(([title, copy, Icon]) => <article key={title}><div className={styles.icon}><Icon size={24} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <FullStackLeadActions />
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>PRACTICAL OUTCOMES</span><h2>Build Practical Full Stack Development Skills</h2><p>Connect the technologies you learn through guided development work.</p></div>
          <div className={styles.projectGrid}>{outcomes.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>WHY SUCCESS ROOT TECHNOLOGIES</span><h2>Why Choose SRT for Full Stack Training?</h2></div>
          <div className={styles.reasonGrid}>{reasons.map(([title, copy, Icon]) => <article key={title}><Icon size={22} /><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.shell} ${styles.proofGrid}`}>
          <div className={styles.proofCopy}><span className={styles.eyebrowDark}>REAL SRT CLASSROOMS · 2026</span><h2>Learn Through Practical Development</h2><p>Build development confidence through guided coding sessions, practical exercises and project-based learning.</p><ul>{['Instructor-led coding sessions', 'Hands-on computer practice', 'West Mambalam training centre'].map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul></div>
          <div className={styles.gallery}>
            <figure className={styles.galleryFeature}><Image src="/course-trust/srt-training-centre-2026.jpg" alt="Success Root Technologies training centre classroom in West Mambalam Chennai" width={1600} height={900} sizes="(max-width: 800px) 100vw, 58vw" /><figcaption>SRT training centre</figcaption></figure>
            <figure><Image src="/course-trust/srt-classroom-training-2026.jpg" alt="Instructor-led classroom training at Success Root Technologies in Chennai" width={1600} height={3556} sizes="(max-width: 560px) 46vw, (max-width: 800px) 50vw, 29vw" /><figcaption>Classroom sessions</figcaption></figure>
            <figure><Image src="/course-trust/srt-practical-lab-2026.jpg" alt="Students completing practical computer exercises at Success Root Technologies" width={1400} height={3111} sizes="(max-width: 560px) 46vw, (max-width: 800px) 50vw, 29vw" /><figcaption>Practical learning</figcaption></figure>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.placementProof}`} aria-labelledby="placement-proof-title">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>PLACEMENT HIGHLIGHTS • 2026</span><h2 id="placement-proof-title">Our Placement Success Stories</h2><p>Celebrating learners who progressed from technical training and interview preparation to new career opportunities.</p></div>
          <div className={styles.placementImage}>
            <Image src="/placements/srt-placed-candidates-2026.webp" alt="Success Root Technologies 2026 placement highlights featuring successfully placed candidates" width={1920} height={1080} sizes="(max-width: 1200px) calc(100vw - 40px), 1160px" />
          </div>
          <div className={styles.placementCta}><h3>Ready to Start Your Full Stack Career?</h3><p>Get current course fees, batch details and placement-support information from the SRT team.</p><FullStackLeadActions /></div>
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
          <div className={styles.sectionHeading}><span>PROJECT-BASED LEARNING</span><h2>Build Real Full Stack Projects</h2><p>Complete weekly assignments, mini projects and a Full Stack capstone project with application deployment.</p></div>
          <div className={styles.projectGrid}>{projects.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.career}`}>
        <div className={`${styles.shell} ${styles.careerGrid}`}>
          <div><span className={styles.eyebrow}>CAREER-FOCUSED SUPPORT</span><h2>Career & Placement Support</h2><p>Prepare to present your skills, projects and developer profile with confidence while receiving guidance on suitable opportunities.</p><FullStackLeadActions /></div>
          <div className={styles.supportList}>{['Resume Preparation', 'GitHub Profile Guidance', 'Portfolio Guidance', 'Interview Preparation', 'Mock Interviews', 'Technical Interview Guidance', 'Job Opportunity Updates', 'Placement Assistance'].map((item) => <span key={item}><Check size={17} />{item}</span>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>BEGINNER FRIENDLY</span><h2>Who Can Join the Full Stack Course?</h2></div>
          <div className={styles.audienceGrid}>{['Students', 'Fresh Graduates', 'Job Seekers', 'Working Professionals', 'Career Switchers', 'Beginners interested in software development'].map((item) => <article key={item}><Users size={20} /><strong>{item}</strong></article>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.format}`}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><span>COURSE FORMAT</span><h2>Plan Your Full Stack Training</h2><p>Speak with an advisor for the current duration, fees and next available batch.</p></div>
          <div className={styles.formatGrid}>{[['Duration', 'Contact SRT for Current Duration'], ['Training Mode', 'Classroom / Online'], ['Batch Options', 'Weekday / Weekend'], ['Location', 'West Mambalam, Chennai'], ['Learning', 'Assignments + Projects'], ['Career Support', 'Placement Assistance']].map(([label, value]) => <article key={label}><small>{label}</small><strong>{value}</strong></article>)}</div>
          <FullStackLeadActions />
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.shell} ${styles.locationGrid}`}>
          <div><span className={styles.eyebrowDark}>CHENNAI CLASSROOM TRAINING</span><h2>Full Stack Developer Training in Chennai</h2><p><strong>Success Root Technologies</strong><br />Old No. 8/1, New No. 15/1, First Floor,<br />Rajaji Street, West Mambalam,<br />Chennai, Tamil Nadu 600033</p></div>
          <div className={styles.locationCard}><MapPin size={30} /><h3>Visit SRT in West Mambalam</h3><p>Meet the course team and learn about the syllabus, current fees and batch options.</p><FullStackLeadActions directions /></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className={`${styles.shell} ${styles.faqLayout}`}>
          <div className={styles.sectionHeading}><span>COURSE QUESTIONS</span><h2>Full Stack Course FAQs</h2><p>Clear answers about the curriculum, learning format and career support.</p></div>
          <div className={styles.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.shell}><span>START YOUR FULL STACK JOURNEY</span><h2>Get Current Fees & Next Batch Details</h2><p>Complete the short form and an SRT course advisor will contact you with the latest information.</p><FullStackLeadActions /></div>
      </section>

      <footer className={styles.miniFooter}>
        <div className={styles.shell}><span>© {new Date().getFullYear()} Success Root Technologies</span><nav aria-label="Essential links"><Link href="/privacy-policy/">Privacy Policy</Link><Link href="/contact-us/">Contact</Link><Link href="/">Main Website</Link></nav></div>
      </footer>

      <div className={styles.mobileSticky} aria-label="Contact SRT"><FullStackLeadActions sticky /></div>
    </main>
  )
}
