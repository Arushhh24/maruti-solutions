import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://marutisolutions.in'),
  title: {
    default: 'Maruti Solutions — Strategic Finance. Growth Marketing. Creative Execution.',
    template: '%s | Maruti Solutions',
  },
  description:
    'Maruti Solutions is a business solutions consultancy helping ambitious businesses grow through strategic financial consulting, data-driven marketing, and premium creative services.',
  keywords: [
    'business consultancy',
    'financial consulting',
    'marketing solutions',
    'graphic design',
    'VFX services',
    'business growth',
    'India',
  ],
  authors: [{ name: 'Arush Prakash', url: 'https://marutisolutions.in' }],
  creator: 'Arush Prakash',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://marutisolutions.in',
    title: 'Maruti Solutions — Strategic Business Consultancy',
    description:
      'Strategic Finance. Growth Marketing. Creative Execution. Helping ambitious businesses make better decisions and grow faster.',
    siteName: 'Maruti Solutions',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Maruti Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maruti Solutions — Strategic Business Consultancy',
    description: 'Strategic Finance. Growth Marketing. Creative Execution.',
    images: ['/og-image.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
