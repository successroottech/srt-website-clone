import type { Metadata } from 'next'

import { BusinessContact, CompliancePage } from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for training, workshops and software development services from Success Root Technologies.',
  alternates: { canonical: '/terms-and-conditions/' },
}

export default function TermsPage() {
  return (
    <CompliancePage
      eyebrow="Legal information"
      intro="These terms explain the conditions that apply when you use our website or register for training, workshops and technology services."
      title="Terms and Conditions"
    >
      <section>
        <h2>1. About these terms</h2>
        <p>These terms apply to services provided by Success Root Technologies, including instructor-led training, AI workshops, career-support activities and software development services. By submitting a registration or making a payment, you confirm that the information you provide is accurate and that you accept these terms.</p>
      </section>
      <section>
        <h2>2. Workshop and course registration</h2>
        <p>Seats may be limited and are confirmed only after the applicable registration process and successful payment. The AI workshop registration fee is INR 99 unless a different amount is clearly displayed before payment. Batch dates, duration, delivery mode and joining instructions are communicated through the contact details supplied during registration.</p>
      </section>
      <section>
        <h2>3. Payments</h2>
        <p>Online payments are processed by an authorised third-party payment gateway. You must use a payment method that you are authorised to use. We do not store complete card numbers, UPI PINs, CVVs or net-banking passwords. A registration is treated as paid only after the payment provider confirms a successful transaction.</p>
      </section>
      <section>
        <h2>4. Changes, cancellations and refunds</h2>
        <p>Workshop schedules may be changed when required due to trainer availability, technical interruption or circumstances outside our reasonable control. Our refund and cancellation rules form part of these terms and are available on the Refund and Cancellation Policy page.</p>
      </section>
      <section>
        <h2>5. Learner conduct and access</h2>
        <p>Joining links, group links, learning materials and recordings are intended only for the registered participant and must not be shared, resold or published. Participants must behave respectfully and must not disrupt sessions or misuse systems, accounts or materials.</p>
      </section>
      <section>
        <h2>6. Career and placement support</h2>
        <p>Any placement, interview or career support is assistance only. Employment outcomes depend on the learner&apos;s skills, participation, performance, employer requirements and market conditions. We do not guarantee a job, salary, interview or selection.</p>
      </section>
      <section>
        <h2>7. Intellectual property</h2>
        <p>Course content, workshop materials, brand assets, software, slides and recordings remain the property of Success Root Technologies or their respective licensors. Registration grants a limited, personal and non-transferable right to use the material for learning.</p>
      </section>
      <section>
        <h2>8. Limitation and governing law</h2>
        <p>We provide services with reasonable care but do not promise uninterrupted availability or a specific educational, business or employment result. These terms are governed by the laws of India, and disputes are subject to the courts having jurisdiction in Chennai, Tamil Nadu.</p>
      </section>
      <section>
        <h2>9. Contact</h2>
        <BusinessContact />
      </section>
    </CompliancePage>
  )
}
