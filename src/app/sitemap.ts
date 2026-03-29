import type { MetadataRoute } from 'next';
import { getAllStates } from '@/lib/tax-calculator';
import { getAllGuideSlugs } from '@/lib/guides';
import { getAllDailyWinsDates } from '@/lib/daily-wins';

const BASE_URL = 'https://bettaxcalc.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const states = getAllStates();
  const guideSlugs = getAllGuideSlugs();
  const dailyDates = getAllDailyWinsDates();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/tools/parlay-tax`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/phantom-income`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/w2g-checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/state-comparison`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/states`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/daily-wins`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/responsible-gambling`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // State pages
  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${BASE_URL}/states/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // Daily wins archive pages
  const dailyPages: MetadataRoute.Sitemap = dailyDates.map((date) => ({
    url: `${BASE_URL}/daily-wins/${date}`,
    lastModified: new Date(date),
    changeFrequency: 'never' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...statePages, ...guidePages, ...dailyPages];
}
