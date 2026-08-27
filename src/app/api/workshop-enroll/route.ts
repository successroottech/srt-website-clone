import configPromise from '@payload-config'
import { randomBytes } from 'crypto'
import { getPayload } from 'payload'

import { sendWorkshopRegistrationEmail } from '@/utilities/workshopEmail'

const workshopStatuses = [
  'student',
  'fresher',
  'working-professional',
  'career-break',
  'business-owner',
  'trainer',
] as const

type WorkshopStatus = (typeof workshopStatuses)[number]

const statuses = new Set<string>(workshopStatuses)
const discoverySources = [
  'google-search',
  'google-maps',
  'instagram',
  'facebook',
  'linkedin',
  'youtube',
  'whatsapp',
  'friend-referral',
  'existing-student',
  'other',
] as const

type DiscoverySource = (typeof discoverySources)[number]

const sources = new Set<string>(discoverySources)

const attempts = new Map<string, { count: number; resetAt: number }>()

const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, maxLength) : ''

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, '')

const mobileIdentity = (value: string) => {
  const digits = value.replace(/\D/g, '').replace(/^0+/, '')
  return digits.length > 10 ? digits.slice(-10) : digits
}

export async function POST(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const clientIP = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const existingAttempt = attempts.get(clientIP)

  if (existingAttempt && existingAttempt.resetAt > now && existingAttempt.count >= 5) {
    return Response.json(
      { message: 'Too many submissions. Please wait a few minutes and try again.' },
      { status: 429 },
    )
  }

  attempts.set(clientIP, {
    count: existingAttempt && existingAttempt.resetAt > now ? existingAttempt.count + 1 : 1,
    resetAt: existingAttempt && existingAttempt.resetAt > now ? existingAttempt.resetAt : now + 600_000,
  })

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ message: 'Invalid form submission.' }, { status: 400 })
  }

  if (clean(body.companyWebsite, 200)) {
    return Response.json({ success: true, registrationId: 'received' })
  }

  const fullName = clean(body.fullName, 120)
  const mobileNumber = normalizePhone(clean(body.mobileNumber, 20))
  const whatsappNumber = normalizePhone(clean(body.whatsappNumber, 20))
  const email = clean(body.email, 180).toLowerCase()
  const city = clean(body.city, 100)
  const currentStatus = clean(body.currentStatus, 40)
  const discoverySource = clean(body.discoverySource, 40)
  const sourceDetails = clean(body.sourceDetails, 200)
  const consentToContact = body.consentToContact === true
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const phoneValid = (phone: string) => /^\+?\d{10,15}$/.test(phone)

  if (
    fullName.length < 2 ||
    !phoneValid(mobileNumber) ||
    !phoneValid(whatsappNumber) ||
    !emailValid ||
    city.length < 2 ||
    !statuses.has(currentStatus) ||
    !sources.has(discoverySource) ||
    !consentToContact
  ) {
    return Response.json(
      { message: 'Please complete all required fields with valid information.' },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config: configPromise })
  const normalizedMobile = mobileIdentity(mobileNumber)
  const existingRegistrations = await payload.find({
    collection: 'workshop-registrations',
    depth: 0,
    limit: 10000,
    overrideAccess: true,
    pagination: false,
    select: {
      mobileNumber: true,
    },
  })
  const alreadyRegistered = existingRegistrations.docs.some(
    (registration) => mobileIdentity(registration.mobileNumber) === normalizedMobile,
  )

  if (alreadyRegistered) {
    return Response.json(
      {
        message:
          'This mobile number is already registered for the AI Workshop. Please contact us on WhatsApp at +91 89390 69135 if you need help.',
      },
      { status: 409 },
    )
  }

  const validatedStatus = currentStatus as WorkshopStatus
  const validatedSource = discoverySource as DiscoverySource
  const paymentUploadToken = randomBytes(32).toString('hex')
  const registration = await payload.create({
    collection: 'workshop-registrations',
    overrideAccess: true,
    data: {
      city,
      consentToContact,
      currentStatus: validatedStatus,
      discoverySource: validatedSource,
      email,
      fullName,
      leadStatus: 'new',
      mobileNumber,
      paymentAmount: 99,
      paymentRemindersEnabled: true,
      paymentStatus: 'not-submitted',
      paymentUploadToken,
      source: 'AI Workshop website form',
      sourceDetails,
      whatsappStatus: 'not-sent',
      whatsappNumber,
    },
  })
  try {
    const delivered = await sendWorkshopRegistrationEmail(registration)
    if (delivered) {
      await payload.update({
        collection: 'workshop-registrations',
        id: registration.id,
        data: {
          registrationEmailSentAt: new Date().toISOString(),
        },
        overrideAccess: true,
      })
    }
  } catch (error) {
    payload.logger.error({
      err: error,
      message: `Unable to send registration email for workshop registration ${registration.id}.`,
    })
  }

  return Response.json(
    {
      success: true,
      registrationId: `SRT-AI-${String(registration.id).padStart(5, '0')}`,
      uploadToken: paymentUploadToken,
    },
    { status: 201 },
  )
}
