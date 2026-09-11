'use client'

import { FormEvent, useState } from 'react'
import { MapPin, MessageCircle, Phone } from 'lucide-react'

import styles from './page.module.css'

const phone = '+918939069135'
const displayPhone = '+91 89390 69135'
const whatsapp = `https://wa.me/918939069135?text=${encodeURIComponent('Hi SRT, I would like details about the Data Analytics Course in Chennai.')}`
const directions = 'https://www.google.com/maps/search/?api=1&query=Success+Root+Technologies+West+Mambalam+Chennai+600033'

function track(event: string) {
  const win = window as Window & { dataLayer?: Record<string, unknown>[] }
  win.dataLayer = win.dataLayer || []
  win.dataLayer.push({ event })
}

function focusForm() {
  const form = document.getElementById('data-analytics-lp-enquiry')
  form?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  window.setTimeout(() => form?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true }), 550)
}

export function DataAnalyticsLeadActions({ compact = false, directions: showDirections = false, sticky = false }: { compact?: boolean; directions?: boolean; sticky?: boolean }) {
  if (sticky) return <><a href={`tel:${phone}`} onClick={() => track('data_analytics_phone_click')}><Phone size={17} />Call {displayPhone}</a><a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => track('data_analytics_whatsapp_click')}><MessageCircle size={17} />WhatsApp</a><button type="button" onClick={focusForm}>Enquire</button></>
  return <div className={`${styles.actions} ${compact ? styles.actionsCompact : ''}`}>
    {!compact && !showDirections && <button type="button" onClick={focusForm}>Get Fees & Next Batch Details</button>}
    {showDirections && <a href={directions} target="_blank" rel="noreferrer" onClick={() => track('data_analytics_directions_click')}><MapPin size={17} />Get Directions</a>}
    <a href={`tel:${phone}`} onClick={() => track('data_analytics_phone_click')}><Phone size={17} />Call {displayPhone}</a>
    <a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => track('data_analytics_whatsapp_click')}><MessageCircle size={17} />{compact ? 'WhatsApp' : 'WhatsApp Us'}</a>
  </div>
}

export function DataAnalyticsHeroAction() {
  return <button className={styles.heroCta} type="button" onClick={focusForm}>Book Free Demo / Get Course Details</button>
}

export function DataAnalyticsLeadForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [updateToken, setUpdateToken] = useState('')

  function validMobile(value: FormDataEntryValue | null) {
    const digits = String(value || '').replace(/\D/g, '')
    const local = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits
    return /^[6-9]\d{9}$/.test(local)
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(event.currentTarget)
    if (!String(formData.get('name') || '').trim() || !validMobile(formData.get('mobile'))) {
      setError('Enter your name and a valid Indian mobile number.')
      setLoading(false)
      return
    }
    const response = await fetch('/api/full-stack-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
    }).catch(() => null)

    const result = response ? await response.json().catch(() => ({})) : {}
    if (response?.ok && typeof result.updateToken === 'string') {
      track('data_analytics_form_submit')
      setUpdateToken(result.updateToken)
      setLoading(false)
      return
    }

    setError(result.error || 'We could not submit your enquiry. Please call or WhatsApp SRT.')
    setLoading(false)
  }

  async function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!updateToken) return
    setLoading(true)
    setError('')
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/full-stack-enquiry', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...Object.fromEntries(formData), updateToken }),
    }).catch(() => null)
    if (response?.ok) {
      window.location.assign('/thank-you/data-analytics-enquiry/')
      return
    }
    const result = response ? await response.json().catch(() => ({})) : {}
    setError(result.error || 'We could not update your details. Your enquiry was already received.')
    setLoading(false)
  }

  if (updateToken) return <form className={styles.form} id="data-analytics-lp-enquiry" onSubmit={submitDetails}>
    <span className={styles.formEyebrow}>OPTIONAL DETAILS</span>
    <h2>Thanks! Help us assist you better.</h2>
    <p>Your enquiry is received. These details are optional.</p>
    <label><span className={styles.fieldLabel}>Email <small>Optional</small></span><input name="email" autoComplete="email" type="email" maxLength={120} placeholder="Your email address" /></label>
    <div className={styles.formRow}>
      <label><span className={styles.fieldLabel}>Current Status <small>Optional</small></span><select name="status" defaultValue=""><option value="">Select</option><option>Student</option><option>Fresher</option><option>Working Professional</option><option>Career Switcher</option><option>Other</option></select></label>
      <label><span className={styles.fieldLabel}>Training Mode <small>Optional</small></span><select name="mode" defaultValue=""><option value="">Select</option><option>Classroom</option><option>Online</option></select></label>
    </div>
    <button className={styles.submit} disabled={loading} type="submit">{loading ? 'Updating…' : 'Update Details'}</button>
    <button className={styles.skip} type="button" onClick={() => window.location.assign('/thank-you/data-analytics-enquiry/')}>No thanks, continue</button>
    {error && <p className={styles.error} role="alert">{error}</p>}
  </form>

  return <form className={styles.form} id="data-analytics-lp-enquiry" onSubmit={submitContact}>
    <span className={styles.formEyebrow}>GET COURSE DETAILS</span>
    <h2>Get Course Fees &amp; Next Batch Details</h2>
    <div className={styles.formTrust}>Free Demo Available • Online &amp; Classroom</div>
    <p>Share your name and mobile number to get current fees and batch details.</p>
    <label><span className={styles.fieldLabel}>Name <em aria-hidden="true">*</em></span><input name="name" autoComplete="name" required maxLength={80} placeholder="Your name" /></label>
    <label><span className={styles.fieldLabel}>Mobile Number <em aria-hidden="true">*</em></span><input name="mobile" autoComplete="tel" required inputMode="tel" pattern="[0-9+() -]{8,18}" placeholder="Your mobile number" /></label>
    <input name="course" type="hidden" value="Data Analytics" />
    <input className={styles.trap} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className={styles.submit} disabled={loading} type="submit">{loading ? 'Sending…' : 'Get Fees & Batch Details'}</button>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <small className={styles.consent}>By submitting, you agree to be contacted about this course.</small>
  </form>
}
