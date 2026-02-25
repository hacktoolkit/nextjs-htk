import fs from 'fs'
import path from 'path'
import { generateSitemap } from '@hacktoolkit/nextjs-htk/utils'
import type { SitemapConfig } from '@hacktoolkit/nextjs-htk/utils'

// Import your htk.config.ts
import config from '../../htk.config'

const sitemapConfig: SitemapConfig = {
  siteUrl: config.default.site.url,
  pages: config.default.navigation,
}

// Generate the sitemap
const sitemap = generateSitemap(sitemapConfig)

// Get build directory from config or use default
const buildDir = path.join(process.cwd(), 'docs')

// Ensure the build directory exists
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true })
}

// Write the sitemap file
fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap)

console.log(`✓ Sitemap generated at ${path.join(buildDir, 'sitemap.xml')}`)
