import type { MetadataRoute } from 'next'

const siteUrl = 'https://elvin-portfolio-murex.vercel.app/'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
