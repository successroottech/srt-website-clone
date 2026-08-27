'use client'

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Mail,
  MessageCircle,
  Phone,
  QrCode,
  ShieldCheck,
  Smartphone,
  UploadCloud,
} from 'lucide-react'
import Image from 'next/image'
import React, { FormEvent, useEffect, useState } from 'react'

const statusOptions = [
  ['student', 'Student'],
  ['fresher', 'Fresher'],
  ['working-professional', 'Working professional'],
  ['career-break', 'Career break'],
  ['business-owner', 'Business owner'],
  ['trainer', 'Trainer'],
]

const discoverySourceOptions = [
  ['google-search', 'Google Search'],
  ['google-maps', 'Google Maps / Reviews'],
  ['instagram', 'Instagram'],
  ['facebook', 'Facebook'],
  ['linkedin', 'LinkedIn'],
  ['youtube', 'YouTube'],
  ['whatsapp', 'WhatsApp'],
  ['friend-referral', 'Friend / Referral'],
  ['existing-student', 'Existing student'],
  ['other', 'Other'],
]

const workshopUpiPaymentURL =
  'upi://pay?pa=8680961239%40ptyes&pn=Success%20Root%20Technologies&am=99.00&cu=INR&tn=Generative%20AI%20Workshop'

const initialForm = {
  city: '',
  companyWebsite: '',
  consentToContact: false,
  currentStatus: '',
  discoverySource: '',
  email: '',
  fullName: '',
  mobileNumber: '',
  sourceDetails: '',
  whatsappNumber: '',
}

export function WorkshopEnrollmentForm() {
  const [form, setForm] = useState(initialForm)
  const [sameWhatsApp, setSameWhatsApp] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [registrationID, setRegistrationID] = useState('')
  const [uploadToken, setUploadToken] = useState('')
  const [paymentReference, setPaymentReference] = useState('')
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [proofSubmitting, setProofSubmitting] = useState(false)
  const [proofError, setProofError] = useState('')
  const [proofSubmitted, setProofSubmitted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const savedRegistration = params.get('registration') || ''
    const savedToken = params.get('token') || ''

    if (/^SRT-AI-\d+$/.test(savedRegistration) && /^[a-f0-9]{64}$/i.test(savedToken)) {
      setRegistrationID(savedRegistration)
      setUploadToken(savedToken)
    }
  }, [])

  useEffect(() => {
    if (!registrationID) return

    const animationFrame = window.requestAnimationFrame(() => {
      document.getElementById('workshop-enrollment-panel')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [registrationID, proofSubmitted])

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'mobileNumber' && sameWhatsApp) next.whatsappNumber = String(value)
      return next
    })
  }

  const toggleSameWhatsApp = (checked: boolean) => {
    setSameWhatsApp(checked)
    if (checked) update('whatsappNumber', form.mobileNumber)
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/workshop-enroll/', {
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const result = (await response.json()) as {
        message?: string
        registrationId?: string
        success?: boolean
        uploadToken?: string
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to submit your enrollment.')
      }

      setRegistrationID(result.registrationId || 'Received')
      setUploadToken(result.uploadToken || '')
      setForm(initialForm)
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to submit your enrollment. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const submitProof = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProofSubmitting(true)
    setProofError('')

    if (!proofFile) {
      setProofError('Please upload your payment screenshot.')
      setProofSubmitting(false)
      return
    }

    try {
      const proofData = new FormData()
      proofData.append('registrationId', registrationID)
      proofData.append('uploadToken', uploadToken)
      proofData.append('paymentReference', paymentReference)
      proofData.append('proof', proofFile)

      const response = await fetch('/api/workshop-payment-proof/', {
        body: proofData,
        method: 'POST',
      })
      const result = (await response.json()) as { message?: string; success?: boolean }

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to submit the payment proof.')
      }

      setProofSubmitted(true)
    } catch (submissionError) {
      setProofError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to submit the payment proof. Please try again.',
      )
    } finally {
      setProofSubmitting(false)
    }
  }

  if (registrationID && proofSubmitted) {
    return (
      <div className="workshop-success" id="workshop-enrollment-panel" role="status">
        <span><CheckCircle2 size={34} /></span>
        <small>Payment proof received</small>
        <h2>Verification is pending.</h2>
        <p>
          Our admin will verify your ₹99 payment screenshot. After approval, the WhatsApp group
          link will be sent manually to your registered number.
        </p>
        <strong>{registrationID}</strong>
        <div className="workshop-confirmation-details">
          <span><Clock3 size={16} /> 2 August 2026 · 11:00 AM–1:00 PM</span>
          <span><ShieldCheck size={16} /> Status: Pending payment verification</span>
        </div>
        <div className="workshop-support">
          <small>Need help with your registration?</small>
          <strong>Contact Success Root Technologies</strong>
          <div>
            <a href="tel:+918939069135">
              <Phone size={15} /> +91 89390 69135
            </a>
            <a
              href={`https://wa.me/918939069135?text=${encodeURIComponent(
                `Hello SRT, I need help with workshop registration ${registrationID}`,
              )}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle size={15} /> WhatsApp us
            </a>
            <a href="mailto:contact@successroottech.com">
              <Mail size={15} /> contact@successroottech.com
            </a>
          </div>
          <p>Support hours: Monday–Sunday, 9:00 AM–9:00 PM</p>
        </div>
      </div>
    )
  }

  if (registrationID) {
    return (
      <form
        className="workshop-form workshop-payment-form"
        id="workshop-enrollment-panel"
        onSubmit={submitProof}
      >
        <div className="workshop-form-heading">
          <span>Step 2 of 2 · Pay and upload proof</span>
          <div className="workshop-form-title-row">
            <h2>Pay ₹99 using UPI</h2>
            <div className="workshop-price"><strong>₹99</strong><small>one-time fee</small></div>
          </div>
          <p>Scan the QR using any UPI app, then submit the payment screenshot.</p>
        </div>

        <div className="workshop-registration-chip">
          Registration ID <strong>{registrationID}</strong>
        </div>

        <aside className="workshop-payment-guidance">
          <div className="workshop-payment-support">
            <span><ShieldCheck size={18} /> Safe payment support</span>
            <strong>Need help before paying? We are here.</strong>
            <p>Call or WhatsApp our Chennai support team. Please mention your registration ID.</p>
            <div>
              <a href="tel:+918939069135">
                <Phone size={15} /> Call +91 89390 69135
              </a>
              <a
                href={`https://wa.me/918939069135?text=${encodeURIComponent(
                  `Hello SRT, I need payment help for workshop registration ${registrationID}`,
                )}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircle size={15} /> WhatsApp support
              </a>
            </div>
          </div>
          <div className="workshop-payment-checklist">
            <strong>Before confirming payment</strong>
            <ul>
              <li>Check the receiver name is Success Root Technologies.</li>
              <li>Confirm the amount is exactly ₹99.</li>
              <li>Never share your UPI PIN, OTP or banking password.</li>
              <li>After payment, enter the transaction ID and upload the receipt below.</li>
            </ul>
          </div>
          <div className="workshop-refund-note">
            <strong>Refund assurance</strong>
            <p>
              Eligible cancellations requested at least 24 hours before the workshop can be
              refunded. Approved refunds are initiated to the original payment method within 5–7
              business days.
            </p>
            <a href="/refund-and-cancellation-policy/" target="_blank">
              Read refund and cancellation policy
            </a>
          </div>
        </aside>

        <div className="workshop-qr-card">
          <div className="workshop-qr-heading"><QrCode size={17} /> Scan to pay Success Root Technologies</div>
          <a
            aria-label="Open a UPI app to pay ₹99 to Success Root Technologies"
            className="workshop-qr-tap"
            href={workshopUpiPaymentURL}
          >
            <Image
              alt="Success Root Technologies UPI QR code for ₹99 AI workshop payment"
              height={1599}
              priority
              src="/srt-workshop-upi-qr.png"
              unoptimized
              width={1019}
            />
          </a>
          <a className="workshop-upi-pay-button" href={workshopUpiPaymentURL}>
            <Smartphone size={17} /> Pay ₹99 with UPI App
          </a>
          <small className="workshop-upi-help">
            On mobile, tap the QR or button to open Google Pay, PhonePe, Paytm, BHIM or another UPI
            app.
          </small>
          <p>UPI ID: <strong>8680961239@ptyes</strong></p>
        </div>

        <div className="workshop-field">
          <label htmlFor="workshop-payment-reference">UPI transaction / reference number *</label>
          <input
            id="workshop-payment-reference"
            maxLength={100}
            minLength={6}
            onChange={(event) => setPaymentReference(event.target.value)}
            placeholder="Enter the UPI transaction ID"
            required
            value={paymentReference}
          />
        </div>

        <div className="workshop-proof-upload">
          <label htmlFor="workshop-payment-proof">
            <UploadCloud size={24} />
            <strong>Upload payment screenshot *</strong>
            <span>{proofFile ? proofFile.name : 'JPG, PNG or WebP · Maximum 5 MB'}</span>
          </label>
          <input
            accept="image/jpeg,image/png,image/webp"
            id="workshop-payment-proof"
            onChange={(event) => setProofFile(event.target.files?.[0] || null)}
            required
            type="file"
          />
        </div>

        {proofError && <p className="workshop-form-error" role="alert">{proofError}</p>}

        <button className="workshop-submit" disabled={proofSubmitting} type="submit">
          {proofSubmitting ? (
            <><LoaderCircle className="workshop-spinner" size={18} /> Uploading proof…</>
          ) : (
            <>Submit payment proof <ArrowRight size={18} /></>
          )}
        </button>
        <p className="workshop-form-note">
          <ShieldCheck size={13} /> Your screenshot is private and visible only to authorised admins.
        </p>
      </form>
    )
  }

  return (
    <form className="workshop-form" id="workshop-enrollment-panel" onSubmit={submit}>
      <div className="workshop-form-heading">
        <span>Step 1 of 2 · Workshop enrollment</span>
        <div className="workshop-form-title-row">
          <h2>Reserve your place</h2>
          <div className="workshop-price"><strong>₹99</strong><small>one-time fee</small></div>
        </div>
        <p>Complete the details below. Fields marked with * are required.</p>
      </div>

      <div className="workshop-field">
        <label htmlFor="workshop-full-name">Full name *</label>
        <input
          autoComplete="name"
          id="workshop-full-name"
          maxLength={120}
          minLength={2}
          onChange={(event) => update('fullName', event.target.value)}
          placeholder="Enter your full name"
          required
          value={form.fullName}
        />
      </div>

      <div className="workshop-field-grid">
        <div className="workshop-field">
          <label htmlFor="workshop-mobile">Mobile number *</label>
          <input
            autoComplete="tel"
            id="workshop-mobile"
            inputMode="tel"
            maxLength={20}
            minLength={10}
            onChange={(event) => update('mobileNumber', event.target.value)}
            placeholder="+91 98765 43210"
            required
            value={form.mobileNumber}
          />
        </div>
        <div className="workshop-field">
          <label htmlFor="workshop-whatsapp">WhatsApp number *</label>
          <input
            autoComplete="tel"
            disabled={sameWhatsApp}
            id="workshop-whatsapp"
            inputMode="tel"
            maxLength={20}
            minLength={10}
            onChange={(event) => update('whatsappNumber', event.target.value)}
            placeholder="+91 98765 43210"
            required
            value={form.whatsappNumber}
          />
        </div>
      </div>

      <label className="workshop-copy-number">
        <input
          checked={sameWhatsApp}
          onChange={(event) => toggleSameWhatsApp(event.target.checked)}
          type="checkbox"
        />
        <span><Check size={13} /></span>
        Use my mobile number for WhatsApp
      </label>

      <div className="workshop-field-grid">
        <div className="workshop-field">
          <label htmlFor="workshop-email">Email *</label>
          <input
            autoComplete="email"
            id="workshop-email"
            maxLength={180}
            onChange={(event) => update('email', event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={form.email}
          />
        </div>
        <div className="workshop-field">
          <label htmlFor="workshop-city">City *</label>
          <input
            autoComplete="address-level2"
            id="workshop-city"
            maxLength={100}
            minLength={2}
            onChange={(event) => update('city', event.target.value)}
            placeholder="Your city"
            required
            value={form.city}
          />
        </div>
      </div>

      <fieldset className="workshop-status">
        <legend>Current status *</legend>
        <div>
          {statusOptions.map(([value, label]) => (
            <label key={value}>
              <input
                checked={form.currentStatus === value}
                name="currentStatus"
                onChange={() => update('currentStatus', value)}
                required
                type="radio"
                value={value}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="workshop-field">
        <label htmlFor="workshop-discovery-source">How did you hear about us? *</label>
        <select
          id="workshop-discovery-source"
          onChange={(event) => update('discoverySource', event.target.value)}
          required
          value={form.discoverySource}
        >
          <option disabled value="">Select a source</option>
          {discoverySourceOptions.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {(form.discoverySource === 'friend-referral' || form.discoverySource === 'other') && (
        <div className="workshop-field">
          <label htmlFor="workshop-source-details">
            {form.discoverySource === 'friend-referral' ? 'Referral name or details' : 'Please specify'}
          </label>
          <input
            id="workshop-source-details"
            maxLength={200}
            onChange={(event) => update('sourceDetails', event.target.value)}
            placeholder="Add source details (optional)"
            value={form.sourceDetails}
          />
        </div>
      )}

      <div className="workshop-honeypot" aria-hidden="true">
        <label htmlFor="workshop-company-website">Company website</label>
        <input
          autoComplete="off"
          id="workshop-company-website"
          onChange={(event) => update('companyWebsite', event.target.value)}
          tabIndex={-1}
          value={form.companyWebsite}
        />
      </div>

      <label className="workshop-consent">
        <input
          checked={form.consentToContact}
          onChange={(event) => update('consentToContact', event.target.checked)}
          required
          type="checkbox"
        />
        <span><Check size={13} /></span>
        I agree to be contacted by Success Root Technologies about this workshop. *
      </label>
      <p className="workshop-legal-note">
        Workshop fee: ₹99. After registration, scan our UPI QR and upload the payment proof. By
        registering, you agree to our{' '}
        <a href="/terms-and-conditions/" rel="noreferrer" target="_blank">Terms</a> and{' '}
        <a href="/refund-and-cancellation-policy/" rel="noreferrer" target="_blank">Refund Policy</a>.
      </p>

      {error && <p className="workshop-form-error" role="alert">{error}</p>}

      <button className="workshop-submit" disabled={submitting} type="submit">
        {submitting ? (
          <><LoaderCircle className="workshop-spinner" size={18} /> Submitting…</>
        ) : (
          <>Register and Proceed <ArrowRight size={18} /></>
        )}
      </button>

      <p className="workshop-form-note">
        <ShieldCheck size={14} /> Your details are used only for workshop communication and follow-up.
      </p>
    </form>
  )
}
