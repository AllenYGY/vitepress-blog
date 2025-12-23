import { readdir, readFile, rm, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import matter from 'gray-matter'

const rootDir = process.cwd()
const docsDir = path.join(rootDir, 'docs')
const legacySlidesDir = path.join(rootDir, 'slides')
const outRoot = path.join(docsDir, 'public', 'slides')
const slidevBin = path.join(
  rootDir,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'slidev.cmd' : 'slidev'
)
const globalShikiSetupPath = path.join(rootDir, 'setup', 'shiki.ts')
const globalShikiSetup = existsSync(globalShikiSetupPath)
  ? await readFile(globalShikiSetupPath, 'utf8')
  : ''

const decks = []
await collectFromDocs(docsDir)
await collectFromLegacy(legacySlidesDir)

if (!decks.length) {
  console.log('No Slidev decks found.')
  process.exit(0)
}

await rm(outRoot, { recursive: true, force: true })

for (const deck of decks) {
  const outDir = path.join(outRoot, deck.outputPath)
  const base = encodeURI(`/slides/${toPosix(deck.outputPath)}/`)
  const cleanup = await ensureLocalShikiSetup(deck.sourcePath)

  try {
    await rm(outDir, { recursive: true, force: true })
    await run(slidevBin, ['build', deck.sourcePath, '--out', outDir, '--base', base])
  } finally {
    if (cleanup) {
      await cleanup()
    }
  }
}

async function collectFromDocs(dir) {
  await walk(dir, dir, async (entryPath, relParts, entry) => {
    if (!entry.name.endsWith('.md')) return

    const src = await readFile(entryPath, 'utf8')
    const { data } = matter(src)
    const slidevEnabled =
      data && (data.slidev === true || String(data.slidev).toLowerCase() === 'true')
    if (!slidevEnabled) return

    const relFromDocs = path.relative(docsDir, entryPath)
    const relDir = path.dirname(relFromDocs)

    const baseName = path.basename(relFromDocs, '.md')

    const outputPath =
      relDir === '.' ? baseName : path.join(relDir, baseName)
    decks.push({ sourcePath: entryPath, outputPath })
  })
}

async function collectFromLegacy(dir) {
  await walk(dir, dir, async (entryPath, relParts, entry) => {
    if (!entry.name.endsWith('.md')) return

    const relFromSlides = path.relative(dir, entryPath)
    const relDir = path.dirname(relFromSlides)
    let baseName = path.basename(relFromSlides, '.md')
    const outputPath =
      relDir === '.' ? baseName : path.join(relDir, baseName)

    decks.push({ sourcePath: entryPath, outputPath })
  })
}

async function walk(rootDir, currentDir, onFile) {
  let entries = []
  try {
    entries = await readdir(currentDir, { withFileTypes: true })
  } catch (_error) {
    return
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue
      await walk(rootDir, path.join(currentDir, entry.name), onFile)
      continue
    }

    if (!entry.isFile()) continue
    const entryPath = path.join(currentDir, entry.name)
    const relParts = path
      .relative(rootDir, entryPath)
      .split(path.sep)
      .filter(Boolean)
    await onFile(entryPath, relParts, entry)
  }
}

function shouldSkipDir(name) {
  return (
    name === '.git' ||
    name === 'node_modules' ||
    name === '.vitepress' ||
    name === 'public' ||
    name === 'dist'
  )
}

function toPosix(value) {
  return value.split(path.sep).join('/')
}

async function ensureLocalShikiSetup(sourcePath) {
  if (!globalShikiSetup) return null

  const deckDir = path.dirname(sourcePath)
  const localSetupDir = path.join(deckDir, 'setup')
  const localSetupPath = path.join(localSetupDir, 'shiki.ts')

  if (existsSync(localSetupPath)) return null

  await mkdir(localSetupDir, { recursive: true })
  await writeFile(localSetupPath, globalShikiSetup, 'utf8')
  return async () => {
    try {
      await rm(localSetupPath, { force: true })
    } catch (_error) {
      return
    }
    try {
      const entries = await readdir(localSetupDir)
      if (entries.length === 0) {
        await rm(localSetupDir, { recursive: true, force: true })
      }
    } catch (_error) {
      return
    }
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      env: {
        ...process.env,
        NI_DEFAULT_AGENT: 'npm',
        NI_GLOBAL_AGENT: 'npm',
      },
    })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} ${args.join(' ')} failed: ${code}`))
    })
  })
}
