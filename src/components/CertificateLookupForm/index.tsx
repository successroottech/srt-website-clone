'use client'

import { ArrowRight, Award, CheckCircle2, LoaderCircle, Search } from 'lucide-react'
import React, { useState } from 'react'

import styles from './styles.module.css'

export function CertificateLookupForm() {
  const [certificateURL, setCertificateURL] = useState('')
  const [error, setError] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [searching, setSearching] = useState(false)

  const findCertificate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setCertificateURL('')

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError('Enter exactly 10 digits without +91 or spaces.')
      return
    }

    setSearching(true)
    try {
      const response = await fetch('/api/certificate-lookup/', {
        body: JSON.stringify({ mobileNumber }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const result = (await response.json()) as { certificateURL?: string; message?: string }

      if (!response.ok || !result.certificateURL) {
        throw new Error(result.message || 'Certificate could not be found.')
      }
      setCertificateURL(result.certificateURL)
    } catch (lookupError) {
      setError(
        lookupError instanceof Error
          ? lookupError.message
          : 'Certificate could not be found. Please try again.',
      )
    } finally {
      setSearching(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={findCertificate}>
      <span className={styles.icon}><Award size={30} /></span>
      <small>Workshop certificate portal</small>
      <h1>Download your certificate</h1>
      <p>Enter the same 10-digit mobile or WhatsApp number used during registration.</p>

      <label>
        <span>Mobile / WhatsApp number</span>
        <div className={styles.inputWrap}>
          <span>+91</span>
          <input
            aria-label="10-digit mobile or WhatsApp number"
            autoComplete="tel"
            inputMode="numeric"
            maxLength={10}
            minLength={10}
            onChange={(event) => setMobileNumber(event.target.value.replace(/\D/g, '').slice(0, 10))}
            pattern="[0-9]{10}"
            placeholder="9876543210"
            required
            value={mobileNumber}
          />
        </div>
      </label>

      {error ? <div className={styles.error}>{error}</div> : null}
      {certificateURL ? (
        <div className={styles.found}>
          <CheckCircle2 size={20} />
          <div>
            <strong>Certificate available</strong>
            <span>Your certificate has been verified and is available to view or download.</span>
          </div>
        </div>
      ) : null}

      {certificateURL ? (
        <a className={styles.action} href={certificateURL}>
          View Certificate <ArrowRight size={18} />
        </a>
      ) : (
        <button className={styles.action} disabled={searching} type="submit">
          {searching ? <LoaderCircle className={styles.spinner} size={19} /> : <Search size={18} />}
          {searching ? 'Checking...' : 'Find my certificate'}
        </button>
      )}
      <span className={styles.support}>Need help? Call or WhatsApp +91 89390 69135</span>
    </form>
  )
}
