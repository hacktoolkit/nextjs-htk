import type { Page } from '../types'

export interface SitemapConfig {
  siteUrl: string
  pages: Page[]
  additionalPages?: Array<{
    path: string
    priority?: number
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  }>
}

export function generateSitemap(config: SitemapConfig): string {
  const { siteUrl, pages, additionalPages = [] } = config

  const allPages = [
    ...pages.map(page => ({
      path: page.path,
      priority: page.path === '/' ? 1.0 : 0.8,
      changefreq: 'daily' as const
    })),
    ...additionalPages.map(page => ({
      path: page.path,
      priority: page.priority ?? 0.8,
      changefreq: page.changefreq ?? 'daily' as const
    }))
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`
}
