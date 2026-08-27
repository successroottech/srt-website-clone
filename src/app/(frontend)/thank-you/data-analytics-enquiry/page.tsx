import type { Metadata } from 'next'
import { EnquiryThankYou } from '@/components/EnquiryThankYou'

export const metadata: Metadata = { title: 'Thank You | Data Analytics Enquiry | SRT', robots: { index: false, follow: false } }

export default function Page() {
  return <EnquiryThankYou courseName="Data Analytics" coursePath="/courses/data-analytics-course-chennai/" />
}
