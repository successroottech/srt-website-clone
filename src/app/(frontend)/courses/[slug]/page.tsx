import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import {
  featuredCourses,
  getFeaturedCourse,
  getLegacyCourseAITools,
  getLegacyCourseImage,
} from '@/data/courses'
import { getServerSideURL } from '@/utilities/getURL'
import { FullStackLanding } from './FullStackLanding'
import { DataAnalyticsLanding } from './DataAnalyticsLanding'
import { StandardCourseLanding } from './StandardCourseLanding'
import { getCourseProfile } from './coursePageProfiles'

type Args = { params: Promise<{ slug: string }> }

async function findLegacyCourse(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      and: [
        { slug: { equals: decodeURIComponent(slug) } },
        { originalURL: { contains: '/courses/' } },
      ],
    },
  })
  return result.docs[0]
}

export default async function CoursePage({ params }: Args) {
  const siteURL = getServerSideURL()
  const slug = decodeURIComponent((await params).slug)
  const featuredCourse = getFeaturedCourse(slug)
  const legacyCourse = featuredCourse ? null : await findLegacyCourse(slug)

  if (!featuredCourse && !legacyCourse) notFound()

  if (slug === 'full-stack-developer-course-chennai') {
    return <FullStackLanding />
  }
  if (slug === 'data-analytics-course-chennai') return <DataAnalyticsLanding />

  const title = featuredCourse?.title || legacyCourse?.title || ''
  const description =
    featuredCourse?.description ||
    legacyCourse?.meta?.description ||
    'Practical, career-focused technology training with expert guidance and hands-on projects.'
  const image = featuredCourse?.image || getLegacyCourseImage(legacyCourse?.slug)
  const aiTools = featuredCourse?.tools || getLegacyCourseAITools(legacyCourse?.slug)

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description,
    image: new URL(image, siteURL).toString(),
    url: `${siteURL}/courses/${slug}/`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Success Root Technologies',
      sameAs: siteURL,
    },
    educationalLevel: featuredCourse?.level || 'Beginner to advanced',
    inLanguage: 'en',
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      availability: 'https://schema.org/InStock',
      url: `${siteURL}/courses/${slug}/`,
    },
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        type="application/ld+json"
      />
      <StandardCourseLanding
        description={description}
        duration={
          featuredCourse?.duration ||
          getCourseProfile(slug).duration ||
          'Contact SRT for current duration'
        }
        legacyHTML={legacyCourse?.legacyHTML || undefined}
        level={featuredCourse?.level || 'Instructor-led · Beginner friendly'}
        modules={featuredCourse?.modules || []}
        outcomes={featuredCourse?.outcomes || []}
        slug={slug}
        title={title}
        tools={aiTools}
      />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const slug = decodeURIComponent((await params).slug)
  if (slug === 'full-stack-developer-course-chennai') {
    return {
      title: 'Full Stack Developer Course in Chennai | SRT',
      description:
        'Join practical MERN Full Stack training in Chennai covering React JS, Node.js, Express.js and MongoDB. Classroom and online weekday and weekend batches.',
      keywords: [
        'Full Stack Course in Chennai',
        'Full Stack Developer Course Chennai',
        'Full Stack Training Chennai',
        'MERN Stack Course Chennai',
        'React JS Training Chennai',
        'Full Stack Training in West Mambalam',
      ],
      alternates: { canonical: `/courses/${slug}/` },
      openGraph: {
        type: 'website',
        title: 'Full Stack Developer Course in Chennai | SRT',
        description:
          'Practical MERN Full Stack training covering React JS, Node.js, Express.js and MongoDB with classroom and online batches in Chennai.',
        url: `/courses/${slug}/`,
        images: [
          { url: '/courses/full-stack-web-development-react-python-fastapi-and-mongodb.png' },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Full Stack Developer Course in Chennai | SRT',
        description:
          'Learn MERN Full Stack development with React JS, Node.js, Express.js and MongoDB through practical projects.',
        images: ['/courses/full-stack-web-development-react-python-fastapi-and-mongodb.png'],
      },
    }
  }
  if (slug === 'data-analytics-course-chennai') {
    return {
      title: 'Data Analytics Course in Chennai | SRT',
      description:
        'Learn Data Analytics with Advanced Excel, SQL, Power BI, Python and practical projects at Success Root Technologies, West Mambalam, Chennai.',
      keywords: [
        'Data Analytics Course in Chennai',
        'Data Analytics Training Chennai',
        'Data Analyst Course Chennai',
        'Power BI Training Chennai',
        'Advanced Excel Training Chennai',
        'Data Analytics Training in West Mambalam',
      ],
      alternates: { canonical: `/courses/${slug}/` },
      openGraph: {
        type: 'website',
        title: 'Data Analytics Course in Chennai | SRT',
        description:
          'Practical Advanced Excel, SQL, Power BI, Python and AI-assisted analytics training in Chennai.',
        url: `/courses/${slug}/`,
        images: [{ url: '/courses/job-ready-analytics-combo-course.png' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Data Analytics Course in Chennai | SRT',
        description: 'Learn Excel, SQL, Power BI and Python through practical analytics projects.',
        images: ['/courses/job-ready-analytics-combo-course.png'],
      },
    }
  }
  const featuredCourse = getFeaturedCourse(slug)
  const legacyCourse = featuredCourse ? null : await findLegacyCourse(slug)
  const title = featuredCourse?.title || legacyCourse?.meta?.title || legacyCourse?.title
  const description =
    featuredCourse?.description ||
    legacyCourse?.meta?.description ||
    'Practical, career-focused technology training with expert guidance and hands-on projects.'
  const image = featuredCourse?.image || getLegacyCourseImage(legacyCourse?.slug)
  const aiTools = featuredCourse?.tools || getLegacyCourseAITools(legacyCourse?.slug)
  const seoTitle =
    title && /chennai/i.test(title)
      ? `${title} | Success Root Technologies`
      : `${title} Course in Chennai | Success Root Technologies`

  return {
    title: { absolute: seoTitle },
    description,
    keywords: featuredCourse?.keywords || [
      `${title} with AI tools`,
      ...aiTools.map((tool) => `${tool} training`),
    ],
    alternates: { canonical: `/courses/${slug}/` },
    openGraph: {
      type: 'website',
      title: seoTitle,
      description,
      url: `/courses/${slug}/`,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description,
      images: [image],
    },
  }
}

export function generateStaticParams() {
  return featuredCourses.map(({ slug }) => ({ slug }))
}
