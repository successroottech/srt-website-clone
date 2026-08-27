import configPromise from '@payload-config'
import { Award, Download, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

import styles from './page.module.css'

type PageProps = {
  params: Promise<{ token: string }>
}

const getCertificate = cache(async (token: string) => {
  if (!/^[a-f0-9]{48}$/.test(token)) return null

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'workshop-registrations',
    depth: 1,
    limit: 1,
    overrideAccess: true,
    where: {
      certificateShareToken: {
        equals: token,
      },
    },
  })

  return result.docs[0] ?? null
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params
  const registration = await getCertificate(token)

  return {
    title: registration ? `${registration.fullName} - Workshop Certificate` : 'Certificate',
    description: 'Workshop completion certificate issued by Success Root Technologies.',
    robots: { follow: false, index: false },
  }
}

export default async function CertificatePage({ params }: PageProps) {
  const { token } = await params
  const registration = await getCertificate(token)

  if (!registration || !registration.certificateImage) notFound()

  const certificate =
    typeof registration.certificateImage === 'object' ? registration.certificateImage : null
  const certificateURL = certificate?.url

  if (!certificateURL) notFound()

  const issuedAt = registration.certificateIssuedAt
    ? new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'long',
        timeZone: 'Asia/Kolkata',
      }).format(new Date(registration.certificateIssuedAt))
    : null

  return (
    <main className={styles.page}>
      <div className={styles.orbOne} aria-hidden="true" />
      <div className={styles.orbTwo} aria-hidden="true" />
      <div className={`container ${styles.container}`}>
        <header className={styles.header}>
          <span className={styles.icon}><Award size={28} /></span>
          <div>
            <small>Success Root Technologies</small>
            <h1>Workshop Completion Certificate</h1>
            <p>
              Issued to <strong>{registration.fullName}</strong>
              {issuedAt ? ` on ${issuedAt}` : ''}.
            </p>
          </div>
          <div className={styles.verified}><ShieldCheck size={17} /> Verified certificate</div>
        </header>

        <section className={styles.certificateFrame}>
          {/* The original certificate proportions are preserved for viewing and download. */}
          <img
            alt={`Workshop completion certificate for ${registration.fullName}`}
            src={certificateURL}
          />
        </section>

        <footer className={styles.footer}>
          <div>
            <span>Registration ID</span>
            <strong>SRT-AI-{String(registration.id).padStart(5, '0')}</strong>
          </div>
          <a download href={certificateURL}>
            <Download size={18} /> Download certificate
          </a>
        </footer>
      </div>
    </main>
  )
}
