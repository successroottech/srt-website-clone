'use client'

type Props = { rowData?: { submissionData?: { field?: string; value?: unknown }[] } }

export default function FormSubmissionMobileCell({ rowData }: Props) {
  const data = Array.isArray(rowData?.submissionData) ? rowData.submissionData : []
  const mobile = String(data.find((item) => item?.field === 'mobile')?.value || '')
  return mobile ? <a href={`tel:${mobile}`} onClick={(event) => event.stopPropagation()}>{mobile}</a> : <span>—</span>
}
