import type { Metadata } from 'next'
import { EnquiryThankYou } from '@/components/EnquiryThankYou'

export const metadata: Metadata = { title: 'Thank You | Full Stack Course Enquiry | SRT', robots: { index: false, follow: false } }

export default function Page() {
  return <EnquiryThankYou courseName="Full Stack" coursePath="/courses/full-stack-developer-course-chennai/" />
}
