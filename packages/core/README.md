# @nextjs-htk/core

Core components, hooks, and utilities for the nextjs-htk framework.

## Installation

```bash
npm install @nextjs-htk/core
# or
pnpm add @nextjs-htk/core
```

## Peer Dependencies

This package requires:
- next >= 15.0.0
- react >= 19.0.0
- react-dom >= 19.0.0

## CLI Tool

The package includes a CLI tool for project standardization and template management.

### Quick Start

```bash
# Initialize a new project with standard files
npx htk init

# Sync templates from latest version
npx htk sync

# Show all available commands
npx htk help
```

### Available Commands

- **`htk init`** - Initialize new project with Makefile, scripts, and configs
- **`htk sync`** - Update all templates to latest version
- **`htk sync:makefile`** - Sync only the Makefile
- **`htk sync:scripts`** - Sync only the scripts directory

### Force Overwrite

By default, existing files won't be overwritten. Use `--force` or `-f`:

```bash
npx htk sync --force
npx htk init -f
```

### What Gets Installed

**Makefile** - Standard targets for development and deployment:
- `make dev` - Start development server
- `make build` - Build for production
- `make deploy` - Deploy to GitHub Pages
- `make help` - Show all available targets

**Scripts** - Utility scripts for your project:
- `src/scripts/generate_sitemap.ts` - Auto-generate sitemap.xml

**Next.js Config Template** - React 19 compatible configuration with:
- Webpack alias configuration for single React instance
- Static export settings for GitHub Pages
- Source maps enabled for debugging

## Usage

### Configuration

Create a `htk.config.ts` file:

```typescript
import { defineConfig } from '@nextjs-htk/core'

export default defineConfig({
  site: {
    name: 'My Site',
    title: 'Welcome to My Site',
    description: 'A great website',
    url: 'https://mysite.com',
    author: 'Author Name',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ],
  footer: {
    copyright: '© 2025 My Site',
  },
})
```

## Utilities

### Sitemap Generator

Generate SEO-friendly sitemaps from your site configuration:

```typescript
import { generateSitemap } from '@nextjs-htk/core/utils'
import type { SitemapConfig } from '@nextjs-htk/core/utils'

const config: SitemapConfig = {
  siteUrl: 'https://example.com',
  pages: [
    { name: 'Home', path: '/', showInNav: true },
    { name: 'About', path: '/about/', showInNav: true }
  ],
  additionalPages: [
    {
      path: '/blog/post-1/',
      priority: 0.7,
      changefreq: 'weekly'
    }
  ]
}

const sitemap = generateSitemap(config)
```

The generated script (`src/scripts/generate_sitemap.ts`) automatically uses your `htk.config.ts` to generate the sitemap during build.

## Components

Components will be added in upcoming releases:
- BaseLayout
- Header
- Footer
- SEO
- ContactForm

## Hooks

Hooks will be added in upcoming releases:
- useTheme
- useSiteConfig

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Watch mode
pnpm dev
```

## License

MIT
