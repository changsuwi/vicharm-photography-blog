import type { MetadataRoute } from 'next'

import { getAllPostIds } from '../lib/markdownRepo';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const articles_paths = getAllPostIds('articles');
  const trips_paths = getAllPostIds('trips');

  const articles = articles_paths.map(article =>  ({
    url: `${process.env.SITE_URL}/article/${article.id}`,
    lastModified: new Date().toISOString()
  }))

  const trips = trips_paths.map(article =>  ({
    url: `${process.env.SITE_URL}/trip/${article.id}`,
    lastModified: new Date().toISOString()
  }))
  return [
    {
      url: process.env.SITE_URL || "https://vicharm-life.com", // Absolute url
      lastModified: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      url: `${process.env.SITE_URL}/trip`, // Absolute url
      lastModified: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      url: `${process.env.SITE_URL}/article`, // Absolute url
      lastModified: new Date().toISOString(),
      // changefreq
      // priority
    },
    ...articles,
    ...trips
  ]
}