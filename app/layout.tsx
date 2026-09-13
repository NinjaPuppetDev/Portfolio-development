import type { Metadata } from 'next'
import { Space_Mono, Cormorant_Garamond, DM_Sans } from 'next/font/google'
// @ts-ignore: allow global CSS import without type declarations
import './globals.css'
import Cursor from './components/Cursor'
import FloatingChat from './components/FloatingChat'
import VeraCompanion from './components/VeraCompanion'
import { ExperimentProvider } from './components/ExperimentProvider'
import IntroOverlay from './components/IntroOverlay'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--mono',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--sans',
  display: 'swap',
})

// Base domain required by Next.js for resolving relative OG image and canonical URLs
const baseUrl = 'https://davidraigoza.design'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'David Raigoza | Product Designer & Frontend Engineer',
    template: '%s | David Raigoza',
  },
  description:
    'Product Design Engineer and Web3 Builder specializing in UI/UX design, Next.js, React, and AI system integrations based in Medellín, Colombia.',
  keywords: [
    'Product Designer',
    'Frontend Engineer',
    'UI UX Design',
    'Next.js Specialist',
    'Design Systems',
    'Medellín Designer',
  ],
  authors: [{ name: 'David Raigoza', url: baseUrl }],
  creator: 'David Raigoza',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'David Raigoza | Product Designer & Engineer',
    description:
      'Product Design Engineer specializing in full-stack UI/UX, Next.js, and AI systems based in Medellín, Colombia.',
    url: baseUrl,
    siteName: 'David Raigoza Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Raigoza | Product Designer & Engineer',
    description:
      'Product Design Engineer specializing in full-stack UI/UX, Next.js, and AI systems.',
    creator: '@frustramatic',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Schema.org Structured Data for Search Engine Entity Graphing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'David Raigoza',
    url: baseUrl,
    jobTitle: 'Product Design Engineer',
    description:
      'Product Designer and Engineer specializing in Next.js, UI/UX systems, and AI integration.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Medellín',
      addressCountry: 'Colombia',
    },
    sameAs: [
      'https://x.com/frustramatic',
      'https://medium.com/@frustramatic',
    ],
  }

  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${cormorantGaramond.variable} ${dmSans.variable}`}
      style={{ colorScheme: 'dark', backgroundColor: '#000000' }}
    >
      <body style={{ backgroundColor: '#000000', color: '#ffffff' }}>
        {/* Entity Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Cursor />
        <VeraCompanion />
        <IntroOverlay />

        <ExperimentProvider>
          <FloatingChat />
        </ExperimentProvider>

        {children}

      </body>
    </html>
  )
}