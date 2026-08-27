import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Success Root Technologies` : 'Success Root Technologies'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}/` : `${url}/`
}

const csvValue = (value: unknown) => {
  let text = value == null ? '' : String(value)
  if (/^[=+\-@]/.test(text)) text = `'${text}`
  return `"${text.replace(/"/g, '""')}"`
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      admin: {
        defaultColumns: ['leadName', 'leadMobile', 'form', 'updatedAt'],
        group: 'Leads',
        components: {
          beforeListTable: ['@/components/FormSubmissionExportButton'],
        },
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'leadName',
          type: 'ui',
          label: 'Name',
          admin: { components: { Cell: '@/components/FormSubmissionNameCell' } },
        },
        {
          name: 'leadMobile',
          type: 'ui',
          label: 'Phone Number',
          admin: { components: { Cell: '@/components/FormSubmissionMobileCell' } },
        },
      ],
      endpoints: [
        {
          path: '/export',
          method: 'get',
          handler: async (req) => {
            if (!req.user) return Response.json({ message: 'Please log in to export enquiries.' }, { status: 403 })
            const result = await req.payload.find({ collection: 'form-submissions', depth: 1, limit: 10000, overrideAccess: false, req, sort: '-createdAt' })
            const fields = ['name', 'mobile', 'email', 'interest', 'course', 'status', 'mode', 'batch', 'source']
            const headers = ['ID', 'Name', 'Phone Number', 'Email', 'Looking For', 'Course / Role', 'Current Status', 'Training Mode', 'Preferred Batch', 'Source', 'Submitted At']
            const rows = result.docs.map((submission) => {
              const values = Object.fromEntries((submission.submissionData || []).map((item) => [item.field, item.value]))
              return [submission.id, ...fields.map((field) => values[field] || ''), submission.createdAt]
            })
            const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(csvValue).join(',')).join('\r\n')}`
            const date = new Date().toISOString().slice(0, 10)
            return new Response(csv, { headers: { 'Cache-Control': 'private, no-store', 'Content-Disposition': `attachment; filename="srt-course-enquiries-${date}.csv"`, 'Content-Type': 'text/csv; charset=utf-8' } })
          },
        },
      ],
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
