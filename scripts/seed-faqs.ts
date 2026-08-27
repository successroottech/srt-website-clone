import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

import { faqSeedData } from '@/data/faqs'

const payload = await getPayload({ config })

for (const faq of faqSeedData) {
  const existing = await payload.find({
    collection: 'faqs',
    limit: 1,
    where: { slug: { equals: faq.slug } },
  })
  const data = {
    ...faq,
    _status: 'published' as const,
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'faqs',
      id: existing.docs[0].id,
      data,
      context: { disableRevalidate: true },
    })
  } else {
    await payload.create({
      collection: 'faqs',
      data,
      context: { disableRevalidate: true },
    })
  }
}

console.log(`FAQ seed complete: ${faqSeedData.length} questions published.`)
process.exit(0)
