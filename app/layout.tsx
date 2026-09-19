import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { profile } from '@/lib/portfolio-data'
import './globals.css'
import './portfolio.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const siteUrl = 'https://elvinmanuel.dev'
const siteDescription = 'Software engineer & IT specialist with 10+ years building web applications, AI-powered tools, interactive games, AR experiences, and the infrastructure behind them.'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: siteUrl,
  email: profile.email,
  jobTitle: 'Software Engineer & IT Specialist',
  description: siteDescription,
  sameAs: [profile.github, profile.linkedin, 'https://pixlint.com'],
  knowsAbout: ['Software Engineering', 'Web Development', 'Game Development', 'IT Infrastructure', 'AI Integration', 'LLM APIs', 'Electron', 'C#', 'Unity', 'React', 'Next.js', 'PHP', 'Network Administration', 'Local AI', 'Ollama'],
  founder: {
    '@type': 'Organization',
    name: 'Pixel Interactive',
    url: 'https://pixlint.com',
    description: 'Interactive event technology company offering photobooths, mini games, AI experiences, and custom activations.',
    areaServed: 'Philippines',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Elvin Manuel \u2014 Software Engineer & IT Specialist',
    template: '%s | Elvin Manuel Portfolio',
  },
  description: siteDescription,
  keywords: [
    'Elvin Manuel', 'software engineer', 'IT specialist', 'web developer',
    'Unity', 'C#', 'React', 'Next.js', 'PHP', 'portfolio',
    'game development', 'AR experiences', 'hardware', 'networking',
    'AI integration', 'Loki IDE', 'Odin Desktop', 'local AI', 'Ollama',
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Elvin Manuel Portfolio',
    title: 'Elvin Manuel \u2014 Software Engineer & IT Specialist',
    description: siteDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Elvin Manuel Portfolio \u2014 Software Engineer & IT Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elvin Manuel \u2014 Software Engineer & IT Specialist',
    description: siteDescription,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
