'use client'

import { FormEvent, useState } from 'react'
import styles from './full-stack.module.css'
import { CourseTrustProof } from './CourseTrustProof'

const phone = '+918939069135'
const whatsapp = `https://wa.me/918939069135?text=${encodeURIComponent('Hi SRT, I want Data Analytics course fees, syllabus and batch details.')}`
const directions = 'https://www.google.com/maps/search/?api=1&query=Success+Root+Technologies+West+Mambalam+Chennai+600033'
const track = (event: string) => { const win = window as Window & { dataLayer?: Record<string, unknown>[] }; win.dataLayer = win.dataLayer || []; win.dataLayer.push({ event }) }
const scrollForm = () => { const form = document.getElementById('data-analytics-enquiry'); form?.scrollIntoView({ behavior: 'smooth', block: 'center' }); window.setTimeout(() => form?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true }), 550) }

const modules = [
  ['Advanced Excel', 'Advanced formulas, lookup functions, Pivot Tables, data cleaning, charts and business reporting'],
  ['SQL', 'SQL fundamentals, queries, joins, grouping, aggregation, relational data and business-data querying'],
  ['Power BI', 'Data preparation, modeling, DAX, Power Query, interactive dashboards and BI reporting'],
  ['Python for Data Analytics', 'Python fundamentals, Pandas, data cleaning, transformation and analysis'],
  ['AI-Assisted Analytics', 'Responsible analysis, formula and query assistance, debugging, interpretation and reporting productivity'],
  ['Capstone Project', 'A practical, portfolio-oriented analytics project using skills learned throughout the program'],
]
const faqs = [
  ['What is the duration of the Data Analytics course?', 'The structured program duration is 16 weeks. Contact us for the current batch calendar.'],
  ['Is this course suitable for beginners?', 'Yes. It is beginner friendly and requires no previous professional Data Analytics experience.'],
  ['What tools are covered?', 'Advanced Excel, SQL, Power BI, Power Query, DAX, Python, Pandas and responsible AI-assisted analytics tools.'],
  ['Does the course cover Advanced Excel?', 'Yes. It includes formulas, lookups, Pivot Tables, cleaning, charts and reporting.'],
  ['Is Power BI included?', 'Yes. You will learn preparation, modeling, Power Query, DAX and dashboards.'],
  ['Will I learn SQL?', 'Yes. SQL fundamentals, queries, joins, grouping and business-data analysis are included.'],
  ['Is Python included?', 'Yes. Python fundamentals and Pandas-based cleaning, transformation and analysis are included.'],
  ['Does SRT provide placement assistance?', 'Yes. SRT provides resume, portfolio, profile and interview guidance, mock interviews and job opportunity updates.'],
  ['Are classroom classes available in Chennai?', 'Yes. Classroom training is available in West Mambalam, Chennai, with an online option.'],
  ['Are weekend batches available?', 'Yes. Weekday and weekend options are available subject to the current schedule.'],
  ['What are the course fees?', 'Request the latest fee, available offers and batch schedule from our course advisor.'],
  ['How can I get the syllabus?', 'Submit the short form, call SRT or send us a WhatsApp message.'],
]

function LeadForm() {
  const [loading, setLoading] = useState(false); const [error, setError] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(''); const response = await fetch('/api/full-stack-enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) }).catch(() => null); if (response?.ok) { track('data_analytics_form_submit'); window.location.assign('/thank-you/data-analytics-enquiry/'); return } const result = response ? await response.json().catch(() => ({})) : {}; setError(result.error || 'We could not submit your enquiry. Please call or WhatsApp us.'); setLoading(false) }
  return <form className={styles.form} id="data-analytics-enquiry" onSubmit={submit}><h2>Get Data Analytics Course Details</h2><p>Receive the latest fees, syllabus and upcoming batch schedule.</p><input name="name" placeholder="Name*" required maxLength={80}/><input name="mobile" placeholder="Mobile Number*" required inputMode="tel" pattern="[0-9+() -]{8,18}"/><input aria-label="Course" name="course" readOnly value="Data Analytics"/><input className={styles.trap} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/><button disabled={loading}>{loading ? 'Sending…' : 'Get Fees & Batch Details'}</button>{error && <p className={styles.error}>{error}</p>}<small>By submitting, you agree to be contacted about this course.</small></form>
}
function Actions({ primary = true }: { primary?: boolean }) { return <div className={styles.actions}>{primary && <button className={styles.primary} onClick={scrollForm}>Get Fees & Syllabus</button>}<a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => track('data_analytics_whatsapp_click')}>WhatsApp Us</a><a href={`tel:${phone}`} onClick={() => track('data_analytics_phone_click')}>Call Now</a></div> }
function InlineCTA() { return <section className={styles.inlineCtaSection}><div className={`container ${styles.inlineCta}`}><div><span>COURSE ADMISSIONS</span><h2>Ready to Know the Fees & Next Batch?</h2><p>Talk to our course advisor for the latest fee, syllabus and available schedule.</p></div><div className={styles.inlineCtaActions}><button onClick={scrollForm}>Get Fees & Batch Details</button><a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => track('data_analytics_whatsapp_click')}>WhatsApp</a><a href={`tel:${phone}`} onClick={() => track('data_analytics_phone_click')}>Call Now</a></div></div></section> }

export function DataAnalyticsLanding() {
  const schema = { '@context': 'https://schema.org', '@type': 'Course', name: 'Data Analytics Course in Chennai', description: 'Advanced Excel, SQL, Power BI, Python and AI-assisted analytics training.', provider: { '@type': 'EducationalOrganization', name: 'Success Root Technologies' } }
  return <main className={styles.page}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>
    <section className={styles.hero}><div className={`container ${styles.heroGrid}`}><div><span className={styles.kicker}>DATA ANALYTICS COURSE IN CHENNAI</span><h1>Data Analytics Course in Chennai</h1><p className={styles.lead}>Learn Advanced Excel, SQL, Power BI, Python & AI-Assisted Analytics through practical, project-based training.</p><p className={styles.support}>Beginner-Friendly | Practical Training | Classroom & Online Options | Weekday & Weekend Batches</p><div className={styles.checks}>{['16 Weeks','West Mambalam, Chennai','Practical Projects','Placement Assistance'].map(x=><span key={x}>✓ {x}</span>)}</div><Actions/></div><LeadForm/></div></section>
    <section><div className="container"><h2>Practical Data Analytics Training at SRT</h2><p>Build core analytics skills through instructor-led learning, exercises and portfolio-oriented projects.</p><div className={styles.facts}>{[['Duration','16 Weeks'],['Level','Beginner Friendly'],['Training','Practical + Project Based'],['Mode','Classroom / Online'],['Location','West Mambalam, Chennai'],['Career Support','Placement Assistance'],['Batch','Weekday & Weekend']].map(([a,b])=><div key={a}><strong>{a}</strong><span>{b}</span></div>)}</div></div></section>
    <section className={styles.alt}><div className="container"><h2>What You&apos;ll Learn in Data Analytics</h2><div className={styles.moduleGrid}>{modules.map(([a,b])=><article key={a}><h3>{a}</h3><p>{b}</p></article>)}</div></div></section>
    <section><div className="container"><h2>Tools You&apos;ll Work With</h2><div className={styles.checkGrid}>{['Advanced Excel','SQL','Power BI','Power Query','DAX','Python','Pandas','AI-Assisted Analytics Tools'].map(x=><span key={x}>✓ {x}</span>)}</div></div></section>
    <InlineCTA/>
    <section className={styles.alt}><div className={`container ${styles.twoCol}`}><div><h2>Learn Through Practical Projects</h2><ul>{['Sales Dashboard','Business Performance Analysis','Excel Reporting Project','SQL Data Analysis','Power BI Dashboard','Python/Pandas Data Analysis','Final Analytics Capstone'].map(x=><li key={x}>✓ {x}</li>)}</ul></div><div><h2>Who Can Join?</h2><ul>{['College Students','Fresh Graduates','Job Seekers','Working Professionals','Career Switchers','Beginners interested in Data Analytics'].map(x=><li key={x}>✓ {x}</li>)}</ul><strong>No previous professional Data Analytics experience is required.</strong></div></div></section>
    <section><div className={`container ${styles.twoCol}`}><div><h2>Career & Placement Assistance</h2><ul>{['Resume Preparation','LinkedIn/Profile Guidance','Portfolio Guidance','Interview Preparation','Mock Interviews','Technical Interview Preparation','Job Opportunity Updates','Placement Assistance'].map(x=><li key={x}>✓ {x}</li>)}</ul></div><div><h2>Potential Career Paths</h2><ul>{['Data Analyst','Junior Data Analyst','Power BI Developer','Business Intelligence Analyst','Reporting Analyst','MIS / Data Reporting Executive','Junior Business Analyst'].map(x=><li key={x}>• {x}</li>)}</ul><p>These are potential career paths, not guaranteed job outcomes.</p></div></div></section>
    <InlineCTA/>
    <section className={styles.alt}><div className="container"><h2>Why Learn Data Analytics at SRT?</h2><div className={styles.checkGrid}>{['Practical Training','Project-Based Learning','Beginner-Friendly Program','Instructor-Led Sessions','Interview Preparation','Placement Assistance','Weekday & Weekend Batches','Classroom Training in West Mambalam','Online Learning Option'].map(x=><span key={x}>✓ {x}</span>)}</div></div></section>
    <CourseTrustProof course="data-analytics" />
    <section><div className={`container ${styles.fee}`}><div><span className={styles.feeKicker}>FLEXIBLE COURSE PAYMENT</span><h2>Affordable Data Analytics Course Fees</h2><p>Speak with our course advisor for the current fee, available batch offers and payment details.</p><div className={styles.feeBenefits}><span>✓ Affordable Course Fees</span><span>✓ Installment Options Available</span><span>✓ Ask About Current Batch Offers</span></div></div><button className={styles.primary} onClick={scrollForm}>Get Current Fees & Offers</button></div></section>
    <section className={styles.location}><div className="container"><h2>Data Analytics Training in West Mambalam, Chennai</h2><p><strong>Success Root Technologies</strong><br/>West Mambalam, Chennai, Tamil Nadu – 600033<br/><a href={`tel:${phone}`}>+91 89390 69135</a></p><div className={styles.actions}><a href={directions} target="_blank" rel="noreferrer" onClick={()=>track('data_analytics_directions_click')}>Get Directions</a><a href={`tel:${phone}`} onClick={()=>track('data_analytics_phone_click')}>Call Now</a><a href={whatsapp} onClick={()=>track('data_analytics_whatsapp_click')}>WhatsApp</a></div></div></section>
    <section><div className="container"><h2>Data Analytics Course FAQs</h2><div className={styles.faq}>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
    <section className={styles.final}><div className="container"><h2>Start Your Data Analytics Journey</h2><p>Build practical skills in Excel, SQL, Power BI, Python and modern analytics workflows.</p><Actions/><p>Success Root Technologies · West Mambalam, Chennai</p></div></section>
    <div className={styles.sticky}><a href={`tel:${phone}`} onClick={()=>track('data_analytics_phone_click')}>Call</a><a href={whatsapp} onClick={()=>track('data_analytics_whatsapp_click')}>WhatsApp</a><button onClick={scrollForm}>Enquire</button></div>
  </main>
}
