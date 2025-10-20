# NextJS-HTK

> A modern, TypeScript-first framework for building static Next.js sites with GitHub Pages deployment

## Overview

NextJS-HTK is a comprehensive framework that provides everything you need to build, manage, and deploy static websites. Built on Next.js and React, it offers:

- 📦 Reusable components and utilities
- 🎨 Pre-built templates for common site types
- 🚀 Optimized static site generation
- 📝 Multiple content source adapters (Markdown, JSON, APIs)
- 🛠️ CLI tools for scaffolding and deployment
- ✅ TypeScript-first with best practices built-in

## Project Status

🚧 **In Development** - Phase 1: Foundation

Currently building the core framework infrastructure. See [nextjs_plan.md](./nextjs_plan.md) for the complete roadmap.

## Packages

- **@nextjs-htk/core** - Core components, hooks, and utilities
- **@nextjs-htk/content** - Content source adapters (Markdown, JSON, APIs)
- **@nextjs-htk/templates** - Pre-built site templates
- **@nextjs-htk/cli** - Command-line tools
- **@nextjs-htk/build-tools** - Build and deployment utilities

## Quick Start

```bash
# Create a new site (coming soon)
npx create-nextjs-htk my-site --template=minimal

# Or clone and develop the framework
git clone <repository-url>
cd nextjs-htk
pnpm install
pnpm dev
```

## Requirements

- Node.js >= 20.0.0
- pnpm >= 8.0.0

## Development

```bash
# Install dependencies
pnpm install

# Run development mode (watches all packages)
pnpm dev

# Build all packages
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format

# Clean all build artifacts
pnpm clean
```

## Architecture

This is a pnpm workspace monorepo with the following structure:

```
nextjs-htk/
├── packages/          # Framework packages
│   ├── core/         # Core components and utilities
│   ├── content/      # Content adapters
│   ├── templates/    # Site templates
│   ├── cli/          # CLI tools
│   └── build-tools/  # Build utilities
├── templates/        # Starter templates
├── docs/             # Documentation
├── examples/         # Example sites
└── scripts/          # Development scripts
```

## Templates

- **minimal** - Basic static site
- **business** - Corporate/service business site
- **restaurant** - Restaurant/cafe with menu
- **blog** - Markdown blog with categories

## Features

### 🎯 Core Features
- **TypeScript-first** - Full type safety and IntelliSense support
- **Static Site Generation** - Optimized for performance and SEO
- **GitHub Pages Ready** - Deploy with zero configuration
- **Modular Architecture** - Use only what you need
- **Extensible** - Plugin system for content sources and features

### 📝 Content Management
- **Markdown Support** - Write content in markdown with frontmatter
- **JSON Data Sources** - Structured data from JSON files
- **External APIs** - Integrate with GitHub, Airtable, or custom APIs
- **Type-Safe Configuration** - TypeScript-based configuration system

### 🎨 UI Components
- **React Bootstrap** - Production-ready UI components
- **Responsive Design** - Mobile-first, accessible components
- **Customizable Themes** - Easy color and typography customization
- **SEO Optimized** - Built-in meta tags and OpenGraph support

### 🛠️ Developer Experience
- **Fast Builds** - Optimized build process with pnpm workspaces
- **Hot Reload** - Instant feedback during development
- **Code Quality** - ESLint, Prettier, and TypeScript built-in
- **CLI Tools** - Scaffold projects and automate deployments

## Use Cases

NextJS-HTK is perfect for:
- 📱 Personal blogs and portfolios
- 🏢 Business and marketing websites
- 🍽️ Restaurant and cafe sites with menus
- 📚 Documentation sites
- 🎨 Creative portfolios
- 📰 News and content sites

## Documentation

- [Integration Guide](./INTEGRATION.md) - How to use nextjs-htk in your project
- [Publishing Guide](./PUBLISHING.md) - For framework maintainers
- [Contributing Guidelines](./CONTRIBUTING.md) - How to contribute

## Examples

Check out the `/examples` directory for working examples:
- Minimal static site
- Blog with markdown posts
- Restaurant site with menu
- Business/corporate site

## Contributing

We welcome contributions! NextJS-HTK is an open-source project and we'd love your help making it better.

**How to contribute:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and commit (`git commit -m 'Add amazing feature'`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## Community

- **GitHub Issues** - Bug reports and feature requests
- **Discussions** - Questions and community support
- **Pull Requests** - Code contributions welcome

## Roadmap

**Phase 1: Foundation** (In Progress)
- ✅ Core framework setup
- ✅ Package configuration
- 🚧 Core components (BaseLayout, Header, Footer, SEO)
- 🚧 Content adapters (Markdown, JSON, API)

**Phase 2: Content System**
- Content source adapters
- Blog template with markdown
- Restaurant template with JSON menu

**Phase 3: Templates & CLI**
- Pre-built templates
- CLI scaffolding tool
- Configuration wizard

## License

MIT
