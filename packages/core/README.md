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
