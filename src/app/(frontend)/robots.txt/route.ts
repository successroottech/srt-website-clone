import { headers } from 'next/headers'

import { getProductionURL, isStagingHostname } from '@/utilities/getURL'

export async function GET() {
  const requestHeaders = await headers()
  const hostname = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host') || ''
  const staging = isStagingHostname(hostname)
  const body = staging
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nSitemap: ${getProductionURL('/sitemap.xml')}\n`

  return new Response(body, {
    headers: {
      'Cache-Control': 'public, max-age=300',
      'Content-Type': 'text/plain; charset=utf-8',
      ...(staging ? { 'X-Robots-Tag': 'noindex, nofollow' } : {}),
    },
  })
}
