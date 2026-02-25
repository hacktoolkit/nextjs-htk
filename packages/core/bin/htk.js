#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates')
const commands = {
  init: 'Initialize a new nextjs-htk project with standard files',
  sync: 'Sync standard files from nextjs-htk templates',
  'sync:makefile': 'Sync only the Makefile',
  'sync:scripts': 'Sync only the scripts directory',
  help: 'Show this help message'
}

function showHelp() {
  console.log('\n@nextjs-htk/core CLI\n')
  console.log('Usage: npx @nextjs-htk/core <command>\n')
  console.log('Available commands:\n')
  Object.entries(commands).forEach(([cmd, desc]) => {
    console.log(`  ${cmd.padEnd(20)} ${desc}`)
  })
  console.log()
}

function copyFile(src, dest, options = {}) {
  const { force = false } = options

  if (fs.existsSync(dest) && !force) {
    console.log(`  ⚠️  ${path.basename(dest)} already exists, skipping (use --force to overwrite)`)
    return false
  }

  fs.copyFileSync(src, dest)
  console.log(`  ✓ ${path.basename(dest)}`)
  return true
}

function copyDirectory(src, dest, options = {}) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, options)
    } else {
      copyFile(srcPath, destPath, options)
    }
  }
}

function syncMakefile(options) {
  console.log('\nSyncing Makefile...')
  const src = path.join(TEMPLATES_DIR, 'Makefile')
  const dest = path.join(process.cwd(), 'Makefile')
  copyFile(src, dest, options)
}

function syncScripts(options) {
  console.log('\nSyncing scripts...')
  const src = path.join(TEMPLATES_DIR, 'scripts')
  const dest = path.join(process.cwd(), 'src', 'scripts')

  if (!fs.existsSync(src)) {
    console.log('  ⚠️  No scripts template directory found')
    return
  }

  copyDirectory(src, dest, options)
}

function init(options) {
  console.log('\nInitializing nextjs-htk project...\n')
  syncMakefile(options)
  syncScripts(options)
  console.log('\n✓ Project initialized successfully!\n')
}

function sync(options) {
  console.log('\nSyncing all templates...\n')
  syncMakefile(options)
  syncScripts(options)
  console.log('\n✓ Sync complete!\n')
}

// Parse command line arguments
const args = process.argv.slice(2)
const command = args[0]
const flags = args.slice(1)
const options = {
  force: flags.includes('--force') || flags.includes('-f')
}

// Execute command
switch (command) {
  case 'init':
    init(options)
    break
  case 'sync':
    sync(options)
    break
  case 'sync:makefile':
    syncMakefile(options)
    break
  case 'sync:scripts':
    syncScripts(options)
    break
  case 'help':
  case '--help':
  case '-h':
  case undefined:
    showHelp()
    break
  default:
    console.log(`\n❌ Unknown command: ${command}\n`)
    showHelp()
    process.exit(1)
}
