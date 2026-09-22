import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.layoverx.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/revenue-admin/', '/supplier-dashboard/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
