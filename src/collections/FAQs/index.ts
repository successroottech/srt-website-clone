import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { revalidateFAQ, revalidateFAQDelete } from './hooks/revalidateFAQ'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['question', 'category', 'featured', 'sortOrder', '_status'],
    description:
      'Manage frequently asked questions shown on the homepage and the complete FAQ page.',
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      maxLength: 3000,
      admin: {
        rows: 6,
        description: 'Write a clear, factual answer in plain language.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'Training experience', value: 'training' },
        { label: 'Courses and learning', value: 'courses' },
        { label: 'Placement support', value: 'placement' },
        { label: 'Admissions and fees', value: 'admissions' },
        { label: 'Software development', value: 'software' },
        { label: 'General information', value: 'general' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this question in the homepage FAQ section.',
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      defaultValue: 100,
      min: 0,
      admin: {
        description: 'Lower numbers appear first.',
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Stable internal identifier. Use lowercase words separated by hyphens.',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFAQ],
    afterDelete: [revalidateFAQDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
}
