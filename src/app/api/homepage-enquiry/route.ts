import configPromise from '@payload-config'
import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

const attempts = new Map<string, number>()
const allowedInterests = ['Course Training', 'Job / Placement Support']
const allowedCourses = ['Full Stack Development', 'Data Analytics', 'Python', 'Java', 'Power BI', 'AI & Machine Learning', 'Other']
const allowedJobRoles = ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Software Developer', 'Data Analyst', 'Power BI Developer', 'Python Developer', 'Java Developer', 'QA / Software Tester', 'Cloud / DevOps', 'IT Support', 'Other IT Role', 'Non-IT / Other']

const clean = (value: unknown, max = 120) => String(value || '').trim().slice(0, max)
const escapeHTML = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] || character)

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  if (now - (attempts.get(ip) || 0) < 30_000) return NextResponse.json({ error: 'Please wait before submitting again.' }, { status: 429 })
  const data = await request.json().catch(() => null)
  if (!data || data.website) return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 })

  const name = clean(data.name, 80)
  const mobile = clean(data.mobile, 18)
  const interest = clean(data.interest, 40)
  const course = clean(data.course, 50)
  const validSelection = interest === 'Course Training' ? allowedCourses.includes(course) : allowedJobRoles.includes(course)
  if (!name || !/^[0-9+() -]{8,18}$/.test(mobile) || !allowedInterests.includes(interest) || !validSelection) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const formTitle = 'Homepage Course & Job Enquiry'
  const result = await payload.find({ collection: 'forms', where: { title: { equals: formTitle } }, limit: 1, overrideAccess: true })
  let form = result.docs[0]
  if (!form) {
    form = await payload.create({
      collection: 'forms', overrideAccess: true,
      data: {
        title: formTitle,
        fields: [
          { blockType: 'text', name: 'name', label: 'Name', required: true },
          { blockType: 'text', name: 'mobile', label: 'Mobile Number', required: true },
          { blockType: 'text', name: 'interest', label: 'Looking For', required: true },
          { blockType: 'text', name: 'course', label: 'Course / Role', required: true },
          { blockType: 'text', name: 'source', label: 'Source' },
        ],
        submitButtonLabel: 'Get Details', confirmationType: 'message', confirmationMessage: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Thank you. Our advisor will contact you shortly.', version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
      },
    })
  }
  await payload.create({
    collection: 'form-submissions', overrideAccess: true,
    data: { form: form.id, submissionData: [{ field: 'name', value: name }, { field: 'mobile', value: mobile }, { field: 'interest', value: interest }, { field: 'course', value: course }, { field: 'source', value: 'Homepage first-click popup' }] },
  })

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    const safe = { name: escapeHTML(name), mobile: escapeHTML(mobile), interest: escapeHTML(interest), course: escapeHTML(course) }
    const html = `<!doctype html><html><body style="margin:0;background:#eef3f7;font-family:Arial,sans-serif;color:#172033"><table width="100%" cellspacing="0" cellpadding="0" style="padding:30px 12px"><tr><td align="center"><table width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 35px rgba(9,45,73,.12)"><tr><td style="background:#092d49;padding:28px 34px;color:#fff"><div style="font-size:12px;letter-spacing:1.5px;font-weight:700;color:#f3b51b">SUCCESS ROOT TECHNOLOGIES</div><div style="margin-top:8px;font-size:26px;font-weight:700">New Homepage Enquiry</div></td></tr><tr><td style="padding:30px 34px 16px"><div style="font-size:24px;font-weight:700;color:#092d49">${safe.name}</div><p style="color:#64748b">A new course or placement enquiry was submitted from the homepage.</p></td></tr><tr><td style="padding:0 34px 24px"><table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dce5eb;border-radius:12px;overflow:hidden"><tr><td style="padding:14px;background:#f7fafc;font-weight:700">Mobile</td><td style="padding:14px"><a href="tel:${safe.mobile}">${safe.mobile}</a></td></tr><tr><td style="padding:14px;background:#f7fafc;font-weight:700">Looking for</td><td style="padding:14px">${safe.interest}</td></tr><tr><td style="padding:14px;background:#f7fafc;font-weight:700">Course / Role</td><td style="padding:14px">${safe.course}</td></tr></table></td></tr><tr><td style="padding:0 34px 32px"><a href="tel:${safe.mobile}" style="display:inline-block;padding:13px 20px;background:#f3b51b;border-radius:8px;color:#092d49;font-weight:700;text-decoration:none">Call Lead</a>&nbsp;&nbsp;<a href="https://wa.me/${safe.mobile.replace(/\D/g, '')}" style="display:inline-block;padding:13px 20px;background:#e9f7ef;border-radius:8px;color:#08735b;font-weight:700;text-decoration:none">Open WhatsApp</a></td></tr></table></td></tr></table></body></html>`
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 465), secure: String(process.env.SMTP_SECURE || 'true') === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } })
    await transporter.sendMail({ from: process.env.SMTP_FROM || `Success Root Technologies <${process.env.SMTP_USER}>`, to: process.env.HOMEPAGE_LEAD_EMAIL || 'successroottech@gmail.com', subject: `Homepage ${interest} Enquiry – ${name}`, text: `Name: ${name}\nMobile: ${mobile}\nLooking for: ${interest}\nCourse / Role: ${course}\nSource: Homepage first-click popup`, html }).catch((error) => console.error('Homepage enquiry email failed:', error))
  }
  attempts.set(ip, now)
  return NextResponse.json({ success: true })
}
