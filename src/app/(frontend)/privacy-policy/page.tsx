import type { Metadata } from 'next'

import { BusinessContact, CompliancePage } from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Success Root Technologies collects, uses and protects personal information.',
  alternates: { canonical: '/privacy-policy/' },
}

export default function PrivacyPolicyPage() {
  return (
    <CompliancePage
      eyebrow="Privacy and data"
      intro="This policy explains what personal information we collect and how it is used when you visit our website or register for our services."
      title="Privacy Policy"
    >
      <section>
        <h2>Information we collect</h2>
        <p>We may collect your name, mobile and WhatsApp numbers, email address, city, current career status, referral source, course or service interest, messages, registration records and payment transaction references. We may also process basic technical and analytics information needed for security and website operation.</p>
      </section>
      <section>
        <h2>How information is used</h2>
        <p>Information is used to process registrations, confirm payments, deliver workshops and services, provide support, communicate schedules, respond to enquiries, maintain business records, prevent abuse and improve our website and offerings.</p>
      </section>
      <section>
        <h2>Payments</h2>
        <p>Payments are handled by authorised payment providers. Success Root Technologies does not store complete card numbers, CVVs, UPI PINs or net-banking passwords. Payment providers process information according to their own security and privacy obligations.</p>
      </section>
      <section>
        <h2>Sharing and retention</h2>
        <p>We may share limited information with service providers that support payments, communications, hosting, analytics or service delivery, and when required by law. We retain records only for legitimate business, tax, security and legal purposes, after which they are deleted or anonymised when reasonably possible.</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>You may ask us to correct inaccurate contact information or stop optional promotional communication. Certain transaction and service records may need to be retained to meet legal or accounting obligations.</p>
      </section>
      <section>
        <h2>Contact for privacy requests</h2>
        <BusinessContact />
      </section>
    </CompliancePage>
  )
}
