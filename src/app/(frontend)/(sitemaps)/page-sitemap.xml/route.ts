import config from '@payload-config'
import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import { getProductionURL } from '@/utilities/getURL'

const getLegacyPageSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const siteURL = getProductionURL('/')
    const results = await payload.find({
      collection: 'pages',
      depth: 0,
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true, updatedAt: true, originalURL: true },
      where: { _status: { equals: 'published' } },
    })
    const fallback = new Date().toISOString()
    const pages = new Map<string, string>([
      ['/', fallback],
      ['/services/', fallback],
      ['/software-development/', fallback],
      ['/faq/', fallback],
      ['/ai-workshop/', fallback],
      ['/about-us/', fallback],
      ['/company-profile/', fallback],
      ['/contact-us/', fallback],
      ['/privacy-policy/', fallback],
      ['/terms-and-conditions/', fallback],
      ['/refund-and-cancellation-policy/', fallback],
      ['/shipping-and-delivery-policy/', fallback],
    ])

    results.docs.forEach(({ slug, updatedAt, originalURL }) => {
      if (
        !slug ||
        slug === 'about-success-root-it-training-chennai' ||
        originalURL?.includes('/courses/')
      ) return
      const path = slug === 'home' ? '/' : `/${slug}/`
      pages.set(path, updatedAt || fallback)
    })

    return Array.from(pages, ([path, lastmod]) => ({
      loc: new URL(path, siteURL).toString(),
      lastmod,
    }))
  },
  ['legacy-page-sitemap'],
  { tags: ['pages-sitemap'] },
)

export async function GET() {
  return getServerSideSitemap(await getLegacyPageSitemap())
}
