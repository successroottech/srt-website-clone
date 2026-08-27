import configPromise from '@payload-config'
import { getPayload } from 'payload'

import {
  sendWorkshopPaymentReminder,
  workshopEmailConfigured,
} from '@/utilities/workshopEmail'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authorization = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authorization !== `Bearer ${cronSecret}`) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (!workshopEmailConfigured()) {
    return Response.json({ message: 'SMTP email is not configured.' }, { status: 503 })
  }

  const workshopEnd = new Date('2026-08-02T13:00:00+05:30').getTime()
  if (Date.now() >= workshopEnd) {
    return Response.json({
      message: 'The workshop has ended. Payment reminders are no longer sent.',
      success: true,
    })
  }

  const payload = await getPayload({ config: configPromise })
  const registrations = await payload.find({
    collection: 'workshop-registrations',
    depth: 0,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
    where: {
      paymentStatus: {
        in: ['not-submitted', 'rejected'],
      },
    },
  })
  const now = Date.now()
  const dailyWindow = 20 * 60 * 60 * 1000
  let sent = 0
  let skipped = 0
  let failed = 0

  for (const registration of registrations.docs) {
    const lastSent = registration.paymentReminderLastSentAt
      ? new Date(registration.paymentReminderLastSentAt).getTime()
      : 0

    if (
      registration.paymentRemindersEnabled === false ||
      !registration.paymentUploadToken ||
      now - lastSent < dailyWindow
    ) {
      skipped += 1
      continue
    }

    try {
      const delivered = await sendWorkshopPaymentReminder(registration)
      if (!delivered) {
        failed += 1
        continue
      }

      await payload.update({
        collection: 'workshop-registrations',
        id: registration.id,
        data: {
          paymentReminderCount: (registration.paymentReminderCount || 0) + 1,
          paymentReminderLastSentAt: new Date().toISOString(),
        },
        overrideAccess: true,
      })
      sent += 1
    } catch (error) {
      payload.logger.error({
        err: error,
        message: `Unable to send workshop payment reminder for registration ${registration.id}.`,
      })
      failed += 1
    }
  }

  return Response.json({ failed, sent, skipped, success: true })
}
