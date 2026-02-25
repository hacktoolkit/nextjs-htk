# nextjs-htk CLI

The `@hacktoolkit/nextjs-htk` package includes a CLI tool to help standardize project setup and maintain consistency across all nextjs-htk projects.

## Installation

The CLI is automatically available when you install `@hacktoolkit/nextjs-htk`:

```bash
npm install @hacktoolkit/nextjs-htk
```

## Usage

### Initialize a new project

Copy all standard files (Makefile, scripts, etc.) to your project:

```bash
npx @hacktoolkit/nextjs-htk init
```

Or if you have the package installed locally:

```bash
npm exec htk init
```

### Sync existing project

Update your project with the latest templates from nextjs-htk:

```bash
npx @hacktoolkit/nextjs-htk sync
```

### Sync specific files

Sync only the Makefile:

```bash
npx @hacktoolkit/nextjs-htk sync:makefile
```

Sync only the scripts directory:

```bash
npx @hacktoolkit/nextjs-htk sync:scripts
```

### Force overwrite

By default, the CLI will not overwrite existing files. Use `--force` or `-f` to overwrite:

```bash
npx @hacktoolkit/nextjs-htk init --force
npx @hacktoolkit/nextjs-htk sync:makefile -f
```

### Help

Show all available commands:

```bash
npx @hacktoolkit/nextjs-htk help
```

## What files are synced?

### Makefile
Standard Makefile with common targets:
- `make help` - Show all available targets
- `make install` - Install dependencies
- `make dev` - Start development server
- `make build` - Build for production
- `make deploy` - Build and deploy to GitHub Pages
- `make clean` - Clean build artifacts

### Scripts
- `src/scripts/generate_sitemap.ts` - Generate sitemap.xml during build

## Using shared utilities

The package also exports utilities you can use in your code:

```typescript
import { generateSitemap } from '@hacktoolkit/nextjs-htk/utils'
import type { SitemapConfig } from '@hacktoolkit/nextjs-htk/utils'

const config: SitemapConfig = {
  siteUrl: 'https://example.com',
  pages: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about/' }
  ]
}

const sitemap = generateSitemap(config)
```

## Adding to package.json scripts

You can add convenience scripts to your `package.json`:

```json
{
  "scripts": {
    "htk:init": "htk init",
    "htk:sync": "htk sync",
    "htk:sync:makefile": "htk sync:makefile"
  }
}
```

Then run with:

```bash
npm run htk:init
npm run htk:sync
```

## Integration with build process

The sitemap generation script integrates with your Next.js build:

1. Make sure your `htk.config.ts` is properly configured
2. Add the sitemap generation to your build script in `package.json`:

```json
{
  "scripts": {
    "build": "next build && tsx src/scripts/generate_sitemap.ts"
  }
}
```

3. The sitemap will be automatically generated in your build directory

## Examples

### First time setup

```bash
cd my-nextjs-htk-project
npm install @hacktoolkit/nextjs-htk
npx @hacktoolkit/nextjs-htk init
```

### Update to latest templates

```bash
npx @hacktoolkit/nextjs-htk sync --force
```

### Just update the Makefile

```bash
npx @hacktoolkit/nextjs-htk sync:makefile --force
```
