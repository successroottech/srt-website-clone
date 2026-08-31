import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { featuredCourses } from '@/data/courses'
import { getProductionURL } from '@/utilities/getURL'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getProductionURL('/').replace(/\/$/, '')

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
        originalURL: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/search/`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/blog/`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/it-courses-chennai/`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/software-development/`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/faq/`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/ai-workshop/`,
        lastmod: dateFallback,
      },
      ...[
        'about-us',
        'company-profile',
        'contact-us',
        'privacy-policy',
        'terms-and-conditions',
        'refund-and-cancellation-policy',
        'shipping-and-delivery-policy',
      ].map((slug) => ({
        loc: `${SITE_URL}/${slug}/`,
        lastmod: dateFallback,
      })),
      ...featuredCourses.map((course) => ({
        loc: `${SITE_URL}/courses/${course.slug}/`,
        lastmod: dateFallback,
      })),
    ]

    const sitemap = results.docs
      ? results.docs
          .filter(
            (page) =>
              Boolean(page?.slug) &&
              page.slug !== 'home-08' &&
              page.slug !== 'about-success-root-it-training-chennai',
          )
          .map((page) => {
            return {
              loc:
                page?.slug === 'home'
                  ? `${SITE_URL}/`
                  : page.originalURL?.includes('/courses/')
                    ? `${SITE_URL}/courses/${page.slug}/`
                    : `${SITE_URL}/${page?.slug}/`,
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
