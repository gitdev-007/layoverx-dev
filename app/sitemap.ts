import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.layoverx.in';

  const routes = [
    '',
    '/hotels',
    '/restaurants',
    '/spa-wellness',
    '/gaming-entertainment',
    '/experiences',
    '/airport-transfers',
    '/how-it-works',
    '/plan-my-layover',
    '/terms',
    '/privacy',
    '/refund-policy',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/terms') || route.startsWith('/privacy') ? 0.5 : 0.8,
  }));
}
