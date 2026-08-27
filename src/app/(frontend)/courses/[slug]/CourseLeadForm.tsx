'use client'

import { ArrowRight } from 'lucide-react'
import { FormEvent, useState } from 'react'
import styles from './standard-course.module.css'

export function CourseLeadForm({ course }: { course: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/homepage-enquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.success)
        throw new Error(result.error || 'We could not submit your enquiry. Please try again.')
      window.location.assign('/thank-you/course-enquiry/')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'We could not submit your enquiry. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.leadForm} id="course-enquiry" onSubmit={submit}>
      <span>COURSE ENQUIRY</span>
      <h2>Get {course} Course Details</h2>
      <p>Receive the latest fees, syllabus and upcoming batch schedule.</p>
      <label>
        <span>Name*</span>
        <input autoComplete="name" maxLength={80} name="name" placeholder="Your name" required />
      </label>
      <label>
        <span>Mobile Number*</span>
        <input
          autoComplete="tel"
          inputMode="tel"
          maxLength={18}
          name="mobile"
          pattern="[0-9+() -]{8,18}"
          placeholder="Your mobile number"
          required
        />
      </label>
      <input name="interest" type="hidden" value="Course Training" />
      <label>
        <span>Course</span>
        <input name="course" readOnly value={course} />
      </label>
      <input name="source" type="hidden" value="Course detail page" />
      <input
        aria-hidden="true"
        autoComplete="off"
        className={styles.trap}
        name="website"
        tabIndex={-1}
      />
      <button disabled={loading} type="submit">
        {loading ? (
          'Submitting…'
        ) : (
          <>
            Get Fees & Batch Details <ArrowRight size={18} />
          </>
        )}
      </button>
      {error && (
        <p className={styles.formError} role="alert">
          {error}
        </p>
      )}
      <small>By submitting, you agree to be contacted about this course.</small>
    </form>
  )
}
