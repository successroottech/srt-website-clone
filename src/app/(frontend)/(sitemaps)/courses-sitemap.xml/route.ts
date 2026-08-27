import config from '@payload-config'
import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import { featuredCourses } from '@/data/courses'
import { getProductionURL } from '@/utilities/getURL'

const getCoursesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const siteURL = getProductionURL('/').replace(/\/$/, '')
    const results = await payload.find({
      collection: 'pages',
      depth: 0,
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true, updatedAt: true },
      where: {
        and: [
          { _status: { equals: 'published' } },
          { originalURL: { contains: '/courses/' } },
        ],
      },
    })
    const fallback = new Date().toISOString()
    const courses = new Map<string, string>()

    featuredCourses.forEach(({ slug }) => courses.set(slug, fallback))
    results.docs.forEach(({ slug, updatedAt }) => {
      if (slug) courses.set(slug, updatedAt || fallback)
    })

    return [
      ...Array.from(courses, ([slug, lastmod]) => ({
        loc: `${siteURL}/courses/${slug}/`,
        lastmod,
      })),
    ]
  },
  ['legacy-courses-sitemap'],
  { tags: ['pages-sitemap'] },
)

export async function GET() {
  return getServerSideSitemap(await getCoursesSitemap())
}
