import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { CLINIC_CONFIG } from '@/lib/config'
import './globals.css'

const title = `${CLINIC_CONFIG.name} | ${CLINIC_CONFIG.tagline}`
const description = CLINIC_CONFIG.description

export const metadata: Metadata = {
  title,
  description,
  generator: 'v0.app',
  metadataBase: new URL(CLINIC_CONFIG.siteUrl),
  keywords: [
    'dental clinic',
    'dentist',
    'Kampala',
    'Uganda',
    'family dentistry',
    'dental care',
    'teeth whitening',
    'cosmetic dentistry',
    'preventive care',
  ],
  authors: [{ name: CLINIC_CONFIG.name }],
  creator: CLINIC_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: CLINIC_CONFIG.siteUrl,
    title,
    description,
    siteName: CLINIC_CONFIG.name,
  },
  alternates: {
    canonical: CLINIC_CONFIG.siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/pix/solaceLogo.PNG', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon-32x32.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e8e8ff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
