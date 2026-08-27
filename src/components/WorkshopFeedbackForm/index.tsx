'use client'

import { ArrowRight, CheckCircle2, Download, LoaderCircle, Star } from 'lucide-react'
import React, { useState } from 'react'

import styles from './styles.module.css'

type FormState = {
  allowTestimonialUse: boolean
  consentToContact: boolean
  contentRating: number
  email: string
  fullName: string
  improvements: string
  joinInterest: string
  mobileNumber: string
  mostUseful: string
  overallRating: number
  preferredContact: string
  testimonial: string
  trainerRating: number
  usefulnessRating: number
}

const initialState: FormState = {
  allowTestimonialUse: false,
  consentToContact: false,
  contentRating: 0,
  email: '',
  fullName: '',
  improvements: '',
  joinInterest: '',
  mobileNumber: '',
  mostUseful: '',
  overallRating: 0,
  preferredContact: 'whatsapp',
  testimonial: '',
  trainerRating: 0,
  usefulnessRating: 0,
}

function RatingField({
  label,
  name,
  onChange,
  value,
}: {
  label: string
  name: keyof FormState
  onChange: (name: keyof FormState, value: number) => void
  value: number
}) {
  return (
    <fieldset className={styles.ratingField}>
      <legend>{label} *</legend>
      <div>
        {[1, 2, 3, 4, 5].map((number) => (
          <label key={number} title={`${number} out of 5`}>
            <input
              checked={value === number}
              name={String(name)}
              onChange={() => onChange(name, number)}
              required
              type="radio"
              value={number}
            />
            <span>
              <Star fill={number <= value ? 'currentColor' : 'none'} size={22} />
              <small>{number}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function WorkshopFeedbackForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = (name: keyof FormState, value: boolean | number | string) => {
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (
      !form.overallRating ||
      !form.contentRating ||
      !form.trainerRating ||
      !form.usefulnessRating
    ) {
      setError('Please select all four ratings before submitting.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/workshop-feedback', {
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const result = (await response.json()) as {
        feedbackId?: number | string
        message?: string
        success?: boolean
      }

      if (!response.ok) throw new Error(result.message || 'Unable to submit feedback.')
      if (!result.success || !result.feedbackId) {
        throw new Error('The server did not confirm that your feedback was saved. Please try again.')
      }
      setSubmitted(true)
      window.scrollTo({ behavior: 'smooth', top: 0 })
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to submit feedback. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className={styles.successCard}>
        <span><CheckCircle2 size={38} /></span>
        <small>Feedback received</small>
        <h2>Thank you for learning with SRT.</h2>
        <p>
          Your feedback has been saved. Our team will contact you using your preferred method if
          you requested information about the career program.
        </p>
        <div className={styles.successActions}>
          <a download href="/downloads/advanced-generative-ai-career-program.pdf">
            <Download size={17} /> Download course brochure
          </a>
          <a href="https://wa.me/918939069135?text=Hello%20SRT%2C%20I%20submitted%20the%20workshop%20feedback%20and%20want%20to%20know%20more%20about%20the%20Advanced%20Generative%20AI%20Career%20Program.">
            Talk to a counsellor <ArrowRight size={17} />
          </a>
        </div>
      </section>
    )
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.formHeading}>
        <span>Post-workshop feedback</span>
        <h2>Tell us about your experience</h2>
        <p>Use the same mobile number provided during workshop registration.</p>
      </div>

      <div className={styles.twoColumns}>
        <label className={styles.field}>
          <span>Full name *</span>
          <input
            autoComplete="name"
            maxLength={120}
            onChange={(event) => update('fullName', event.target.value)}
            required
            value={form.fullName}
          />
        </label>
        <label className={styles.field}>
          <span>Registered mobile number *</span>
          <input
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            onChange={(event) => update('mobileNumber', event.target.value)}
            placeholder="10-digit mobile number"
            required
            value={form.mobileNumber}
          />
        </label>
      </div>
      <label className={styles.field}>
        <span>Email address *</span>
        <input
          autoComplete="email"
          maxLength={180}
          onChange={(event) => update('email', event.target.value)}
          required
          type="email"
          value={form.email}
        />
      </label>

      <div className={styles.ratingGrid}>
        <RatingField
          label="Overall workshop experience"
          name="overallRating"
          onChange={update}
          value={form.overallRating}
        />
        <RatingField
          label="Quality of course content"
          name="contentRating"
          onChange={update}
          value={form.contentRating}
        />
        <RatingField
          label="Trainer clarity and delivery"
          name="trainerRating"
          onChange={update}
          value={form.trainerRating}
        />
        <RatingField
          label="Practical usefulness"
          name="usefulnessRating"
          onChange={update}
          value={form.usefulnessRating}
        />
      </div>

      <label className={styles.field}>
        <span>What was most useful?</span>
        <textarea
          maxLength={1500}
          onChange={(event) => update('mostUseful', event.target.value)}
          rows={3}
          value={form.mostUseful}
        />
      </label>
      <label className={styles.field}>
        <span>What can we improve?</span>
        <textarea
          maxLength={1500}
          onChange={(event) => update('improvements', event.target.value)}
          rows={3}
          value={form.improvements}
        />
      </label>
      <label className={styles.field}>
        <span>Your testimonial</span>
        <textarea
          maxLength={2000}
          onChange={(event) => update('testimonial', event.target.value)}
          placeholder="Share a short review that may help future learners."
          rows={4}
          value={form.testimonial}
        />
      </label>
      <label className={styles.checkLabel}>
        <input
          checked={form.allowTestimonialUse}
          onChange={(event) => update('allowTestimonialUse', event.target.checked)}
          type="checkbox"
        />
        <span />
        You may publish my testimonial with my first name. My contact details will remain private.
      </label>

      <div className={styles.interestBox}>
        <span className={styles.interestKicker}>Workshop participant offer</span>
        <h3>Would you like to join the Advanced Generative AI Career Program?</h3>
        <label className={styles.field}>
          <span>Your current interest *</span>
          <select
            onChange={(event) => update('joinInterest', event.target.value)}
            required
            value={form.joinInterest}
          >
            <option value="">Select an option</option>
            <option value="ready-to-join">Yes, I am ready to join</option>
            <option value="counsellor-call">I need a counsellor call</option>
            <option value="installment-plan">I am interested in an installment plan</option>
            <option value="considering">I am considering - follow up later</option>
            <option value="not-now">Not interested right now</option>
          </select>
        </label>
        <label className={styles.field}>
          <span>Preferred contact method *</span>
          <select
            onChange={(event) => update('preferredContact', event.target.value)}
            required
            value={form.preferredContact}
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="phone-call">Phone call</option>
            <option value="email">Email</option>
          </select>
        </label>
      </div>

      <label className={styles.checkLabel}>
        <input
          checked={form.consentToContact}
          onChange={(event) => update('consentToContact', event.target.checked)}
          required
          type="checkbox"
        />
        <span />
        I consent to SRT contacting me regarding this feedback and my selected course interest. *
      </label>

      {error ? <div className={styles.error}>{error}</div> : null}
      <button className={styles.submit} disabled={submitting} type="submit">
        {submitting ? <LoaderCircle className={styles.spinner} size={19} /> : null}
        {submitting ? 'Submitting feedback...' : 'Submit feedback'}
        {!submitting ? <ArrowRight size={18} /> : null}
      </button>
      <p className={styles.privacy}>Your responses are stored securely and visible only to authorised SRT administrators.</p>
    </form>
  )
}
