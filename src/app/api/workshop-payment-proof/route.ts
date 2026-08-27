import configPromise from '@payload-config'
import { randomUUID, timingSafeEqual } from 'crypto'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { getPayload } from 'payload'

import { sendWorkshopPaymentProofReceivedEmail } from '@/utilities/workshopEmail'

export const runtime = 'nodejs'

const attempts = new Map<string, { count: number; resetAt: number }>()
const allowedTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
])

const clean = (value: FormDataEntryValue | null, maxLength: number) =>
  typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, maxLength) : ''

const tokensMatch = (stored: string, supplied: string) => {
  const storedBuffer = Buffer.from(stored)
  const suppliedBuffer = Buffer.from(supplied)
  return storedBuffer.length === suppliedBuffer.length && timingSafeEqual(storedBuffer, suppliedBuffer)
}

export async function POST(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const clientIP = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const existingAttempt = attempts.get(clientIP)

  if (existingAttempt && existingAttempt.resetAt > now && existingAttempt.count >= 5) {
    return Response.json(
      { message: 'Too many upload attempts. Please wait a few minutes and try again.' },
      { status: 429 },
    )
  }

  attempts.set(clientIP, {
    count: existingAttempt && existingAttempt.resetAt > now ? existingAttempt.count + 1 : 1,
    resetAt: existingAttempt && existingAttempt.resetAt > now ? existingAttempt.resetAt : now + 600_000,
  })

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return Response.json({ message: 'Invalid payment proof submission.' }, { status: 400 })
  }

  const registrationID = clean(formData.get('registrationId'), 30)
  const uploadToken = clean(formData.get('uploadToken'), 100)
  const paymentReference = clean(formData.get('paymentReference'), 100)
  const proof = formData.get('proof')
  const match = /^SRT-AI-(\d+)$/.exec(registrationID)

  if (!match || uploadToken.length < 32 || paymentReference.length < 6 || !(proof instanceof File)) {
    return Response.json(
      { message: 'Please provide a valid UPI reference and payment screenshot.' },
      { status: 400 },
    )
  }

  const extension = allowedTypes.get(proof.type)
  if (!extension || proof.size < 500 || proof.size > 5_000_000) {
    return Response.json(
      { message: 'Upload a JPG, PNG or WebP screenshot smaller than 5 MB.' },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config: configPromise })
  const registration = await payload
    .findByID({
      collection: 'workshop-registrations',
      id: Number(match[1]),
      depth: 0,
      overrideAccess: true,
    })
    .catch(() => null)

  if (
    !registration ||
    !registration.paymentUploadToken ||
    !tokensMatch(registration.paymentUploadToken, uploadToken)
  ) {
    return Response.json({ message: 'This payment upload link is invalid.' }, { status: 403 })
  }

  if (registration.paymentStatus === 'paid') {
    return Response.json({ message: 'This registration is already marked as paid.' }, { status: 409 })
  }

  const tempDirectory = path.join(tmpdir(), 'srt-payment-proofs')
  const tempFile = path.join(tempDirectory, `${randomUUID()}.${extension}`)

  try {
    await mkdir(tempDirectory, { recursive: true })
    await writeFile(tempFile, Buffer.from(await proof.arrayBuffer()))
    const paymentProof = await payload.create({
      collection: 'payment-proofs',
      overrideAccess: true,
      data: {
        alt: `Payment proof for ${registration.fullName} (${registrationID})`,
        paymentReference,
        registration: registration.id,
      },
      filePath: tempFile,
    })

    const updatedRegistration = await payload.update({
      collection: 'workshop-registrations',
      id: registration.id,
      overrideAccess: true,
      data: {
        paymentProof: paymentProof.id,
        paymentReference,
        paymentStatus: 'pending-verification',
        paymentSubmittedAt: new Date().toISOString(),
      },
    })
    try {
      const delivered = await sendWorkshopPaymentProofReceivedEmail(updatedRegistration)
      if (delivered) {
        await payload.update({
          collection: 'workshop-registrations',
          id: registration.id,
          overrideAccess: true,
          data: {
            paymentProofEmailSentAt: new Date().toISOString(),
          },
        })
      }
    } catch (error) {
      payload.logger.error({
        err: error,
        message: `Unable to send payment proof email for registration ${registration.id}.`,
      })
    }
  } finally {
    await unlink(tempFile).catch(() => undefined)
  }

  return Response.json({
    success: true,
    registrationId: registrationID,
    message: 'Payment proof submitted for verification.',
  })
}
