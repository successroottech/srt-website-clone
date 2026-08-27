'use client'

import { FormEvent, useState } from 'react'
import styles from './full-stack.module.css'
import { CourseTrustProof } from './CourseTrustProof'

const phone = '+918939069135'
const whatsapp = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent('Hi SRT, I would like the Full Stack course fees, syllabus and upcoming batch details.')}`

function track(event: string) {
  const win = window as Window & { dataLayer?: Record<string, unknown>[] }
  win.dataLayer = win.dataLayer || []
  win.dataLayer.push({ event })
}

function scrollToForm() {
  const form = document.getElementById('full-stack-enquiry')
  if (!form) return
  form.scrollIntoView({ behavior: 'smooth', block: 'center' })
  window.setTimeout(() => {
    form.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true })
  }, 550)
}

const modules = [
  ['Frontend Development', 'HTML5, CSS3, JavaScript ES6+, React JS, Responsive Web Development'],
  ['Backend Development', 'Node.js, Express.js, REST APIs, JSON, API Integration'],
  ['Database', 'MongoDB, Database Fundamentals'],
  ['Development Tools', 'Git, GitHub, Postman'],
  ['Projects', 'Weekly practical assignments, Mini projects, Full Stack capstone project, Application deployment'],
  ['Additional Learning', 'Python fundamentals'],
]

const faqs = [
  ['Is this Full Stack course suitable for beginners?', 'Yes. The course starts with web fundamentals, and no prior professional coding experience is required.'],
  ['What technologies are covered?', 'The core curriculum covers HTML, CSS, JavaScript, React JS, Node.js, Express.js, MongoDB, REST APIs, GitHub and Postman.'],
  ['Is classroom training available in Chennai?', 'Yes. Instructor-led classroom training is available at West Mambalam, Chennai. Online training is also available.'],
  ['Where is Success Root Technologies located?', 'Success Root Technologies is in West Mambalam, Chennai, Tamil Nadu – 600033.'],
  ['Do you provide placement assistance?', 'Yes. Career support includes resume and GitHub guidance, interview preparation, mock interviews and job opportunity updates.'],
  ['Are weekday and weekend batches available?', 'Yes. Contact our course advisor for the latest weekday and weekend schedule.'],
  ['What is the Full Stack course duration?', 'Duration can vary by batch plan. Request the latest syllabus and schedule for the current duration.'],
  ['Will I work on practical projects?', 'Yes. Training includes assignments, mini projects and a Full Stack capstone project.'],
  ['How can I get the course fees and syllabus?', 'Submit the short enquiry form, call us or message SRT on WhatsApp for current details.'],
]

function LeadForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const form = event.currentTarget
    const response = await fetch('/api/full-stack-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => null)
    if (response?.ok) {
      track('full_stack_form_submit')
      window.location.assign('/thank-you/full-stack-enquiry/')
      return
    }
    const result = response ? await response.json().catch(() => ({})) : {}
    setError(result.error || 'We could not submit your enquiry. Please call or WhatsApp us.')
    setLoading(false)
  }

  return (
    <form className={styles.form} id="full-stack-enquiry" onSubmit={submit}>
      <h2>Get Full Stack Course Details</h2>
      <p>Receive the latest fees, syllabus and upcoming batch schedule.</p>
      <input name="name" placeholder="Name*" required maxLength={80} />
      <input name="mobile" placeholder="Mobile Number*" required inputMode="tel" pattern="[0-9+() -]{8,18}" />
      <input aria-label="Course" name="course" readOnly value="Full Stack Development" />
      <input className={styles.trap} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button disabled={loading} type="submit">{loading ? 'Sending…' : 'Get Fees & Batch Details'}</button>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <small>By submitting, you agree to be contacted about this course.</small>
    </form>
  )
}

function ActionLinks({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? styles.actionsCompact : styles.actions}>
    {!compact && <button className={styles.primary} onClick={scrollToForm} type="button">Get Course Details</button>}
    <a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => track('full_stack_whatsapp_click')}>WhatsApp Us</a>
    <a href={`tel:${phone}`} onClick={() => track('full_stack_phone_click')}>Call Now</a>
  </div>
}

function InlineCTA() {
  return <section className={styles.inlineCtaSection}><div className={`container ${styles.inlineCta}`}>
    <div><span>COURSE ADMISSIONS</span><h2>Ready to Know the Fees & Next Batch?</h2><p>Talk to our course advisor for the latest fee, syllabus and available schedule.</p></div>
    <div className={styles.inlineCtaActions}><button onClick={scrollToForm} type="button">Get Fees & Batch Details</button><a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => track('full_stack_whatsapp_click')}>WhatsApp</a><a href={`tel:${phone}`} onClick={() => track('full_stack_phone_click')}>Call Now</a></div>
  </div></section>
}

export function FullStackLanding() {
  const schema = { '@context': 'https://schema.org', '@type': 'Course', name: 'Full Stack Developer Course in Chennai', alternateName: 'MERN Stack Developer Course in Chennai', description: 'Practical MERN Full Stack training covering React JS, Node.js, Express.js and MongoDB in Chennai.', teaches: ['React JS', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git and GitHub'], provider: { '@type': 'EducationalOrganization', name: 'Success Root Technologies' }, hasCourseInstance: { '@type': 'CourseInstance', courseMode: ['onsite', 'online'], location: { '@type': 'Place', name: 'Success Root Technologies, West Mambalam, Chennai' } } }
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className={styles.hero}><div className={`container ${styles.heroGrid}`}>
      <div><span className={styles.kicker}>FULL STACK DEVELOPER COURSE IN CHENNAI</span><h1>Full Stack Developer Course in Chennai</h1><div className={styles.stackBadge}>MERN STACK TRAINING</div><p className={styles.lead}>Learn React JS, Node.js, Express.js & MongoDB with hands-on training and live projects.</p><p className={styles.support}>Classroom Training in West Mambalam, Chennai | Instructor-Led | Weekday & Weekend Batches</p>
      <div className={styles.checks}>{['Beginner Friendly','Practical Training','Live Projects','Placement Assistance','Weekday & Weekend Batches','West Mambalam, Chennai'].map(x => <span key={x}>✓ {x}</span>)}</div><ActionLinks /></div>
      <LeadForm />
    </div></section>

    <section><div className="container"><h2>Full Stack Development Training at Success Root Technologies</h2><p>Designed for students, freshers and career switchers who want practical, career-focused Full Stack development skills.</p><div className={styles.facts}>{[['Core Stack','React, Node.js, Express.js & MongoDB'],['Training Mode','Classroom & Online'],['Location','West Mambalam, Chennai'],['Batch Schedule','Weekday & Weekend'],['Learning','Practical Projects'],['Career Support','Placement Assistance']].map(([a,b]) => <div key={a}><strong>{a}</strong><span>{b}</span></div>)}</div></div></section>

    <section className={styles.alt}><div className="container"><h2>What You Will Learn</h2><p>A practical MERN Stack course curriculum built around modern web application development.</p><div className={styles.moduleGrid}>{modules.map(([title, content]) => <article key={title}><h3>{title}</h3><p>{content}</p></article>)}</div></div></section>

    <InlineCTA />

    <section><div className={`container ${styles.twoCol}`}><div><h2>Who Should Join?</h2><ul>{['College Students','Fresh Graduates','Job Seekers','Career Switchers','Beginners interested in software development'].map(x => <li key={x}>✓ {x}</li>)}</ul><strong>No prior professional coding experience required.</strong></div><div><h2>Career & Placement Assistance</h2><ul>{['Resume Preparation','GitHub Profile Guidance','Interview Preparation','Mock Interviews','Technical Interview Questions','Job Opportunity Updates','Placement Assistance'].map(x => <li key={x}>✓ {x}</li>)}</ul></div></div></section>

    <section className={styles.alt}><div className="container"><h2>Why Learn Full Stack Development at SRT?</h2><div className={styles.checkGrid}>{['Hands-On Training','Real-Time Projects','Small Batch Learning','Instructor-Led Sessions','Doubt-Clearing Support','Interview Preparation','Placement Assistance','Classroom Training in West Mambalam','Weekday & Weekend Options'].map(x => <span key={x}>✓ {x}</span>)}</div></div></section>

    <InlineCTA />

    <CourseTrustProof course="full-stack" />

    <section><div className={`container ${styles.fee}`}><div><span className={styles.feeKicker}>FLEXIBLE COURSE PAYMENT</span><h2>Affordable Full Stack Course Fees</h2><p>Speak with our course advisor for the current fee, available batch offers and payment details.</p><div className={styles.feeBenefits}><span>✓ Affordable Course Fees</span><span>✓ Installment Options Available</span><span>✓ Ask About Current Batch Offers</span></div></div><button className={styles.primary} onClick={scrollToForm} type="button">Get Current Fees & Offers</button></div></section>

    <section className={styles.location}><div className="container"><h2>Full Stack Training in West Mambalam, Chennai</h2><p><strong>Success Root Technologies</strong><br />West Mambalam<br />Chennai, Tamil Nadu – 600033</p><div className={styles.actions}><a href="https://www.google.com/maps/search/?api=1&query=Success+Root+Technologies+West+Mambalam+Chennai" target="_blank" rel="noreferrer" onClick={() => track('full_stack_directions_click')}>Get Directions</a><a href={`tel:${phone}`} onClick={() => track('full_stack_phone_click')}>Call Now</a><a href={whatsapp} onClick={() => track('full_stack_whatsapp_click')}>WhatsApp</a></div></div></section>

    <section><div className="container"><h2>Full Stack Course FAQs</h2><div className={styles.faq}>{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
    <section className={styles.final}><div className="container"><h2>Ready to Start Your Full Stack Developer Journey?</h2><p>Get the latest syllabus, fees and upcoming batch details.</p><ActionLinks /><p>Success Root Technologies · West Mambalam, Chennai</p></div></section>
    <div className={styles.sticky}><a href={`tel:${phone}`} onClick={() => track('full_stack_phone_click')}>Call</a><a href={whatsapp} onClick={() => track('full_stack_whatsapp_click')}>WhatsApp</a><button onClick={scrollToForm} type="button">Enquire</button></div>
  </main>
}
