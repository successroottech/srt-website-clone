import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { FreeChatbot } from '@/components/FreeChatbot'
import { HomepageLeadGate } from './HomepageLeadGate'
import { GoogleAnalyticsPageView } from './GoogleAnalyticsPageView'

const googleAdsID = 'AW-17697110474'
const gaMeasurementID = 'G-GV2FP6C2HN'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAdsID}');
gtag('config', '${googleAdsID}/RFpwCPf33ukcEMrz0fZB', {
  phone_conversion_number: '+91 89390 69135'
});
if (window.location.hostname === 'successroottech.com' || window.location.hostname === 'www.successroottech.com') {
  gtag('config', '${gaMeasurementID}', { send_page_view: false });
}`,
          }}
        />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <GoogleAnalyticsPageView measurementID={gaMeasurementID} />
          {children}
          <HomepageLeadGate />
          <Footer />
          <FreeChatbot />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    default: 'Success Root Technologies | Training, Placement & Software Development',
    template: '%s | Success Root Technologies',
  },
  description:
    'Technology training with placement support in Chennai, plus custom software development, AI automation, web applications, data platforms and cloud solutions.',
  metadataBase: new URL(getServerSideURL()),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
