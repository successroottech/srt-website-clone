import configPromise from '@payload-config'
import { getPayload } from 'payload'

const attempts = new Map<string, { count: number; resetAt: number }>()

const lastTenDigits = (value: string) => {
  const digits = value.replace(/\D/g, '').replace(/^0+/, '')
  return digits.length > 10 ? digits.slice(-10) : digits
}

export async function POST(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const clientIP = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const attempt = attempts.get(clientIP)

  if (attempt && attempt.resetAt > now && attempt.count >= 10) {
    return Response.json(
      { message: 'Too many attempts. Please wait 15 minutes and try again.' },
      { status: 429 },
    )
  }

  attempts.set(clientIP, {
    count: attempt && attempt.resetAt > now ? attempt.count + 1 : 1,
    resetAt: attempt && attempt.resetAt > now ? attempt.resetAt : now + 900_000,
  })

  let mobileNumber = ''
  try {
    const body = (await request.json()) as { mobileNumber?: unknown }
    mobileNumber = typeof body.mobileNumber === 'string' ? body.mobileNumber.trim() : ''
  } catch {
    return Response.json({ message: 'Enter a valid 10-digit mobile number.' }, { status: 400 })
  }

  if (!/^\d{10}$/.test(mobileNumber)) {
    return Response.json({ message: 'Enter exactly 10 digits without +91 or spaces.' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const registrations = await payload.find({
    collection: 'workshop-registrations',
    depth: 0,
    limit: 10000,
    overrideAccess: true,
    pagination: false,
    select: {
      certificateImage: true,
      certificateShareToken: true,
      mobileNumber: true,
      whatsappNumber: true,
    },
  })
  const registration = registrations.docs.find(
    (entry) =>
      lastTenDigits(entry.mobileNumber) === mobileNumber ||
      lastTenDigits(entry.whatsappNumber) === mobileNumber,
  )

  if (!registration?.certificateImage || !registration.certificateShareToken) {
    return Response.json(
      {
        message:
          'Certificate is not available for this number yet. Confirm the number or contact SRT support at +91 89390 69135.',
      },
      { status: 404 },
    )
  }

  return Response.json({
    certificateURL: `/certificate/${registration.certificateShareToken}/`,
    success: true,
  })
}
