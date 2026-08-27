'use client'

import React, { useState } from 'react'

type Props = {
  rowData?: {
    fullName?: string
    id?: number | string
    whatsappNumber?: string
  }
}

export default function WorkshopDeleteRegistrationCell({ rowData }: Props) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const whatsappDigits = rowData?.whatsappNumber?.replace(/\D/g, '') || ''
  const whatsappNumber = whatsappDigits.length === 10 ? `91${whatsappDigits}` : whatsappDigits
  const feedbackMessage = encodeURIComponent(
    `Hello ${rowData?.fullName || 'there'}, thank you for attending the SRT AI Workshop. Please share your feedback and course interest here: https://srtv1.successroottech.com/workshop-feedback/`,
  )

  const deleteRegistration = async () => {
    if (!rowData?.id || deleting) return

    const candidate = rowData.fullName || 'this candidate'
    const confirmed = window.confirm(
      `Delete ${candidate}? This permanently removes the registration and its payment screenshot. This action cannot be undone.`,
    )

    if (!confirmed) return

    setDeleting(true)
    setError('')

    try {
      const response = await fetch(`/api/workshop-registrations/${rowData.id}`, {
        credentials: 'same-origin',
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Delete failed')
      window.location.reload()
    } catch {
      setError('Try again')
      setDeleting(false)
    }
  }

  return (
    <div
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 6, minWidth: 125 }}
    >
      <a
        href={`/admin/collections/workshop-registrations/${rowData?.id}`}
        onClick={(event) => event.stopPropagation()}
        style={{
          background: 'var(--theme-success-600)',
          border: '1px solid var(--theme-success-600)',
          borderRadius: 5,
          color: '#fff',
          display: 'inline-flex',
          fontSize: 11,
          fontWeight: 700,
          padding: '5px 9px',
          textDecoration: 'none',
        }}
      >
        Edit
      </a>
      {whatsappNumber ? (
        <a
          href={`https://wa.me/${whatsappNumber}?text=${feedbackMessage}`}
          rel="noreferrer"
          style={{
            background: '#1f9d61',
            border: '1px solid #1f9d61',
            borderRadius: 5,
            color: '#fff',
            display: 'inline-flex',
            fontSize: 11,
            fontWeight: 700,
            padding: '5px 9px',
            textDecoration: 'none',
          }}
          target="_blank"
        >
          Request feedback
        </a>
      ) : null}
      <button
        disabled={deleting}
        onClick={deleteRegistration}
        style={{
          background: 'transparent',
          border: '1px solid var(--theme-error-500)',
          borderRadius: 5,
          color: 'var(--theme-error-500)',
          cursor: deleting ? 'wait' : 'pointer',
          fontSize: 11,
          fontWeight: 650,
          padding: '5px 8px',
        }}
        type="button"
      >
        {deleting ? 'Deleting…' : 'Delete'}
      </button>
      {error ? (
        <small
          style={{
            color: 'var(--theme-error-500)',
            flexBasis: '100%',
            marginTop: 2,
          }}
        >
          {error}
        </small>
      ) : null}
    </div>
  )
}
