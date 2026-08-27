import type { Metadata } from 'next'

import { BusinessContact, CompliancePage } from '@/components/CompliancePage'

export const metadata: Metadata = {
  title: 'Shipping and Digital Delivery Policy',
  description: 'Digital delivery details for online workshops, courses and services from Success Root Technologies.',
  alternates: { canonical: '/shipping-and-delivery-policy/' },
}

export default function DeliveryPolicyPage() {
  return (
    <CompliancePage
      eyebrow="Digital service delivery"
      intro="Our workshops and online learning services are delivered digitally. No physical product shipping is involved unless explicitly stated."
      title="Shipping and Digital Delivery Policy"
    >
      <section>
        <h2>Delivery method</h2>
        <p>Workshop confirmations, session timing, online meeting access, WhatsApp group access and related instructions are delivered to the email address and mobile or WhatsApp number entered during registration.</p>
      </section>
      <section>
        <h2>Delivery timeline</h2>
        <p>An initial registration acknowledgement is normally shown immediately after successful registration or payment. Final joining instructions are sent before the scheduled session. Course and software-service delivery timelines are confirmed separately in the relevant proposal, invoice or enrollment communication.</p>
      </section>
      <section>
        <h2>Incorrect contact details</h2>
        <p>Participants are responsible for supplying a reachable email address and phone number. If details are incorrect, contact us promptly with the payment or registration reference so we can verify and update the record.</p>
      </section>
      <section>
        <h2>Delivery support</h2>
        <p>If confirmed access details are not received, check spam folders and WhatsApp messages, then contact us with the registered contact details. Never share payment passwords or PINs.</p>
        <BusinessContact />
      </section>
    </CompliancePage>
  )
}
