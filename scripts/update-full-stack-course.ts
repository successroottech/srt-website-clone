import 'dotenv/config'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const oldSlug = 'full-stack-web-development-react-python-fastapi-and-mongodb'
const newSlug = 'full-stack-developer-course-chennai'
const payload = await getPayload({ config: configPromise })
const result = await payload.find({ collection: 'pages', where: { slug: { equals: oldSlug } }, limit: 1, depth: 0 })
const course = result.docs[0]

if (!course) throw new Error(`Course page not found: ${oldSlug}`)

await payload.update({
  collection: 'pages',
  id: course.id,
  context: { disableRevalidate: true },
  data: {
    slug: newSlug,
    title: 'Full Stack Developer Course in Chennai',
    meta: {
      ...course.meta,
      title: 'Full Stack Developer Course in Chennai | SRT',
      description: 'Learn React JS, Node.js, Express.js and MongoDB through practical training, hands-on projects and career-focused guidance in Chennai.',
    },
  },
})

console.log(`Updated Full Stack course page ${course.id}`)
process.exit(0)
