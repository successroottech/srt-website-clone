import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { authenticated } from '@/access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const PaymentProofs: CollectionConfig = {
  slug: 'payment-proofs',
  labels: {
    singular: 'Payment Proof',
    plural: 'Payment Proofs',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    group: 'Leads',
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'registration', 'paymentReference', 'createdAt'],
    description: 'Private payment screenshots submitted for workshop verification.',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'registration',
      type: 'relationship',
      relationTo: 'workshop-registrations',
      required: true,
      index: true,
    },
    {
      name: 'paymentReference',
      label: 'UPI transaction / reference number',
      type: 'text',
      required: true,
      index: true,
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../../private/payment-proofs'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    pasteURL: false,
  },
  timestamps: true,
}
