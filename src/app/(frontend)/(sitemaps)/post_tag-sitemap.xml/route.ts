import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'

import legacyTags from '@/data/legacyTags.json'
import { getProductionURL } from '@/utilities/getURL'

const getLegacyTagSitemap = unstable_cache(
  async () => {
    const siteURL = getProductionURL('/').replace(/\/$/, '')
    const fallback = new Date().toISOString()

    return legacyTags.map((tag) => ({
      loc: `${siteURL}/tag/${tag.slug}/`,
      lastmod: fallback,
    }))
  },
  ['legacy-post-tag-sitemap'],
  { tags: ['post-tag-sitemap'] },
)

export async function GET() {
  return getServerSideSitemap(await getLegacyTagSitemap())
}
