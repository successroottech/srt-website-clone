import type { Metadata } from 'next'

import { EnquiryThankYou } from '@/components/EnquiryThankYou'

export const metadata: Metadata = {
  title: 'Thank You | Course Enquiry | Success Root Technologies',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <EnquiryThankYou courseName="selected IT training" coursePath="/it-courses-chennai/" />
}
