'use client'

import React, { useCallback, useEffect, useState } from 'react'

const filters = [
  { countKey: 'all', label: 'All', value: '' },
  { label: 'Pending', value: 'pending-verification' },
  { label: 'Paid', value: 'paid' },
  { label: 'Not paid', value: 'not-submitted' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Refunded', value: 'refunded' },
]

type Counts = Record<string, number>

export default function WorkshopExportButton() {
  const [counts, setCounts] = useState<Counts>({})
  const [certificateLinkCopied, setCertificateLinkCopied] = useState(false)
  const [feedbackLinkCopied, setFeedbackLinkCopied] = useState(false)

  const loadCounts = useCallback(async () => {
    try {
      const response = await fetch('/api/workshop-registrations/counts', {
        credentials: 'same-origin',
      })

      if (!response.ok) return

      const result = (await response.json()) as { counts?: Counts }
      setCounts(result.counts ?? {})
    } catch {
      // Keep the filters usable if the summary endpoint is temporarily unavailable.
    }
  }, [])

  useEffect(() => {
    void loadCounts()

    const refreshCounts = () => void loadCounts()
    window.addEventListener('workshop-payment-status-updated', refreshCounts)

    return () => window.removeEventListener('workshop-payment-status-updated', refreshCounts)
  }, [loadCounts])

  return (
    <div
      style={{
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 8,
        marginBottom: 18,
        padding: '14px 16px',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <strong style={{ display: 'block', marginBottom: 3 }}>Workshop registrations</strong>
          <span style={{ color: 'var(--theme-elevation-600)', fontSize: 13 }}>
            Filter candidates by their current payment status.
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(
                `${window.location.origin}/download-certificate/`,
              )
              setCertificateLinkCopied(true)
              window.setTimeout(() => setCertificateLinkCopied(false), 2200)
            }}
            style={{
              background: '#1769aa',
              border: 0,
              borderRadius: 6,
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 700,
              padding: '10px 15px',
              whiteSpace: 'nowrap',
            }}
            type="button"
          >
            {certificateLinkCopied ? 'Certificate link copied' : 'Copy certificate portal link'}
          </button>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(
                `${window.location.origin}/workshop-feedback/`,
              )
              setFeedbackLinkCopied(true)
              window.setTimeout(() => setFeedbackLinkCopied(false), 2200)
            }}
            style={{
              background: '#ffc400',
              border: 0,
              borderRadius: 6,
              color: '#071d3a',
              cursor: 'pointer',
              fontWeight: 700,
              padding: '10px 15px',
              whiteSpace: 'nowrap',
            }}
            type="button"
          >
            {feedbackLinkCopied ? 'Feedback link copied' : 'Copy feedback link'}
          </button>
          <a
            href="/api/workshop-registrations/export/"
            style={{
              background: 'var(--theme-success-500)',
              borderRadius: 6,
              color: '#fff',
              fontWeight: 600,
              padding: '10px 15px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Export all CSV
          </a>
        </div>
      </div>
      <nav
        aria-label="Filter workshop registrations by payment status"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 14,
        }}
      >
        {filters.map((filter) => {
          const countKey = filter.countKey ?? filter.value
          const href = filter.value
            ? `/admin/collections/workshop-registrations/?where[paymentStatus][equals]=${filter.value}`
            : '/admin/collections/workshop-registrations/'

          return (
            <a
              href={href}
              key={filter.label}
              style={{
                border: `1px solid ${
                  filter.value === 'paid'
                    ? 'var(--theme-success-500)'
                    : filter.value === 'pending-verification'
                      ? '#a97800'
                      : filter.value === 'not-submitted' || filter.value === 'rejected'
                        ? 'var(--theme-error-500)'
                        : 'var(--theme-elevation-250)'
                }`,
                borderRadius: 999,
                color:
                  filter.value === 'paid'
                    ? 'var(--theme-success-600)'
                    : filter.value === 'not-submitted' || filter.value === 'rejected'
                      ? 'var(--theme-error-500)'
                      : 'var(--theme-elevation-800)',
                fontSize: 12,
                fontWeight: 650,
                padding: '7px 12px',
                textDecoration: 'none',
              }}
            >
              {filter.label}
              <span
                style={{
                  background: 'var(--theme-elevation-150)',
                  borderRadius: 999,
                  display: 'inline-block',
                  fontSize: 11,
                  marginLeft: 7,
                  minWidth: 20,
                  padding: '2px 6px',
                  textAlign: 'center',
                }}
              >
                {counts[countKey] ?? '…'}
              </span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}
