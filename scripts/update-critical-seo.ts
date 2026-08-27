import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

const updates = [
  {
    slug: 'it-training-courses-chennai',
    title: 'IT Training Courses in Chennai with Placement Support',
    description:
      'Explore job-focused IT training courses in Chennai covering AI, Python, Java, full-stack development, data analytics, Power BI, cloud and more.',
  },
  {
    slug: 'it-job-placement-training-chennai',
    title: 'IT Job Placement Training in Chennai for Freshers',
    description:
      'Build job-ready technology skills with projects, resume support, mock interviews and placement assistance for eligible freshers and career changers.',
  },
  {
    slug: 'about-success-root-it-training-chennai',
    title: 'About Our IT Training & Software Company in Chennai',
    description:
      'Learn about Success Root Technologies, providing practical IT training, placement preparation, AI automation and custom software development in Chennai.',
  },
  {
    slug: 'contact-us',
    title: 'Contact for IT Courses & Software Development in Chennai',
    description:
      'Contact Success Root Technologies for course schedules, admissions, placement support or custom software development and AI automation requirements.',
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description:
      'Read how Success Root Technologies handles website enquiries, personal information, communications and data privacy.',
  },
  {
    slug: 'blog',
    title: 'AI, Data & Technology Insights',
    description:
      'Explore practical insights on artificial intelligence, data analytics, cloud, cybersecurity, software development and career-ready technology skills.',
  },
]

const payload = await getPayload({ config })

for (const update of updates) {
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: update.slug } },
  })
  const page = result.docs[0]
  if (!page) {
    console.warn(`Page not found: ${update.slug}`)
    continue
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    context: { disableRevalidate: true },
    data: {
      meta: {
        ...page.meta,
        description: update.description,
        title: update.title,
      },
    },
  })
  console.log(`Updated SEO: ${update.slug}`)
}

process.exit(0)
