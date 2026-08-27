import config from '@payload-config'
import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import { getProductionURL } from '@/utilities/getURL'

const getLegacyPostSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const siteURL = getProductionURL('/').replace(/\/$/, '')
    const results = await payload.find({
      collection: 'posts',
      depth: 0,
      draft: false,
      limit: 2000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: 'published' } },
    })
    const fallback = new Date().toISOString()

    return [
      { loc: `${siteURL}/blog/`, lastmod: fallback },
      ...results.docs
        .filter(({ slug }) => Boolean(slug))
        .map((post) => ({
          loc: `${siteURL}/${post.slug}/`,
          lastmod: post.updatedAt || fallback,
        })),
    ]
  },
  ['legacy-post-sitemap'],
  { tags: ['posts-sitemap'] },
)

export async function GET() {
  return getServerSideSitemap(await getLegacyPostSitemap())
}
