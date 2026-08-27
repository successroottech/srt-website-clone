import type { Metadata } from 'next'

import { BusinessContact, CompliancePage } from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Refund and Cancellation Policy',
  description: 'Refund, cancellation and rescheduling policy for Success Root Technologies workshops and training services.',
  alternates: { canonical: '/refund-and-cancellation-policy/' },
}

export default function RefundPolicyPage() {
  return (
    <CompliancePage
      eyebrow="Customer policy"
      intro="This policy explains when workshop and training payments may be cancelled, transferred or refunded."
      title="Refund and Cancellation Policy"
    >
      <section>
        <h2>Workshop cancellation by the participant</h2>
        <p>For the INR 99 AI workshop, a participant may request cancellation at least 24 hours before the scheduled start time. Eligible requests receive a refund to the original payment method. Requests made less than 24 hours before the workshop, after joining details have been used, or after the session has started are normally not refundable.</p>
      </section>
      <section>
        <h2>Rescheduling</h2>
        <p>Instead of cancelling, a participant may request one transfer to a future available batch before the scheduled workshop begins. Transfers depend on seat and batch availability and cannot be exchanged for cash after attendance or access.</p>
      </section>
      <section>
        <h2>Cancellation by Success Root Technologies</h2>
        <p>If we cancel a paid workshop and cannot provide a suitable replacement date, the participant is eligible for a full refund. If a session is postponed, participants may accept the revised schedule, request an available future batch, or request a refund.</p>
      </section>
      <section>
        <h2>Duplicate or failed transactions</h2>
        <p>Duplicate successful charges will be reviewed and the duplicate amount will be refunded after payment verification. Amounts debited for transactions marked failed are usually reversed by the bank or payment provider. Contact us with the payment reference if the reversal does not appear within the provider&apos;s stated timeline.</p>
      </section>
      <section>
        <h2>Refund processing time</h2>
        <p>Approved refunds are initiated to the original payment method within 5 to 7 business days. The bank or payment provider may require additional time to reflect the amount in the customer&apos;s account.</p>
      </section>
      <section>
        <h2>How to request a refund</h2>
        <p>Email or WhatsApp us with the registered name, mobile number, email address, workshop name, payment ID and reason for the request. Do not send card numbers, CVVs, UPI PINs or banking passwords.</p>
        <BusinessContact />
      </section>
    </CompliancePage>
  )
}
