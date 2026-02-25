# Testing Strategy

## Philosophy

Before publishing a new version to npm, we must verify the **full pipeline** end-to-end:

**Source code** -> **TypeScript build** -> **npm pack** -> **npm install (tarball)** -> **Consumer site build** -> **Live site verification**

This ensures the package is correctly built, packaged, and consumable by real downstream projects. Unit tests alone cannot catch packaging issues (missing files, broken exports, module format mismatches, etc.).

## Pre-Publish Checklist

### 1. Build the package

```bash
cd packages/core
rm -rf dist tsconfig.tsbuildinfo
npx tsc
```

Verify: no errors, `dist/` directory populated.

### 2. Pack the tarball

```bash
npm pack --dry-run   # inspect contents first
npm pack             # create the .tgz
```

Verify:
- No warnings (especially about `bin` entries being removed)
- All expected files present: `dist/`, `templates/`, `bin/`, `README.md`, `LICENSE`
- No unexpected files (no `src/`, no internal planning docs)

### 3. Install into consumer projects

```bash
cd /path/to/consumer-project
rm -rf node_modules/@hacktoolkit .next
npm install /path/to/hacktoolkit-nextjs-htk-X.Y.Z.tgz
make build
```

Repeat for each consumer project.

Verify: build completes successfully.

### 4. Verify on dev/staging site

If you have a dev or staging environment that serves from the `docs/` directory (Next.js static export), `make build` immediately updates the live site. Verify with `curl` or a browser.

### 5. Break-fix test

To confirm the package is actually being used (not cached/stale):

1. **Break**: Modify a function in the package source (e.g., prefix `buildFullAddress` output with `BROKEN-PKG-TEST`)
2. **Build + Pack**: `npx tsc && npm pack`
3. **Install**: `npm install /path/to/tarball.tgz`
4. **Rebuild consumer**: `rm -rf .next && make build`
5. **Verify broken**: Check the built output or dev site and confirm the broken output appears
6. **Fix**: Revert the source change
7. **Repeat steps 2-4**
8. **Verify fixed**: Confirm the broken output is gone

**Important**: Always `rm -rf .next` before rebuilding - Next.js aggressively caches and may serve stale output.

## Known Gotchas

- **`tsconfig.tsbuildinfo` cache**: If `incremental: true` is set (inherited from root tsconfig), tsc may skip emitting files if it thinks nothing changed. Always delete `tsconfig.tsbuildinfo` before a clean build.
- **Next.js `.next` cache**: Must `rm -rf .next` when testing package changes, otherwise the consumer build may use cached modules.
- **`"type": "module"` incompatibility**: The compiled TypeScript output uses extensionless imports (`export * from './address'`). Node.js ESM requires explicit extensions, so `"type": "module"` must NOT be set. Bundlers (Next.js/webpack) handle extensionless imports fine.
- **npm tarball vs symlink**: When installing from a tarball (`npm install ./file.tgz`), npm copies files. When using `file:` protocol in package.json, npm creates a symlink. The tarball test is closer to what real consumers experience from npm.
