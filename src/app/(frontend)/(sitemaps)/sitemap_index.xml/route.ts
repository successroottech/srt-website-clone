import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  const siteURL = getServerSideURL()
  const sitemaps = [
    'post-sitemap.xml',
    'post_tag-sitemap.xml',
    'courses-sitemap.xml',
    'page-sitemap.xml',
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((path) => `  <sitemap><loc>${siteURL}/${path}</loc></sitemap>`).join('\n')}
</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
      'Content-Type': 'application/xml',
    },
  })
}
