# NextJS-HTK Integration Guide

This guide explains how to integrate nextjs-htk into your Next.js project.

## Table of Contents

1. [New Project Setup](#new-project-setup)
2. [Existing Project Migration](#existing-project-migration)
3. [Configuration](#configuration)
4. [Using Components](#using-components)
5. [Content Management](#content-management)
6. [Build and Deployment](#build-and-deployment)

---

## New Project Setup

### Quick Start

```bash
# Create a new Next.js project
npx create-next-app@latest my-site --typescript --tailwind=false --app=false

cd my-site

# Install nextjs-htk packages
pnpm add @nextjs-htk/core @nextjs-htk/build-tools

# Optional: Add content adapters
pnpm add @nextjs-htk/content

# Install peer dependencies
pnpm add next@15 react@19 react-dom@19 bootstrap react-bootstrap sass
```

### Project Structure

Set up your project structure:

```
my-site/
├── src/
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── about.tsx
│   │   └── _app.tsx
│   ├── components/     # Custom components
│   ├── styles/         # Custom styles
│   └── content/        # Content files (markdown, JSON)
├── public/             # Static assets
├── htk.config.ts       # NextJS-HTK configuration
├── next.config.mjs     # Next.js configuration
└── package.json
```

### Initial Configuration

Create `htk.config.ts`:

```typescript
import { defineConfig } from '@nextjs-htk/core'

export default defineConfig({
  site: {
    name: 'My Site',
    title: 'Welcome to My Site',
    description: 'A website built with NextJS-HTK',
    url: 'https://mysite.com',
    author: 'Your Name',
  },

  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  footer: {
    copyright: '© 2025 My Site. All rights reserved.',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },

  social: {
    github: 'yourusername',
    twitter: 'yourhandle',
  },

  theme: {
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
    },
  },

  seo: {
    defaultImage: '/og-image.png',
    twitterCard: 'summary_large_image',
  },
})
```

Create `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

---

## Existing Project Migration

### Step 1: Install Dependencies

```bash
pnpm add @nextjs-htk/core @nextjs-htk/build-tools
# Add other packages as needed
```

### Step 2: Update Next.js Config

Update `next.config.js` for static export:

```javascript
module.exports = {
  output: 'export',
  distDir: 'docs',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}
```

### Step 3: Create Configuration

Create `htk.config.ts` with your site settings (see example above).

### Step 4: Migrate Components

Replace existing components with HTK components:

**Before:**
```typescript
// Old header component
import Header from '../components/Header'

export default function Page() {
  return (
    <>
      <Header />
      <main>Content</main>
      <Footer />
    </>
  )
}
```

**After:**
```typescript
// Using HTK BaseLayout
import { BaseLayout } from '@nextjs-htk/core'

export default function Page() {
  return (
    <BaseLayout title="Page Title">
      <main>Content</main>
    </BaseLayout>
  )
}
```

### Step 5: Update Build Scripts

Update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "deploy": "next build && git add docs && git commit -m 'Deploy' && git push"
  }
}
```

---

## Configuration

### Site Configuration

The `htk.config.ts` file controls all site-wide settings:

```typescript
import { defineConfig } from '@nextjs-htk/core'

export default defineConfig({
  // Required: Site metadata
  site: {
    name: string           // Site name
    title: string          // Default page title
    description: string    // Default meta description
    url: string           // Full site URL (https://...)
    author: string        // Author name
  },

  // Required: Navigation menu
  navigation: [
    {
      label: string       // Menu label
      href: string        // Link URL
      children?: []       // Optional submenu
    }
  ],

  // Required: Footer configuration
  footer: {
    copyright: string     // Copyright notice
    links?: []           // Optional footer links
  },

  // Optional: Social media links
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
    facebook?: string
    instagram?: string
  },

  // Optional: Theme customization
  theme?: {
    colors?: {
      primary?: string
      secondary?: string
    },
    fonts?: {
      body?: string
      heading?: string
    }
  },

  // Optional: SEO settings
  seo?: {
    defaultImage?: string
    twitterCard?: 'summary' | 'summary_large_image'
  },

  // Optional: Analytics
  analytics?: {
    google?: string       // Google Analytics ID
  }
})
```

---

## Using Components

### BaseLayout Component

Provides standard page structure with header, footer, and SEO:

```typescript
import { BaseLayout } from '@nextjs-htk/core'

export default function Page() {
  return (
    <BaseLayout
      title="About Us"
      description="Learn more about our company"
      showHeader={true}
      showFooter={true}
    >
      <section>
        <h1>About Us</h1>
        <p>Content goes here...</p>
      </section>
    </BaseLayout>
  )
}
```

### SEO Component

For custom SEO on specific pages:

```typescript
import { SEO } from '@nextjs-htk/core'

export default function BlogPost({ post }) {
  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.featuredImage}
        url={`https://mysite.com/blog/${post.slug}`}
        type="article"
      />
      <article>
        <h1>{post.title}</h1>
        {/* ... */}
      </article>
    </>
  )
}
```

### Header Component

Standalone header (if not using BaseLayout):

```typescript
import { Header } from '@nextjs-htk/core'

export default function CustomLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
```

### Footer Component

Standalone footer:

```typescript
import { Footer } from '@nextjs-htk/core'

export default function CustomLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
```

---

## Content Management

### Markdown Content

Install the content adapter:

```bash
pnpm add @nextjs-htk/content
```

Configure in `htk.config.ts`:

```typescript
import { createMarkdownSource } from '@nextjs-htk/content/markdown'

export default defineConfig({
  // ... site config ...

  content: {
    blog: createMarkdownSource({
      dir: 'src/posts',
      sortBy: 'date',
      sortOrder: 'desc',
    }),
  },
})
```

Create markdown files in `src/posts/`:

```markdown
---
title: My First Post
date: 2025-01-15
author: Your Name
tags: [nextjs, tutorial]
---

# My First Post

Content goes here...
```

Use in pages:

```typescript
import { getPostBySlug, getAllPosts } from '@nextjs-htk/content/markdown'

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug)

  return {
    props: { post }
  }
}

export default function BlogPost({ post }) {
  return (
    <BaseLayout title={post.title}>
      <article dangerouslySetInnerHTML={{ __html: post.content }} />
    </BaseLayout>
  )
}
```

### JSON Data

For structured data (menus, team members, etc.):

```typescript
import { createJSONSource } from '@nextjs-htk/content/json'

export default defineConfig({
  content: {
    menu: createJSONSource({
      path: 'src/data/menu.json',
    }),
  },
})
```

### External APIs

For data from external sources:

```typescript
import { createGitHubSource } from '@nextjs-htk/content/api'

export default defineConfig({
  content: {
    projects: createGitHubSource({
      org: 'myorg',
      cache: 'src/data/projects.json',
    }),
  },
})
```

---

## Build and Deployment

### Local Development

```bash
pnpm dev
# Site runs at http://localhost:3000
```

### Build for Production

```bash
pnpm build
# Static files generated in docs/
```

### GitHub Pages Deployment

1. **Enable GitHub Pages:**
   - Repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: master, Folder: /docs

2. **Add CNAME file** (for custom domain):

```bash
echo "mysite.com" > docs/CNAME
git add docs/CNAME
git commit -m "Add CNAME"
```

3. **Deploy:**

```bash
# Build and commit
pnpm build
git add docs
git commit -m "Deploy update"
git push
```

### Makefile (Optional)

Create a `Makefile` for convenience:

```makefile
.PHONY: install dev build deploy clean

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

deploy: build
	git add docs
	git commit -m "Deploy $(shell date +%Y-%m-%d)"
	git push

clean:
	rm -rf node_modules .next docs
```

Then use:
```bash
make dev      # Development server
make build    # Build site
make deploy   # Build and deploy
```

---

## Customization

### Custom Styles

Create custom styles in `src/styles/`:

```scss
// src/styles/custom.module.scss
.hero {
  background: var(--primary-color);
  padding: 4rem 2rem;
}
```

Use in components:

```typescript
import styles from '../styles/custom.module.scss'

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1>Welcome</h1>
    </div>
  )
}
```

### Theme Overrides

Override Bootstrap variables:

```scss
// src/styles/theme.scss
$primary: #007bff;
$secondary: #6c757d;

@import '~bootstrap/scss/bootstrap';
```

Import in `_app.tsx`:

```typescript
import '../styles/theme.scss'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

### Custom Components

Create custom components that work alongside HTK:

```typescript
// src/components/CallToAction.tsx
import { Button } from 'react-bootstrap'

export default function CallToAction() {
  return (
    <section className="cta">
      <h2>Ready to get started?</h2>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </section>
  )
}
```

---

## Upgrading

### Check for Updates

```bash
pnpm outdated @nextjs-htk/*
```

### Update Packages

```bash
# Update to latest versions
pnpm update @nextjs-htk/core @nextjs-htk/content @nextjs-htk/build-tools

# Or update to specific version
pnpm add @nextjs-htk/core@0.2.0
```

### Breaking Changes

Check the [CHANGELOG](./CHANGELOG.md) for breaking changes when upgrading major versions.

---

## Troubleshooting

### Build Errors

**Problem:** TypeScript errors about missing types

**Solution:**
```bash
pnpm add -D @types/react @types/react-dom @types/node
```

**Problem:** Module not found errors

**Solution:** Clear cache and rebuild
```bash
rm -rf .next node_modules
pnpm install
pnpm build
```

### Styling Issues

**Problem:** Bootstrap styles not applying

**Solution:** Ensure you import Bootstrap CSS:
```typescript
// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css'
```

### Deployment Issues

**Problem:** 404 errors on GitHub Pages

**Solution:** Ensure trailing slashes are enabled:
```javascript
// next.config.mjs
export default {
  trailingSlash: true,
}
```

---

## Examples

See the `/examples` directory for complete working examples:

- [Minimal Site](./examples/minimal/) - Basic static site
- [Blog](./examples/blog/) - Markdown blog
- [Restaurant](./examples/restaurant/) - Restaurant with menu
- [Business](./examples/business/) - Corporate website

---

## Getting Help

- [Documentation](https://github.com/hacktoolkit/nextjs-htk#readme)
- [Examples](./examples/)
- [Issue Tracker](https://github.com/hacktoolkit/nextjs-htk/issues)
- [Discussions](https://github.com/hacktoolkit/nextjs-htk/discussions)

---

## Next Steps

1. ✅ Install nextjs-htk packages
2. ✅ Create `htk.config.ts`
3. ✅ Configure `next.config.mjs` for static export
4. ✅ Replace components with HTK equivalents
5. ✅ Set up content management (if needed)
6. ✅ Build and deploy to GitHub Pages
7. 🚀 Launch your site!
