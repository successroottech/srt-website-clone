'use client'

type Props = { rowData?: { submissionData?: { field?: string; value?: unknown }[] } }

export default function FormSubmissionNameCell({ rowData }: Props) {
  const data = Array.isArray(rowData?.submissionData) ? rowData.submissionData : []
  const name = data.find((item) => item?.field === 'name')?.value
  return <strong>{String(name || '—')}</strong>
}
