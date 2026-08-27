import configPromise from '@payload-config'
import { randomUUID } from 'crypto'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { getPayload } from 'payload'

export const runtime = 'nodejs'

const allowedTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
])

export async function POST(request: Request) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: request.headers })

  if (!user) {
    return Response.json({ message: 'Please log in as an administrator.' }, { status: 403 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return Response.json({ message: 'Invalid certificate upload.' }, { status: 400 })
  }

  const certificate = formData.get('certificate')
  const registrationID = Number(formData.get('registrationId'))

  if (!Number.isInteger(registrationID) || registrationID < 1 || !(certificate instanceof File)) {
    return Response.json({ message: 'Select a valid candidate and certificate image.' }, { status: 400 })
  }

  const extension = allowedTypes.get(certificate.type)
  if (!extension || certificate.size < 1_000 || certificate.size > 10_000_000) {
    return Response.json(
      { message: 'Upload a JPG, PNG or WebP certificate image smaller than 10 MB.' },
      { status: 400 },
    )
  }

  const registration = await payload
    .findByID({
      collection: 'workshop-registrations',
      id: registrationID,
      depth: 0,
      overrideAccess: true,
    })
    .catch(() => null)

  if (!registration) {
    return Response.json({ message: 'Candidate registration was not found.' }, { status: 404 })
  }

  const tempDirectory = path.join(tmpdir(), 'srt-certificate-uploads')
  const tempFile = path.join(tempDirectory, `${randomUUID()}.${extension}`)

  try {
    await mkdir(tempDirectory, { recursive: true })
    await writeFile(tempFile, Buffer.from(await certificate.arrayBuffer()))

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: `AI Workshop certificate for ${registration.fullName}`,
      },
      filePath: tempFile,
      overrideAccess: true,
    })
    const updatedRegistration = await payload.update({
      collection: 'workshop-registrations',
      id: registration.id,
      data: {
        certificateImage: media.id,
        certificateIssuedAt: new Date().toISOString(),
      },
      overrideAccess: true,
    })

    if (!updatedRegistration.certificateShareToken) {
      throw new Error('Certificate sharing token was not generated.')
    }

    return Response.json({
      certificateToken: updatedRegistration.certificateShareToken,
      certificateURL: `/certificate/${updatedRegistration.certificateShareToken}/`,
      success: true,
    })
  } finally {
    await unlink(tempFile).catch(() => undefined)
  }
}
