import type { Metadata } from 'next'

import { CertificateLookupForm } from '@/components/CertificateLookupForm'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Download AI Workshop Certificate',
  description:
    'Download your Success Root Technologies AI workshop certificate using your registered 10-digit mobile or WhatsApp number.',
  alternates: { canonical: '/download-certificate/' },
  robots: { follow: false, index: false },
}

export default function DownloadCertificatePage() {
  return (
    <main className={styles.page}>
      <div className={styles.orbOne} aria-hidden="true" />
      <div className={styles.orbTwo} aria-hidden="true" />
      <div className={`container ${styles.container}`}>
        <CertificateLookupForm />
        <div className={styles.copy}>
          <span>SRT digital credentials</span>
          <h2>A simple and secure way to access your achievement.</h2>
          <p>
            Certificates are available only after an administrator uploads and issues them. Use
            the same number provided during workshop registration.
          </p>
          <ul>
            <li><strong>01</strong><div><b>Enter 10 digits</b><span>No +91, spaces or special characters.</span></div></li>
            <li><strong>02</strong><div><b>Open certificate</b><span>Your personal certificate page will appear.</span></div></li>
            <li><strong>03</strong><div><b>Download anytime</b><span>Save the original certificate image to your device.</span></div></li>
          </ul>
        </div>
      </div>
    </main>
  )
}
