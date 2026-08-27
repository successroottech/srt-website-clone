import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })
const registrations = await payload.count({
  collection: 'workshop-registrations',
  overrideAccess: true,
})

console.log(`Workshop registrations collection ready (${registrations.totalDocs} records).`)
process.exit(0)
