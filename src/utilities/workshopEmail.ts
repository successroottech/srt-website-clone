import nodemailer from 'nodemailer'

import { getAbsoluteURL, getServerSideURL } from '@/utilities/getURL'

type WorkshopEmailRegistration = {
  email: string
  fullName: string
  id: number | string
  paymentReference?: null | string
  paymentUploadToken?: null | string
}

const supportEmail = 'contact@successroottech.com'
const supportPhone = '+91 89390 69135'

const escapeHTML = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    }
    return entities[character] || character
  })

const registrationID = (id: number | string) => `SRT-AI-${String(id).padStart(5, '0')}`

export const workshopPaymentLink = (registration: WorkshopEmailRegistration) => {
  const baseURL = getServerSideURL()
  const query = new URLSearchParams({
    registration: registrationID(registration.id),
    token: registration.paymentUploadToken || '',
  })
  return `${baseURL}/ai-workshop/?${query.toString()}`
}

export const workshopEmailConfigured = () =>
  process.env.WORKSHOP_EMAILS_ENABLED !== 'false' &&
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD)

const transport = () =>
  nodemailer.createTransport({
    auth: {
      pass: process.env.SMTP_PASSWORD,
      user: process.env.SMTP_USER || supportEmail,
    },
    connectionTimeout: 12_000,
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
  })

const shell = (preheader: string, content: string) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Success Root Technologies</title>
    </head>
    <body style="margin:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#172b3f">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
      <div style="max-width:600px;margin:0 auto;padding:28px 14px">
        <div style="background:#ffffff;border:1px solid #dfe5eb;border-radius:12px;overflow:hidden">
          <div style="border-bottom:3px solid #f5bf18;padding:22px 26px">
            <div style="font-size:20px;font-weight:700;color:#0b2745">Success Root Technologies</div>
            <div style="margin-top:5px;font-size:12px;color:#66788a">Workshop Registration Services</div>
          </div>
          <div style="padding:26px">
            ${content}
          </div>
          <div style="border-top:1px solid #e5e9ed;background:#fafbfc;padding:20px 26px">
            <p style="margin:0;font-size:12px;line-height:1.6;color:#617386">
              <strong style="color:#263f57">Success Root Technologies</strong><br>
              Old No. 8/1, New No. 15/1, First Floor, Rajaji Street,<br>
              West Mambalam, Chennai, Tamil Nadu 600033, India
            </p>
            <p style="margin:12px 0 0;font-size:12px;line-height:1.6;color:#617386">
              Phone / WhatsApp: ${supportPhone}<br>
              Email: <a href="mailto:${supportEmail}" style="color:#315f87">${supportEmail}</a><br>
              Support hours: Monday–Sunday, 9:00 AM–9:00 PM IST
            </p>
            <p style="margin:12px 0 0;font-size:11px;line-height:1.55;color:#7a8998">
              This service email was sent because this address was used to register for the
              Generative AI Workshop. Never share your UPI PIN, OTP or banking password.
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>
`

export async function sendWorkshopRegistrationEmail(registration: WorkshopEmailRegistration) {
  if (!workshopEmailConfigured()) return false

  const safeName = escapeHTML(registration.fullName)
  const id = registrationID(registration.id)
  const paymentURL = workshopPaymentLink(registration)

  await transport().sendMail({
    from: process.env.SMTP_FROM || `Success Root Technologies <${supportEmail}>`,
    headers: {
      'X-Entity-Ref-ID': id,
    },
    html: shell(
      `Registration ${id} has been received. Complete the ₹99 payment to confirm your place.`,
      `
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6">Dear ${safeName},</p>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#40566c">
        Thank you for registering for the Generative AI Workshop conducted by Success Root
        Technologies. Your registration has been received and is awaiting payment.
      </p>
      <table role="presentation" style="width:100%;border-collapse:collapse;margin:20px 0;background:#f7f9fb;border:1px solid #e1e6eb">
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Registration ID</td><td style="padding:10px 13px;font-weight:700;font-size:13px">${id}</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Workshop</td><td style="padding:10px 13px;font-size:13px">Generative AI Workshop</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Date</td><td style="padding:10px 13px;font-size:13px">2 August 2026</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Time</td><td style="padding:10px 13px;font-size:13px">11:00 AM–1:00 PM IST</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Fee</td><td style="padding:10px 13px;font-size:13px">₹99</td></tr>
      </table>
      <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:#40566c">
        Please use the secure link below to complete the ₹99 payment and upload the payment
        receipt. Your place is confirmed after payment verification.
      </p>
      <p style="margin:22px 0">
        <a href="${paymentURL}" style="display:inline-block;background:#0b3155;color:#ffffff;text-decoration:none;padding:13px 20px;border-radius:6px;font-size:14px;font-weight:700">
          Continue to payment
        </a>
      </p>
      <p style="margin:0;font-size:12px;line-height:1.6;color:#728293">
        This link is unique to your registration. Please do not forward it. For cancellation and
        refund information, review our
        <a href="${getAbsoluteURL('/refund-and-cancellation-policy/')}" style="color:#315f87">refund policy</a>.
      </p>
    `,
    ),
    replyTo: supportEmail,
    subject: `AI Workshop registration received | ${id}`,
    text: `Hello ${registration.fullName}, your AI Workshop registration ${id} has been received. Complete the ₹99 payment here: ${paymentURL}. Date: 2 August 2026, 11:00 AM–1:00 PM. Support: ${supportPhone}.`,
    to: registration.email,
  })

  return true
}

export async function sendWorkshopPaymentReminder(registration: WorkshopEmailRegistration) {
  if (!workshopEmailConfigured()) return false

  const safeName = escapeHTML(registration.fullName)
  const id = registrationID(registration.id)
  const paymentURL = workshopPaymentLink(registration)

  await transport().sendMail({
    from: process.env.SMTP_FROM || `Success Root Technologies <${supportEmail}>`,
    headers: {
      'List-Unsubscribe': `<mailto:${supportEmail}?subject=Stop%20workshop%20reminders%20${id}>`,
      'X-Entity-Ref-ID': id,
    },
    html: shell(
      `Payment is pending for AI Workshop registration ${id}.`,
      `
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6">Dear ${safeName},</p>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#40566c">
        This is a reminder that payment is still pending for your Generative AI Workshop
        registration <strong>${id}</strong>.
      </p>
      <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:#40566c">
        If you would like to attend, please use the secure link below to complete the ₹99 payment
        and upload the receipt. If you have already paid, use the same link to submit the receipt
        or contact our support team.
      </p>
      <p style="margin:22px 0">
        <a href="${paymentURL}" style="display:inline-block;background:#0b3155;color:#ffffff;text-decoration:none;padding:13px 20px;border-radius:6px;font-size:14px;font-weight:700">
          Continue payment
        </a>
      </p>
      <p style="margin:0;font-size:12px;line-height:1.6;color:#728293">
        To stop payment reminders, reply to this email with the word “Stop”. For cancellation and
        refund information, review our
        <a href="${getAbsoluteURL('/refund-and-cancellation-policy/')}" style="color:#315f87">refund policy</a>.
      </p>
    `,
    ),
    replyTo: supportEmail,
    subject: `AI Workshop payment reminder | ${id}`,
    text: `Hello ${registration.fullName}, payment for AI Workshop registration ${id} is incomplete. Continue here: ${paymentURL}. Support: ${supportPhone}.`,
    to: registration.email,
  })

  return true
}

export async function sendWorkshopPaymentProofReceivedEmail(
  registration: WorkshopEmailRegistration,
) {
  if (!workshopEmailConfigured()) return false

  const safeName = escapeHTML(registration.fullName)
  const id = registrationID(registration.id)
  const reference = escapeHTML(registration.paymentReference || 'Submitted with payment receipt')

  await transport().sendMail({
    from: process.env.SMTP_FROM || `Success Root Technologies <${supportEmail}>`,
    headers: {
      'X-Entity-Ref-ID': id,
    },
    html: shell(
      `Payment proof has been received for registration ${id}.`,
      `
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6">Dear ${safeName},</p>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#40566c">
        We have received your ₹99 payment receipt for the Generative AI Workshop. The payment is
        now pending verification by our administration team.
      </p>
      <table role="presentation" style="width:100%;border-collapse:collapse;margin:20px 0;background:#f7f9fb;border:1px solid #e1e6eb">
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Registration ID</td><td style="padding:10px 13px;font-weight:700;font-size:13px">${id}</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Amount</td><td style="padding:10px 13px;font-size:13px">₹99</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Transaction reference</td><td style="padding:10px 13px;font-size:13px">${reference}</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Status</td><td style="padding:10px 13px;font-size:13px">Pending verification</td></tr>
      </table>
      <p style="margin:0;font-size:13px;line-height:1.65;color:#60758c">
        No further payment is required at this stage. We will send a separate confirmation email
        after verification.
      </p>
    `,
    ),
    replyTo: supportEmail,
    subject: `Payment proof received | ${id}`,
    text: `Hello ${registration.fullName}, we received your ₹99 payment proof for AI Workshop registration ${id}. Transaction reference: ${registration.paymentReference || 'submitted'}. Status: pending verification. We will email you after verification.`,
    to: registration.email,
  })

  return true
}

export async function sendWorkshopPaymentConfirmedEmail(
  registration: WorkshopEmailRegistration,
) {
  if (!workshopEmailConfigured()) return false

  const safeName = escapeHTML(registration.fullName)
  const id = registrationID(registration.id)
  const reference = escapeHTML(registration.paymentReference || 'Verified')

  await transport().sendMail({
    from: process.env.SMTP_FROM || `Success Root Technologies <${supportEmail}>`,
    headers: {
      'X-Entity-Ref-ID': id,
    },
    html: shell(
      `Payment has been verified and registration ${id} is confirmed.`,
      `
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6">Dear ${safeName},</p>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#40566c">
        Your ₹99 payment has been verified successfully. Your place in the Generative AI Workshop
        is now confirmed.
      </p>
      <table role="presentation" style="width:100%;border-collapse:collapse;margin:20px 0;background:#f7f9fb;border:1px solid #e1e6eb">
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Registration ID</td><td style="padding:10px 13px;font-weight:700;font-size:13px">${id}</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Transaction reference</td><td style="padding:10px 13px;font-size:13px">${reference}</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Payment status</td><td style="padding:10px 13px;font-size:13px">Paid and verified</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Workshop date</td><td style="padding:10px 13px;font-size:13px">2 August 2026</td></tr>
        <tr><td style="padding:10px 13px;color:#687b8d;font-size:13px">Workshop time</td><td style="padding:10px 13px;font-size:13px">11:00 AM–1:00 PM IST</td></tr>
      </table>
      <p style="margin:0;font-size:13px;line-height:1.65;color:#60758c">
        Workshop access and WhatsApp group information will be shared with your registered contact
        details. Please retain this email for reference.
      </p>
    `,
    ),
    replyTo: supportEmail,
    subject: `Payment confirmed | ${id}`,
    text: `Hello ${registration.fullName}, your ₹99 payment for AI Workshop registration ${id} has been verified. Your registration is confirmed for 2 August 2026, 11:00 AM–1:00 PM IST.`,
    to: registration.email,
  })

  return true
}
