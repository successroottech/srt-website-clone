import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const WorkshopFeedbacks: CollectionConfig = {
  slug: 'workshop-feedbacks',
  labels: {
    singular: 'Workshop Feedback',
    plural: 'Workshop Feedback',
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
      'overallRating',
      'joinInterest',
      'preferredContact',
      'followUpStatus',
      'createdAt',
    ],
    description:
      'Review workshop ratings, testimonials and interest in the Advanced Generative AI Career Program.',
    components: {
      beforeListTable: ['@/components/WorkshopFeedbackSummary'],
    },
  },
  endpoints: [
    {
      path: '/counts',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ message: 'Please log in to view feedback counts.' }, { status: 403 })
        }

        const interests = [
          'ready-to-join',
          'counsellor-call',
          'installment-plan',
          'considering',
          'not-now',
        ] as const
        const [all, ...interestCounts] = await Promise.all([
          req.payload.count({
            collection: 'workshop-feedbacks',
            overrideAccess: false,
            req,
          }),
          ...interests.map((interest) =>
            req.payload.count({
              collection: 'workshop-feedbacks',
              overrideAccess: false,
              req,
              where: {
                joinInterest: {
                  equals: interest,
                },
              },
            }),
          ),
        ])

        return Response.json({
          counts: {
            all: all.totalDocs,
            ...Object.fromEntries(
              interests.map((interest, index) => [
                interest,
                interestCounts[index]?.totalDocs ?? 0,
              ]),
            ),
          },
        })
      },
    },
  ],
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'mobileNumber',
      label: 'Mobile number',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'workshopRegistrationId',
      label: 'Workshop registration ID',
      type: 'text',
      required: true,
      index: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'overallRating',
      label: 'Overall workshop rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      index: true,
    },
    {
      name: 'contentRating',
      label: 'Content rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'trainerRating',
      label: 'Trainer clarity rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'usefulnessRating',
      label: 'Practical usefulness rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'mostUseful',
      label: 'Most useful learning',
      type: 'textarea',
      maxLength: 1500,
      admin: {
        rows: 4,
      },
    },
    {
      name: 'improvements',
      label: 'Suggestions for improvement',
      type: 'textarea',
      maxLength: 1500,
      admin: {
        rows: 4,
      },
    },
    {
      name: 'testimonial',
      label: 'Candidate testimonial',
      type: 'textarea',
      maxLength: 2000,
      admin: {
        rows: 5,
      },
    },
    {
      name: 'allowTestimonialUse',
      label: 'Permission to publish testimonial',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'joinInterest',
      label: 'Career program interest',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Ready to join', value: 'ready-to-join' },
        { label: 'Need a counsellor call', value: 'counsellor-call' },
        { label: 'Interested in installment plan', value: 'installment-plan' },
        { label: 'Considering - follow up later', value: 'considering' },
        { label: 'Not interested now', value: 'not-now' },
      ],
    },
    {
      name: 'preferredContact',
      label: 'Preferred contact method',
      type: 'select',
      required: true,
      options: [
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Phone call', value: 'phone-call' },
        { label: 'Email', value: 'email' },
      ],
    },
    {
      name: 'consentToContact',
      label: 'Consent to contact',
      type: 'checkbox',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'followUpStatus',
      label: 'Follow-up status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New response', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Counselling scheduled', value: 'counselling-scheduled' },
        { label: 'Enrolled', value: 'enrolled' },
        { label: 'Follow up later', value: 'follow-up-later' },
        { label: 'Not interested', value: 'not-interested' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'adminNotes',
      label: 'Admin follow-up notes',
      type: 'textarea',
      maxLength: 5000,
      admin: {
        rows: 6,
      },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'Post-workshop feedback page',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
