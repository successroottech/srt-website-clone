'use client'

import React, { useEffect, useState } from 'react'

const filters = [
  { key: 'all', label: 'All responses', value: '' },
  { key: 'ready-to-join', label: 'Ready to join', value: 'ready-to-join' },
  { key: 'counsellor-call', label: 'Counsellor call', value: 'counsellor-call' },
  { key: 'installment-plan', label: 'Installment', value: 'installment-plan' },
  { key: 'considering', label: 'Considering', value: 'considering' },
  { key: 'not-now', label: 'Not now', value: 'not-now' },
]

export default function WorkshopFeedbackSummary() {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/workshop-feedbacks/counts/', {
          credentials: 'same-origin',
        })
        if (!response.ok) return
        const result = (await response.json()) as { counts?: Record<string, number> }
        setCounts(result.counts ?? {})
      } catch {
        // Filters remain available if count loading fails.
      }
    }

    void load()
  }, [])

  return (
    <section
      style={{
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 8,
        marginBottom: 18,
        padding: '14px 16px',
      }}
    >
      <strong style={{ display: 'block', marginBottom: 3 }}>Course interest overview</strong>
      <span style={{ color: 'var(--theme-elevation-600)', fontSize: 13 }}>
        Quickly identify participants who are ready to join or need counselling.
      </span>
      <nav
        aria-label="Filter feedback by course interest"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}
      >
        {filters.map((filter) => (
          <a
            href={
              filter.value
                ? `/admin/collections/workshop-feedbacks/?where[joinInterest][equals]=${filter.value}`
                : '/admin/collections/workshop-feedbacks/'
            }
            key={filter.key}
            style={{
              border: `1px solid ${
                filter.value === 'ready-to-join'
                  ? 'var(--theme-success-500)'
                  : filter.value === 'not-now'
                    ? 'var(--theme-error-500)'
                    : 'var(--theme-elevation-250)'
              }`,
              borderRadius: 999,
              color:
                filter.value === 'ready-to-join'
                  ? 'var(--theme-success-600)'
                  : filter.value === 'not-now'
                    ? 'var(--theme-error-500)'
                    : 'var(--theme-elevation-800)',
              fontSize: 12,
              fontWeight: 700,
              padding: '7px 11px',
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
              {counts[filter.key] ?? '…'}
            </span>
          </a>
        ))}
      </nav>
    </section>
  )
}
