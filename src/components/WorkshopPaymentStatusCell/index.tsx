'use client'

import React, { useState } from 'react'

type PaymentStatus = 'not-submitted' | 'pending-verification' | 'paid' | 'rejected' | 'refunded'

type Props = {
  cellData?: PaymentStatus
  rowData?: {
    id?: number | string
  }
}

const labels: Record<PaymentStatus, string> = {
  'not-submitted': 'Not paid',
  'pending-verification': 'Pending verification',
  paid: 'Paid',
  rejected: 'Not paid / rejected',
  refunded: 'Refunded',
}

export default function WorkshopPaymentStatusCell({ cellData = 'not-submitted', rowData }: Props) {
  const [status, setStatus] = useState<PaymentStatus>(cellData)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateStatus = async (nextStatus: PaymentStatus) => {
    if (!rowData?.id || saving || status === nextStatus) return

    const previousStatus = status
    setStatus(nextStatus)
    setSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/workshop-registrations/${rowData.id}`, {
        body: JSON.stringify({
          paymentStatus: nextStatus,
          paymentVerifiedAt: nextStatus === 'paid' ? new Date().toISOString() : null,
        }),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
      })

      if (!response.ok) throw new Error('Could not update payment status')
      window.dispatchEvent(new Event('workshop-payment-status-updated'))
    } catch {
      setStatus(previousStatus)
      setError('Try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      style={{ minWidth: 150 }}
    >
      <select
        aria-label={`Payment status: ${labels[status]}`}
        disabled={saving}
        onChange={(event) => updateStatus(event.target.value as PaymentStatus)}
        style={{
          appearance: 'auto',
          background:
            status === 'paid'
              ? '#087f5b'
              : status === 'pending-verification'
                ? '#9a6b00'
                : status === 'refunded'
                  ? '#1769aa'
                  : 'var(--theme-elevation-100)',
          border:
            status === 'not-submitted' || status === 'rejected'
              ? '1px solid var(--theme-error-500)'
              : '1px solid transparent',
          borderRadius: 7,
          color:
            status === 'not-submitted' || status === 'rejected'
              ? 'var(--theme-error-500)'
              : '#fff',
          cursor: saving ? 'wait' : 'pointer',
          fontSize: 11,
          fontWeight: 700,
          minHeight: 34,
          padding: '5px 8px',
          width: '100%',
        }}
        value={status}
      >
        <option value="pending-verification">Pending verification</option>
        <option value="paid">Paid</option>
        <option value="not-submitted">Not paid</option>
        <option value="rejected">Not paid / rejected</option>
        <option value="refunded">Refunded</option>
      </select>
      {saving ? (
        <small style={{ color: 'var(--theme-elevation-600)', display: 'block', marginTop: 4 }}>
          Saving…
        </small>
      ) : null}
      {error ? <small style={{ color: 'var(--theme-error-500)' }}>{error}</small> : null}
    </div>
  )
}
