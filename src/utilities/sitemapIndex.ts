import { getProductionURL } from '@/utilities/getURL'

const sitemaps = [
  'page-sitemap.xml',
  'courses-sitemap.xml',
  'post-sitemap.xml',
  'post_tag-sitemap.xml',
]

export const sitemapIndexResponse = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((path) => `  <sitemap><loc>${getProductionURL(`/${path}`)}</loc></sitemap>`).join('\n')}
</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
      'Content-Type': 'application/xml',
    },
  })
}
