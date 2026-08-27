'use client'

import React from 'react'

type Props = {
  rowData?: {
    createdAt?: string
  }
}

const formatter = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Kolkata',
})

export default function WorkshopRegisteredDateTimeCell({ rowData }: Props) {
  if (!rowData?.createdAt) {
    return <span style={{ color: 'var(--theme-elevation-500)' }}>—</span>
  }

  const createdAt = new Date(rowData.createdAt)

  if (Number.isNaN(createdAt.getTime())) {
    return <span style={{ color: 'var(--theme-elevation-500)' }}>—</span>
  }

  return (
    <time
      dateTime={rowData.createdAt}
      style={{
        display: 'inline-block',
        fontSize: 12,
        lineHeight: 1.4,
        minWidth: 135,
        whiteSpace: 'nowrap',
      }}
      title={`${formatter.format(createdAt)} IST`}
    >
      {formatter.format(createdAt)}
      <small
        style={{
          color: 'var(--theme-elevation-500)',
          display: 'block',
          fontSize: 10,
          fontWeight: 600,
        }}
      >
        IST
      </small>
    </time>
  )
}
