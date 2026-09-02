import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const attempts = new Map<string, number>()

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const last = attempts.get(ip) || 0
  if (now - last < 30_000) return NextResponse.json({ error: 'Please wait before submitting again.' }, { status: 429 })

  const data = await request.json().catch(() => null)
  if (!data || data.website) return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 })
  const clean = (value: unknown, max = 120) => String(value || '').trim().slice(0, max)
  const name = clean(data.name, 80)
  const mobile = clean(data.mobile, 18)
  const email = clean(data.email)
  const status = clean(data.status, 40) || 'Not provided'
  const mode = clean(data.mode, 30) || 'Not specified'
  const batch = clean(data.batch, 30) || 'Not Sure'
  const isAnalytics = data.course === 'Data Analytics'
  const courseName = isAnalytics ? 'Data Analytics' : 'Full Stack'
  const formTitle = `${courseName} Course Enquiry`
  const sourceName = `${courseName} Google Ads landing page`
  if (!name || !/^[0-9+() -]{8,18}$/.test(mobile) || !['Data Analytics', 'Full Stack Development'].includes(clean(data.course, 40))) return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })

  // Persist the lead first. Email is only a notification and must never be the
  // single point of failure for a paid-traffic conversion.
  const payload = await getPayload({ config: configPromise })
  let forms = await payload.find({ collection: 'forms', where: { title: { equals: formTitle } }, limit: 1, overrideAccess: true })
  let form = forms.docs[0]
  if (!form) {
    form = await payload.create({
      collection: 'forms',
      overrideAccess: true,
      data: {
        title: formTitle,
        fields: [
          { blockType: 'text', name: 'name', label: 'Name', required: true },
          { blockType: 'text', name: 'mobile', label: 'Mobile Number', required: true },
          { blockType: 'email', name: 'email', label: 'Email' },
          { blockType: 'text', name: 'status', label: 'Current Status', required: true },
          { blockType: 'text', name: 'mode', label: 'Training Mode', required: true },
          { blockType: 'text', name: 'batch', label: 'Preferred Batch' },
          { blockType: 'text', name: 'source', label: 'Source' },
        ],
        submitButtonLabel: 'Get Fees & Batch Details',
        confirmationType: 'redirect',
        redirect: { url: isAnalytics ? '/thank-you/data-analytics-enquiry/' : '/thank-you/full-stack-enquiry/' },
      },
    })
  }
  await payload.create({
    collection: 'form-submissions',
    overrideAccess: true,
    data: {
      form: form.id,
      submissionData: [
        { field: 'name', value: name }, { field: 'mobile', value: mobile },
        { field: 'email', value: email || 'Not provided' }, { field: 'status', value: status },
        { field: 'mode', value: mode }, { field: 'batch', value: batch || 'Not Sure' },
        { field: 'source', value: sourceName },
      ],
    },
  })

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    const escapeHTML = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] || character)
    const safe = {
      name: escapeHTML(name),
      mobile: escapeHTML(mobile),
      email: escapeHTML(email || 'Not provided'),
      status: escapeHTML(status),
      mode: escapeHTML(mode),
      batch: escapeHTML(batch),
      course: escapeHTML(isAnalytics ? 'Data Analytics' : 'Full Stack Development'),
    }
    const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef3f7;font-family:Arial,Helvetica,sans-serif;color:#172033">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef3f7;padding:32px 12px"><tr><td align="center">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 35px rgba(9,45,73,.12)">
      <tr><td style="background:#092d49;padding:28px 34px">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
          <td><div style="font-size:12px;line-height:1.4;letter-spacing:1.5px;font-weight:700;color:#f3b51b">SUCCESS ROOT TECHNOLOGIES</div><div style="margin-top:8px;font-size:26px;line-height:1.2;font-weight:700;color:#ffffff">New ${courseName} Enquiry</div></td>
          <td align="right" valign="top"><span style="display:inline-block;background:#e8fff7;color:#08735b;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700">NEW LEAD</span></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:32px 34px 12px">
        <div style="font-size:13px;color:#64748b">Prospective student</div>
        <div style="margin-top:5px;font-size:25px;line-height:1.3;font-weight:700;color:#092d49">${safe.name}</div>
        <p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:#526273">A new enquiry was submitted through the ${courseName} Course landing page.</p>
      </td></tr>
      <tr><td style="padding:18px 34px">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dce5eb;border-radius:12px;overflow:hidden">
          <tr><td style="padding:15px 18px;background:#f7fafc;width:38%;font-size:13px;font-weight:700;color:#526273;border-bottom:1px solid #e4ebf0">Mobile number</td><td style="padding:15px 18px;font-size:15px;font-weight:700;border-bottom:1px solid #e4ebf0"><a href="tel:${safe.mobile}" style="color:#075985;text-decoration:none">${safe.mobile}</a></td></tr>
          <tr><td style="padding:15px 18px;background:#f7fafc;font-size:13px;font-weight:700;color:#526273;border-bottom:1px solid #e4ebf0">Email</td><td style="padding:15px 18px;font-size:15px;border-bottom:1px solid #e4ebf0">${email ? `<a href="mailto:${safe.email}" style="color:#075985;text-decoration:none">${safe.email}</a>` : safe.email}</td></tr>
          <tr><td style="padding:15px 18px;background:#f7fafc;font-size:13px;font-weight:700;color:#526273;border-bottom:1px solid #e4ebf0">Current status</td><td style="padding:15px 18px;font-size:15px;border-bottom:1px solid #e4ebf0">${safe.status}</td></tr>
          <tr><td style="padding:15px 18px;background:#f7fafc;font-size:13px;font-weight:700;color:#526273;border-bottom:1px solid #e4ebf0">Training mode</td><td style="padding:15px 18px;font-size:15px;border-bottom:1px solid #e4ebf0">${safe.mode}</td></tr>
          <tr><td style="padding:15px 18px;background:#f7fafc;font-size:13px;font-weight:700;color:#526273;border-bottom:1px solid #e4ebf0">Preferred batch</td><td style="padding:15px 18px;font-size:15px;border-bottom:1px solid #e4ebf0">${safe.batch}</td></tr>
          <tr><td style="padding:15px 18px;background:#f7fafc;font-size:13px;font-weight:700;color:#526273">Course</td><td style="padding:15px 18px;font-size:15px;font-weight:700">${safe.course}</td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:8px 34px 32px">
        <table role="presentation" cellspacing="0" cellpadding="0"><tr>
          <td style="background:#f3b51b;border-radius:8px"><a href="tel:${safe.mobile}" style="display:inline-block;padding:13px 20px;color:#092d49;font-size:14px;font-weight:700;text-decoration:none">Call Student</a></td>
          <td width="10"></td>
          <td style="background:#e9f7ef;border-radius:8px"><a href="https://wa.me/${safe.mobile.replace(/\D/g, '')}" style="display:inline-block;padding:13px 20px;color:#08735b;font-size:14px;font-weight:700;text-decoration:none">Open WhatsApp</a></td>
        </tr></table>
      </td></tr>
      <tr><td style="background:#f7fafc;border-top:1px solid #e4ebf0;padding:18px 34px;font-size:12px;line-height:1.6;color:#718096">Source: ${sourceName}<br>Success Root Technologies · West Mambalam, Chennai</td></tr>
    </table>
  </td></tr></table>
</body></html>`
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 465), secure: String(process.env.SMTP_SECURE || 'true') === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } })
    void transporter.sendMail({
      from: process.env.SMTP_FROM || `Success Root Technologies <${process.env.SMTP_USER}>`,
      to: process.env.WORKSHOP_ADMIN_EMAIL || process.env.SMTP_USER,
      replyTo: email || undefined,
      subject: `${courseName} Course Enquiry – ${name}`,
      text: `New ${courseName} course enquiry\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email || 'Not provided'}\nCurrent status: ${status}\nTraining mode: ${mode}\nPreferred batch: ${batch}\nCourse: ${isAnalytics ? 'Data Analytics' : 'Full Stack Development'}\nSource: ${sourceName}`,
      html,
    }).catch((error) => console.error('Full Stack enquiry email notification failed:', error))
  }
  attempts.set(ip, now)
  return NextResponse.json({ success: true })
}
