'use client'

import { ArrowRight, X } from 'lucide-react'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'

const courses = [
  'Full Stack Development',
  'Data Analytics',
  'Python',
  'Java',
  'Power BI',
  'AI & Machine Learning',
  'Cyber Security',
  'Digital Marketing',
  'Other',
]
const jobRoles = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Software Developer',
  'Data Analyst',
  'Power BI Developer',
  'Python Developer',
  'Java Developer',
  'QA / Software Tester',
  'Cloud / DevOps',
  'IT Support',
  'Other IT Role',
  'Non-IT / Other',
]
const defaultGateSelector = [
  'main a[href^="/courses/"]',
  'main a[href^="/it-courses-chennai"]',
  'main a[href^="/contact-us"]',
  'main [data-course-guidance]',
  'main [data-lead-gate]',
].join(', ')
const protectedLandingPaths = new Set([
  '/courses/full-stack-developer-course-chennai/',
  '/courses/data-analytics-course-chennai/',
])

type HomepageLeadGateProps = {
  courseOnly?: boolean
  selector?: string
  submitLabel?: string
  title?: string
}

function suggestedCourse(element: Element) {
  const explicitCourse = element.getAttribute('data-course')
  if (explicitCourse) return explicitCourse
  const text =
    element.closest('article')?.querySelector('h3')?.textContent || element.textContent || ''
  return (
    courses.find((course) =>
      text
        .toLowerCase()
        .includes(
          course.replace(' Development', '').replace(' & Machine Learning', '').toLowerCase(),
        ),
    ) || ''
  )
}

export function HomepageLeadGate({
  courseOnly = false,
  selector = defaultGateSelector,
  submitLabel = 'Get Details',
  title = "Tell us what you're looking for",
}: HomepageLeadGateProps = {}) {
  const [open, setOpen] = useState(false)
  const [destination, setDestination] = useState('')
  const [course, setCourse] = useState('')
  const [interest, setInterest] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const triggerRef = useRef<HTMLElement | null>(null)

  const closeDialog = useCallback(() => {
    setOpen(false)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }, [])

  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (window.localStorage.getItem('srt-homepage-lead-submitted') === '1') return
      if (protectedLandingPaths.has(window.location.pathname)) return
      const element = (event.target as Element | null)?.closest(selector)
      if (
        !element ||
        element.closest('.homepage-lead-modal, header, nav, footer') ||
        element.hasAttribute('download') ||
        element.getAttribute('target') === '_blank'
      )
        return
      const rawHref = element.getAttribute('href') || ''
      if (
        rawHref.startsWith('#') ||
        /^(?:tel:|mailto:|sms:|javascript:)/i.test(rawHref) ||
        rawHref.includes('wa.me/') ||
        rawHref.includes('google.com/maps') ||
        rawHref.startsWith('/admin') ||
        rawHref.startsWith('/privacy-policy') ||
        rawHref.startsWith('/terms-and-conditions')
      )
        return
      const href = element instanceof HTMLAnchorElement ? element.href : ''
      event.preventDefault()
      event.stopPropagation()
      triggerRef.current = element as HTMLElement
      setDestination(href)
      const suggestion = suggestedCourse(element)
      setCourse(suggestion)
      setInterest(courseOnly || suggestion ? 'Course Training' : '')
      setError('')
      setOpen(true)
    }
    document.addEventListener('click', click, true)
    return () => document.removeEventListener('click', click, true)
  }, [courseOnly, selector])

  useEffect(() => {
    if (!open) return
    const key = (event: KeyboardEvent) => event.key === 'Escape' && closeDialog()
    document.addEventListener('keydown', key)
    document.body.classList.add('lead-modal-open')
    return () => {
      document.removeEventListener('keydown', key)
      document.body.classList.remove('lead-modal-open')
    }
  }, [closeDialog, open])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/homepage-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.success)
        throw new Error(result.error || 'We could not submit your enquiry. Please try again.')
      window.localStorage.setItem('srt-homepage-lead-submitted', '1')
      setOpen(false)
      if (destination) window.location.assign(destination)
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

  if (!open) return null
  return (
    <div
      className="homepage-lead-modal"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && closeDialog()}
    >
      <div
        aria-labelledby="homepage-lead-title"
        aria-modal="true"
        className="homepage-lead-dialog"
        role="dialog"
      >
        <button
          aria-label="Close enquiry form"
          className="homepage-lead-close"
          onClick={closeDialog}
          type="button"
        >
          <X size={21} />
        </button>
        <span className="homepage-lead-kicker">SUCCESS ROOT TECHNOLOGIES</span>
        <h2 id="homepage-lead-title">{title}</h2>
        <p>
          {courseOnly
            ? 'Share your details to receive course fees, syllabus and upcoming batch guidance.'
            : 'Share your details to receive the right course or placement guidance.'}
        </p>
        <form onSubmit={submit}>
          <label>
            <span>Name*</span>
            <input autoFocus maxLength={80} name="name" placeholder="Your name" required />
          </label>
          <label>
            <span>Mobile Number*</span>
            <input
              inputMode="tel"
              maxLength={18}
              name="mobile"
              pattern="[0-9+() -]{8,18}"
              placeholder="Your mobile number"
              required
            />
          </label>
          {courseOnly ? (
            <input name="interest" type="hidden" value="Course Training" />
          ) : (
            <label>
              <span>I am looking for*</span>
              <select
                name="interest"
                onChange={(event) => {
                  setInterest(event.target.value)
                  setCourse('')
                }}
                required
                value={interest}
              >
                <option disabled value="">
                  Select an option
                </option>
                <option value="Course Training">Course Training</option>
                <option value="Job / Placement Support">Job / Placement Support</option>
              </select>
            </label>
          )}
          {(courseOnly || interest) && (
            <label>
              <span>
                {courseOnly
                  ? 'Course Interested*'
                  : interest === 'Course Training'
                    ? 'Course / Skill*'
                    : 'Preferred IT Role*'}
              </span>
              <select
                name="course"
                onChange={(event) => setCourse(event.target.value)}
                required
                value={course}
              >
                <option disabled value="">
                  {courseOnly || interest === 'Course Training'
                    ? 'Select a course'
                    : 'Select an IT role'}
                </option>
                {(courseOnly || interest === 'Course Training'
                  ? [...courses, ...(course && !courses.includes(course) ? [course] : [])]
                  : jobRoles
                ).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          )}
          <input
            aria-hidden="true"
            autoComplete="off"
            className="homepage-lead-trap"
            name="website"
            tabIndex={-1}
          />
          <button className="homepage-lead-submit" disabled={loading} type="submit">
            {loading ? (
              'Submitting…'
            ) : (
              <>
                {submitLabel} <ArrowRight size={18} />
              </>
            )}
          </button>
          {error && (
            <p className="homepage-lead-error" role="alert">
              {error}
            </p>
          )}
          <small>By submitting, you agree to be contacted by Success Root Technologies.</small>
        </form>
      </div>
    </div>
  )
}
