'use client'

export default function FormSubmissionExportButton() {
  return <div style={{ alignItems: 'center', background: 'var(--theme-elevation-50)', border: '1px solid var(--theme-elevation-150)', borderRadius: 8, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between', marginBottom: 18, padding: '14px 16px' }}>
    <div><strong style={{ display: 'block', marginBottom: 3 }}>Course enquiries</strong><span style={{ color: 'var(--theme-elevation-600)', fontSize: 13 }}>Student contact details and course preferences submitted from landing pages.</span></div>
    <a href="/api/form-submissions/export/" style={{ background: 'var(--theme-success-500)', borderRadius: 6, color: '#fff', fontWeight: 700, padding: '10px 16px', textDecoration: 'none', whiteSpace: 'nowrap' }}>Export all CSV</a>
  </div>
}
