import configPromise from '@payload-config'
import { getPayload } from 'payload'

const interests = new Set([
  'ready-to-join',
  'counsellor-call',
  'installment-plan',
  'considering',
  'not-now',
])
const contactMethods = new Set(['whatsapp', 'phone-call', 'email'])
const attempts = new Map<string, { count: number; resetAt: number }>()

const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, maxLength) : ''

const mobileIdentity = (value: string) => {
  const digits = value.replace(/\D/g, '').replace(/^0+/, '')
  return digits.length > 10 ? digits.slice(-10) : digits
}

const rating = (value: unknown) => {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 5 ? parsed : 0
}

export async function POST(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const clientIP = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const attempt = attempts.get(clientIP)

  if (attempt && attempt.resetAt > now && attempt.count >= 5) {
    return Response.json(
      { message: 'Too many attempts. Please wait a few minutes and try again.' },
      { status: 429 },
    )
  }

  attempts.set(clientIP, {
    count: attempt && attempt.resetAt > now ? attempt.count + 1 : 1,
    resetAt: attempt && attempt.resetAt > now ? attempt.resetAt : now + 600_000,
  })

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ message: 'Invalid feedback submission.' }, { status: 400 })
  }

  const fullName = clean(body.fullName, 120)
  const mobileNumber = mobileIdentity(clean(body.mobileNumber, 20))
  const email = clean(body.email, 180).toLowerCase()
  const overallRating = rating(body.overallRating)
  const contentRating = rating(body.contentRating)
  const trainerRating = rating(body.trainerRating)
  const usefulnessRating = rating(body.usefulnessRating)
  const mostUseful = clean(body.mostUseful, 1500)
  const improvements = clean(body.improvements, 1500)
  const testimonial = clean(body.testimonial, 2000)
  const joinInterest = clean(body.joinInterest, 40)
  const preferredContact = clean(body.preferredContact, 30)
  const consentToContact = body.consentToContact === true
  const allowTestimonialUse = body.allowTestimonialUse === true
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (
    fullName.length < 2 ||
    !/^\d{10}$/.test(mobileNumber) ||
    !emailValid ||
    !overallRating ||
    !contentRating ||
    !trainerRating ||
    !usefulnessRating ||
    !interests.has(joinInterest) ||
    !contactMethods.has(preferredContact) ||
    !consentToContact
  ) {
    return Response.json(
      { message: 'Please complete all required fields with valid information.' },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config: configPromise })
  const registrations = await payload.find({
    collection: 'workshop-registrations',
    depth: 0,
    limit: 10000,
    overrideAccess: true,
    pagination: false,
    select: {
      mobileNumber: true,
    },
  })
  const registration = registrations.docs.find(
    (entry) => mobileIdentity(entry.mobileNumber) === mobileNumber,
  )

  if (!registration) {
    return Response.json(
      {
        message:
          'We could not find a workshop registration for this mobile number. Please use the same number used during registration or contact +91 89390 69135.',
      },
      { status: 404 },
    )
  }

  const existing = await payload.find({
    collection: 'workshop-feedbacks',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      mobileNumber: {
        equals: mobileNumber,
      },
    },
  })

  if (existing.totalDocs > 0) {
    return Response.json(
      { message: 'Feedback has already been submitted for this mobile number. Thank you.' },
      { status: 409 },
    )
  }

  const feedback = await payload.create({
    collection: 'workshop-feedbacks',
    overrideAccess: true,
    data: {
      allowTestimonialUse,
      consentToContact,
      contentRating,
      email,
      followUpStatus: 'new',
      fullName,
      improvements,
      joinInterest: joinInterest as
        | 'ready-to-join'
        | 'counsellor-call'
        | 'installment-plan'
        | 'considering'
        | 'not-now',
      mobileNumber,
      mostUseful,
      overallRating,
      preferredContact: preferredContact as 'whatsapp' | 'phone-call' | 'email',
      source: 'Post-workshop feedback page',
      testimonial,
      trainerRating,
      usefulnessRating,
      workshopRegistrationId: `SRT-AI-${String(registration.id).padStart(5, '0')}`,
    },
  })

  return Response.json({ feedbackId: feedback.id, success: true }, { status: 201 })
}
