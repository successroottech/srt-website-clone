'use client'

import React, { useRef, useState } from 'react'

type Props = {
  rowData?: {
    certificateImage?: number | string | { id?: number | string } | null
    certificateShareToken?: string | null
    fullName?: string
    id?: number | string
  }
}

export default function WorkshopCertificateCell({ rowData }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [hasCertificate, setHasCertificate] = useState(Boolean(rowData?.certificateImage))
  const [token, setToken] = useState(rowData?.certificateShareToken || '')
  const [uploading, setUploading] = useState(false)

  const uploadCertificate = async (file: File) => {
    if (!rowData?.id || uploading) return

    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.set('certificate', file)
      formData.set('registrationId', String(rowData.id))

      const response = await fetch('/api/workshop-certificate-upload/', {
        body: formData,
        credentials: 'same-origin',
        method: 'POST',
      })
      const result = (await response.json()) as { certificateToken?: string; message?: string }

      if (!response.ok || !result.certificateToken) {
        throw new Error(result.message || 'Certificate upload failed.')
      }

      setToken(result.certificateToken)
      setHasCertificate(true)
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed. Try again.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const path = token ? `/certificate/${token}/` : ''

  return (
    <div
      onClick={(event) => {
        event.stopPropagation()
      }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 5, minWidth: 195 }}
    >
      <input
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) void uploadCertificate(file)
        }}
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
      />
      <button
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        style={{
          background: hasCertificate ? 'transparent' : '#1769aa',
          border: '1px solid #2386c8',
          borderRadius: 5,
          color: hasCertificate ? '#40a9e8' : '#fff',
          cursor: uploading ? 'wait' : 'pointer',
          fontSize: 11,
          fontWeight: 750,
          padding: '5px 8px',
        }}
        type="button"
      >
        {uploading ? 'Uploading…' : hasCertificate ? 'Replace image' : 'Upload certificate'}
      </button>
      {hasCertificate && path ? (
        <>
          <a
            href={path}
            rel="noreferrer"
            style={{
              border: '1px solid var(--theme-success-500)',
              borderRadius: 5,
              color: 'var(--theme-success-600)',
              fontSize: 11,
              fontWeight: 700,
              padding: '5px 8px',
              textDecoration: 'none',
            }}
            target="_blank"
          >
            View
          </a>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(`${window.location.origin}${path}`)
              setCopied(true)
              window.setTimeout(() => setCopied(false), 2000)
            }}
            style={{
              background: '#ffc400',
              border: '1px solid #ffc400',
              borderRadius: 5,
              color: '#071d3a',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 750,
              padding: '5px 8px',
            }}
            type="button"
          >
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </>
      ) : null}
      {error ? (
        <small style={{ color: 'var(--theme-error-500)', flexBasis: '100%', fontSize: 10 }}>
          {error}
        </small>
      ) : null}
    </div>
  )
}
