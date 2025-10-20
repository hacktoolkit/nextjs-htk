# Contributing to NextJS-HTK

Thank you for your interest in contributing to NextJS-HTK! This document provides guidelines and instructions for contributing to the project.

## Project Status

NextJS-HTK is currently in **Phase 1: Foundation** development. We are building the core framework infrastructure and establishing patterns that will be used across all packages.

## Development Setup

### Prerequisites

- Node.js >= 20.0.0 (check `.nvmrc` for exact version)
- pnpm >= 8.0.0
- Git

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/hacktoolkit/nextjs-htk.git
   cd nextjs-htk
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build all packages:
   ```bash
   pnpm build
   ```

4. Run in development mode:
   ```bash
   pnpm dev
   ```

## Project Structure

This is a pnpm workspace monorepo:

```
nextjs-htk/
├── packages/          # Framework packages
│   ├── core/         # Core components and utilities
│   ├── content/      # Content source adapters
│   ├── templates/    # Site template components
│   ├── cli/          # Command-line tools
│   └── build-tools/  # Build and deployment utilities
├── templates/        # Starter templates
├── docs/             # Documentation site
└── examples/         # Example implementations
```

## Development Workflow

### Working on a Package

1. Navigate to the package directory:
   ```bash
   cd packages/core
   ```

2. Make your changes

3. Run the package in watch mode:
   ```bash
   pnpm dev
   ```

4. Test your changes:
   ```bash
   pnpm test
   ```

### Code Style

We use ESLint and Prettier to maintain code quality:

```bash
# Check linting
pnpm lint

# Format code
pnpm format
```

**Code style guidelines:**
- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Write descriptive variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Commits

We follow conventional commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(core): add BaseLayout component

Add a base layout component that provides common page structure
including header, footer, and SEO meta tags.

feat(content): add markdown content adapter

Implement markdown content source using gray-matter and remark.
Supports frontmatter parsing and HTML conversion.

fix(build-tools): correct sitemap generation paths

Ensure sitemap URLs use trailing slashes for consistency
with Next.js static export configuration.
```

### Branching Strategy

- `master` - Main development branch
- `feature/<name>` - Feature branches
- `fix/<name>` - Bug fix branches
- `docs/<name>` - Documentation branches

**Workflow:**
1. Create a branch from `master`
2. Make your changes
3. Push your branch
4. Create a pull request

## Adding New Features

### Adding a Component

1. Create component file in `packages/core/src/components/`
2. Export from `packages/core/src/components/index.ts`
3. Add TypeScript types in component or `packages/core/src/types/`
4. Update package README with usage example
5. Add tests (when test infrastructure is ready)

### Adding a Content Adapter

1. Create adapter in `packages/content/src/<adapter-name>/`
2. Implement the content adapter interface
3. Export from `packages/content/src/index.ts`
4. Add documentation and examples
5. Add tests

### Adding a Template

1. Create template directory in `templates/<template-name>/`
2. Set up Next.js project structure
3. Configure htk.config.ts
4. Add README with template documentation
5. Ensure it builds and exports correctly

## Testing

Testing infrastructure is being developed. Guidelines will be added here once established.

For now, ensure:
- Code compiles without TypeScript errors
- Package builds successfully
- Manual testing shows expected behavior

## Documentation

- Update README files when adding features
- Add JSDoc comments to public APIs
- Update the main documentation site (when available)
- Include code examples in documentation

## Pull Request Process

1. **Create PR** with descriptive title and description
2. **Link related issues** if applicable
3. **Ensure CI passes** (linting, builds, tests)
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Squash commits** if requested before merge

**PR Description Template:**

```markdown
## Description
Brief description of what this PR does

## Changes
- List of changes
- Another change

## Testing
How this was tested

## Related Issues
Closes #123
```

## Code Review Guidelines

When reviewing PRs:
- Be constructive and respectful
- Focus on code quality, not personal preferences
- Suggest improvements with examples
- Approve when changes meet quality standards

## Getting Help

- Review existing code for patterns
- Ask questions in pull request comments
- Open a discussion in GitHub Discussions
- Reach out to maintainers

## Areas We Need Help

Current priorities (Phase 1):
- [ ] Core components (BaseLayout, Header, Footer, SEO)
- [ ] Content adapters (Markdown, JSON, API)
- [ ] Build tools (sitemap, GitHub Pages optimizer)
- [ ] Documentation site
- [ ] Example templates

Check the GitHub issues for specific tasks and feature requests.

## License

By contributing to NextJS-HTK, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Documentation site (when available)

Thank you for contributing to NextJS-HTK!
