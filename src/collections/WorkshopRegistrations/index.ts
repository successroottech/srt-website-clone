import type { CollectionConfig } from 'payload'
import { randomBytes } from 'crypto'

import { authenticated } from '@/access/authenticated'
import { sendWorkshopPaymentConfirmedEmail } from '@/utilities/workshopEmail'

const csvValue = (value: unknown) => {
  if (value === null || value === undefined) return ''

  let text = String(value)
  if (/^[=+\-@]/.test(text)) text = `'${text}`

  return `"${text.replace(/"/g, '""')}"`
}

export const WorkshopRegistrations: CollectionConfig = {
  slug: 'workshop-registrations',
  labels: {
    singular: 'Workshop Registration',
    plural: 'Workshop Registrations',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    group: 'Leads',
    useAsTitle: 'fullName',
    defaultColumns: [
      'fullName',
      'mobileNumber',
      'whatsappNumber',
      'certificateLink',
      'email',
      'discoverySource',
      'whatsappStatus',
      'paymentProof',
      'paymentStatus',
      'registeredDateTime',
      'deleteRegistration',
    ],
    description:
      'Open Edit to update candidate details, review the payment screenshot, verify the transaction, and update payment or WhatsApp status.',
    components: {
      beforeListTable: ['@/components/WorkshopExportButton'],
    },
  },
  endpoints: [
    {
      path: '/counts',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { message: 'Please log in to view workshop registration counts.' },
            { status: 403 },
          )
        }

        const statuses = [
          'pending-verification',
          'paid',
          'not-submitted',
          'rejected',
          'refunded',
        ] as const
        const [all, ...statusCounts] = await Promise.all([
          req.payload.count({
            collection: 'workshop-registrations',
            overrideAccess: false,
            req,
          }),
          ...statuses.map((status) =>
            req.payload.count({
              collection: 'workshop-registrations',
              overrideAccess: false,
              req,
              where: {
                paymentStatus: {
                  equals: status,
                },
              },
            }),
          ),
        ])

        return Response.json({
          counts: {
            all: all.totalDocs,
            ...Object.fromEntries(
              statuses.map((status, index) => [status, statusCounts[index]?.totalDocs ?? 0]),
            ),
          },
        })
      },
    },
    {
      path: '/export',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ message: 'Please log in to export workshop registrations.' }, { status: 403 })
        }

        const registrations = await req.payload.find({
          collection: 'workshop-registrations',
          depth: 0,
          limit: 10000,
          overrideAccess: false,
          req,
          sort: '-createdAt',
        })
        const headers = [
          'Registration ID',
          'Full name',
          'Mobile number',
          'WhatsApp number',
          'Email',
          'City',
          'Current status',
          'How they heard about us',
          'Source details',
          'WhatsApp status',
          'Payment status',
          'Payment amount',
          'UPI reference',
          'Payment submitted at',
          'Payment reminders enabled',
          'Certificate link',
          'Lead status',
          'Consent to contact',
          'Source',
          'Contacted at',
          'Notes',
          'Created at',
          'Updated at',
        ]
        const rows = registrations.docs.map((registration) => [
          `SRT-AI-${String(registration.id).padStart(5, '0')}`,
          registration.fullName,
          registration.mobileNumber,
          registration.whatsappNumber,
          registration.email,
          registration.city,
          registration.currentStatus,
          registration.discoverySource,
          registration.sourceDetails,
          registration.whatsappStatus,
          registration.paymentStatus,
          registration.paymentAmount,
          registration.paymentReference,
          registration.paymentSubmittedAt,
          registration.paymentRemindersEnabled ? 'Yes' : 'No',
          registration.certificateShareToken
            ? `https://srtv1.successroottech.com/certificate/${registration.certificateShareToken}/`
            : '',
          registration.leadStatus,
          registration.consentToContact ? 'Yes' : 'No',
          registration.source,
          registration.contactedAt,
          registration.notes,
          registration.createdAt,
          registration.updatedAt,
        ])
        const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(csvValue).join(',')).join('\r\n')}`
        const date = new Date().toISOString().slice(0, 10)

        return new Response(csv, {
          headers: {
            'Cache-Control': 'private, no-store',
            'Content-Disposition': `attachment; filename="srt-ai-workshop-enrollments-${date}.csv"`,
            'Content-Type': 'text/csv; charset=utf-8',
          },
        })
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        if (data.certificateImage === null) {
          data.certificateShareToken = null
          data.certificateIssuedAt = null
          return data
        }

        const certificateImage = data.certificateImage ?? originalDoc?.certificateImage
        const existingToken = data.certificateShareToken ?? originalDoc?.certificateShareToken
        const issuedAt = data.certificateIssuedAt ?? originalDoc?.certificateIssuedAt

        if (certificateImage && !existingToken) {
          data.certificateShareToken = randomBytes(24).toString('hex')
        }
        if (certificateImage && !issuedAt) {
          data.certificateIssuedAt = new Date().toISOString()
        }

        return data
      },
    ],
    afterChange: [
      async ({ context, doc, previousDoc, req }) => {
        if (
          context.skipPaymentConfirmationEmail ||
          doc.paymentStatus !== 'paid' ||
          previousDoc?.paymentStatus === 'paid' ||
          doc.paymentConfirmationEmailSentAt
        ) {
          return doc
        }

        try {
          const delivered = await sendWorkshopPaymentConfirmedEmail(doc)
          if (delivered) {
            await req.payload.update({
              collection: 'workshop-registrations',
              id: doc.id,
              context: {
                skipPaymentConfirmationEmail: true,
              },
              data: {
                paymentConfirmationEmailSentAt: new Date().toISOString(),
              },
              overrideAccess: true,
              req,
            })
          }
        } catch (error) {
          req.payload.logger.error({
            err: error,
            message: `Unable to send payment confirmation email for registration ${doc.id}.`,
          })
        }

        return doc
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const proofs = await req.payload.find({
          collection: 'payment-proofs',
          depth: 0,
          limit: 100,
          overrideAccess: true,
          req,
          where: {
            registration: {
              equals: id,
            },
          },
        })

        for (const proof of proofs.docs) {
          await req.payload.delete({
            collection: 'payment-proofs',
            id: proof.id,
            overrideAccess: true,
            req,
          })
        }
      },
    ],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'mobileNumber',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'whatsappNumber',
      label: 'WhatsApp number',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'currentStatus',
      type: 'select',
      required: true,
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Fresher', value: 'fresher' },
        { label: 'Working professional', value: 'working-professional' },
        { label: 'Career break', value: 'career-break' },
        { label: 'Business owner', value: 'business-owner' },
        { label: 'Trainer', value: 'trainer' },
      ],
    },
    {
      name: 'discoverySource',
      label: 'Source',
      type: 'select',
      required: true,
      defaultValue: 'not-provided',
      index: true,
      options: [
        { label: 'Google Search', value: 'google-search' },
        { label: 'Google Maps / Reviews', value: 'google-maps' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Friend / Referral', value: 'friend-referral' },
        { label: 'Existing student', value: 'existing-student' },
        { label: 'Other', value: 'other' },
        { label: 'Not provided (legacy)', value: 'not-provided' },
      ],
    },
    {
      name: 'whatsappStatus',
      label: 'WhatsApp status',
      type: 'select',
      required: true,
      defaultValue: 'not-sent',
      index: true,
      options: [
        { label: 'Not sent', value: 'not-sent' },
        { label: 'Sent', value: 'sent' },
        { label: 'Joined group', value: 'joined' },
      ],
      admin: {
        description: 'Track whether the WhatsApp joining message was sent.',
        position: 'sidebar',
      },
    },
    {
      name: 'sourceDetails',
      label: 'Source details',
      type: 'text',
      maxLength: 200,
      admin: {
        description: 'Referral name or any additional source information entered by the candidate.',
      },
    },
    {
      name: 'leadStatus',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Attended', value: 'attended' },
        { label: 'Not interested', value: 'not-interested' },
        { label: 'Duplicate', value: 'duplicate' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'paymentStatus',
      label: 'Payment status',
      type: 'select',
      required: true,
      defaultValue: 'not-submitted',
      index: true,
      options: [
        { label: 'Not paid', value: 'not-submitted' },
        { label: 'Pending verification', value: 'pending-verification' },
        { label: 'Paid', value: 'paid' },
        { label: 'Not paid / rejected', value: 'rejected' },
        { label: 'Refunded', value: 'refunded' },
      ],
      admin: {
        components: {
          Cell: '@/components/WorkshopPaymentStatusCell',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'paymentAmount',
      label: 'Payment amount (INR)',
      type: 'number',
      required: true,
      defaultValue: 99,
      min: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'paymentReference',
      label: 'UPI transaction / reference number',
      type: 'text',
      index: true,
    },
    {
      name: 'paymentProof',
      label: 'Payment screenshot',
      type: 'relationship',
      relationTo: 'payment-proofs',
      admin: {
        components: {
          Cell: '@/components/WorkshopPaymentProofCell',
        },
        description: 'Open the private payment screenshot and verify it before marking Paid.',
      },
    },
    {
      name: 'paymentSubmittedAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'paymentVerifiedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'paymentUploadToken',
      type: 'text',
      access: {
        read: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: 'registrationEmailSentAt',
      label: 'Registration email sent at',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'paymentReminderLastSentAt',
      label: 'Payment reminder last sent at',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'paymentProofEmailSentAt',
      label: 'Payment proof email sent at',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'paymentConfirmationEmailSentAt',
      label: 'Payment confirmation email sent at',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'paymentReminderCount',
      label: 'Payment reminder count',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'paymentRemindersEnabled',
      label: 'Send payment reminders',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      admin: {
        description: 'Turn this off if the candidate asks to stop reminder emails.',
        position: 'sidebar',
      },
    },
    {
      name: 'consentToContact',
      type: 'checkbox',
      required: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'AI Workshop website form',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'contactedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      maxLength: 5000,
      admin: {
        description: 'Internal follow-up notes. This is never shown publicly.',
        rows: 7,
      },
    },
    {
      name: 'certificateImage',
      label: 'Candidate certificate image',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'certificateIssuedAt',
      label: 'Certificate issued at',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'dd MMM yyyy, h:mm a',
        },
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'certificateShareToken',
      type: 'text',
      unique: true,
      index: true,
      access: {
        read: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: 'certificateLink',
      label: 'Certificate',
      type: 'ui',
      admin: {
        components: {
          Cell: '@/components/WorkshopCertificateCell',
        },
      },
    },
    {
      name: 'registeredDateTime',
      label: 'Registered date & time',
      type: 'ui',
      admin: {
        components: {
          Cell: '@/components/WorkshopRegisteredDateTimeCell',
        },
      },
    },
    {
      name: 'deleteRegistration',
      label: 'Actions',
      type: 'ui',
      admin: {
        components: {
          Cell: '@/components/WorkshopDeleteRegistrationCell',
        },
      },
    },
  ],
  timestamps: true,
}
