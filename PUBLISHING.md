# Publishing Guide

This document explains how to publish nextjs-htk packages to npm.

## Prerequisites

1. **NPM Account** - Create an account at https://www.npmjs.com
2. **NPM Access** - Be added as a maintainer to the `@nextjs-htk` scope
3. **NPM Token** - Generate an access token for automation

## Setup NPM Token (First Time)

### 1. Generate NPM Token

```bash
npm login
npm token create --read-only=false
```

Copy the token - you'll need it for GitHub Actions.

### 2. Add Token to GitHub Secrets

1. Go to repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Paste your NPM token
5. Click "Add secret"

## Publishing Methods

### Method 1: Automated (Recommended)

Create a GitHub Release and packages will be automatically published:

```bash
# 1. Update version in all packages
pnpm version patch -r  # or minor, or major

# 2. Commit and push
git add .
git commit -m "chore: bump version to v0.1.1"
git push

# 3. Create and push tag
git tag v0.1.1
git push origin v0.1.1

# 4. Create GitHub Release
# Go to GitHub → Releases → Draft a new release
# Select the tag, add release notes, publish
# GitHub Actions will automatically publish to npm
```

### Method 2: Manual Publishing

For manual control or testing:

```bash
# 1. Login to npm
npm login

# 2. Build all packages
pnpm build

# 3. Publish all packages
pnpm publish -r --access public

# Don't forget to tag and push
git tag v0.1.1
git push origin v0.1.1
```

### Method 3: Single Package

To publish just one package:

```bash
cd packages/core
npm publish --access public
```

## Version Management

We use semantic versioning (semver):

- **MAJOR** (1.0.0) - Breaking changes
- **MINOR** (0.1.0) - New features, backwards compatible
- **PATCH** (0.0.1) - Bug fixes

### Updating Versions

**All packages together:**
```bash
pnpm version patch -r   # 0.1.0 → 0.1.1
pnpm version minor -r   # 0.1.1 → 0.2.0
pnpm version major -r   # 0.2.0 → 1.0.0
```

**Individual package:**
```bash
cd packages/core
pnpm version patch
```

## Pre-release Publishing

For beta/alpha versions:

```bash
# Set pre-release version
pnpm version prepatch --preid=beta -r  # 0.1.0 → 0.1.1-beta.0

# Publish with beta tag
pnpm publish -r --access public --tag beta

# Users install with:
# npm install @nextjs-htk/core@beta
```

## Verifying Publication

After publishing, verify:

```bash
# Check npm registry
npm view @nextjs-htk/core

# Test installation
npm install @nextjs-htk/core@latest

# View all versions
npm view @nextjs-htk/core versions
```

## Unpublishing (Emergency Only)

**Warning:** Unpublishing is permanent and discouraged.

```bash
# Unpublish specific version (within 72 hours)
npm unpublish @nextjs-htk/core@0.1.0

# Deprecate instead (preferred)
npm deprecate @nextjs-htk/core@0.1.0 "This version has critical bugs, use 0.1.1+"
```

## Troubleshooting

### "You do not have permission to publish"

- Ensure you're logged in: `npm whoami`
- Verify package name is correct: `@nextjs-htk/core`
- Check you have publish access to the scope

### "Package name too similar to existing package"

- Ensure you're using the scoped name: `@nextjs-htk/core` not `nextjs-htk-core`

### "Version already exists"

- Bump the version number
- Check npm registry: `npm view @nextjs-htk/core versions`

### GitHub Actions fails to publish

- Verify `NPM_TOKEN` secret is set correctly
- Check token has publish permissions (not read-only)
- Ensure token hasn't expired

## Publishing Checklist

Before publishing:

- [ ] All tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Version bumped appropriately
- [ ] CHANGELOG updated (when we create one)
- [ ] README updated if needed
- [ ] Breaking changes documented

## Release Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat(core): add new component"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/my-feature
   ```

4. **After PR merge:**
   ```bash
   git checkout master
   git pull
   pnpm version minor -r
   git push
   git push --tags
   ```

5. **Create GitHub Release** - This triggers auto-publish

## Package Scope Management

The `@nextjs-htk` scope is owned by the Hacktoolkit npm organization.

To add collaborators:
```bash
npm owner add <username> @nextjs-htk/core
```

To view owners:
```bash
npm owner ls @nextjs-htk/core
```

## Related Documentation

- [NPM Publishing Documentation](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [pnpm Publishing](https://pnpm.io/cli/publish)
