'use client'

import React from 'react'

type PaymentProof = {
  id?: number | string
}

type Props = {
  cellData?: number | PaymentProof | string
  rowData?: {
    paymentProof?: number | PaymentProof | string
  }
}

export default function WorkshopPaymentProofCell({ cellData, rowData }: Props) {
  const proof = rowData?.paymentProof ?? cellData
  const proofID = typeof proof === 'object' && proof !== null ? proof.id : proof

  if (!proofID) {
    return <span style={{ color: 'var(--theme-elevation-500)' }}>Not uploaded</span>
  }

  return (
    <a
      href={`/admin/collections/payment-proofs/${proofID}`}
      onClick={(event) => event.stopPropagation()}
      style={{
        color: 'var(--theme-success-600)',
        fontWeight: 600,
        textDecoration: 'underline',
        whiteSpace: 'nowrap',
      }}
    >
      View screenshot
    </a>
  )
}
