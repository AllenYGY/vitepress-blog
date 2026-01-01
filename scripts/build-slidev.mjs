import { readdir, readFile, rm, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import matter from 'gray-matter'
import crypto from 'node:crypto'

const rootDir = process.cwd()
const docsDir = path.join(rootDir, 'docs')
const legacySlidesDir = path.join(rootDir, 'slides')
const outRoot = path.join(docsDir, 'public', 'slides')
const cacheFile = path.join(outRoot, '.build-cache.json')
const slidevBin = path.join(
  rootDir,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'slidev.cmd' : 'slidev'
)
const skipSlidev =
  process.env.SLIDEV_SKIP === '1' || process.env.SLIDEV_SKIP === 'true'

if (skipSlidev) {
  console.log('Slidev build skipped.')
  process.exit(0)
}
const globalShikiSetupPath = path.join(rootDir, 'setup', 'shiki.ts')
const globalShikiSetup = existsSync(globalShikiSetupPath)
  ? await readFile(globalShikiSetupPath, 'utf8')
  : ''

const slidevVersion = await getSlidevVersion()
const globalSignature = hashText(`${globalShikiSetup}\n${slidevVersion}`)
const previousCache = await readCache()
const forceRebuild = process.env.SLIDEV_FORCE_REBUILD === '1'
const rebuildAll = forceRebuild || previousCache?.globalSignature !== globalSignature

if (rebuildAll) {
  await rm(outRoot, { recursive: true, force: true })
}
await mkdir(outRoot, { recursive: true })

const decks = []
await collectFromDocs(docsDir)
await collectFromLegacy(legacySlidesDir)

if (!decks.length) {
  console.log('No Slidev decks found.')
  process.exit(0)
}

await pruneOutputs(decks)

const nextCache = {
  globalSignature,
  decks: {},
}

for (const deck of decks) {
  const outDir = path.join(outRoot, deck.outputPath)
  const base = encodeURI(`/slides/${toPosix(deck.outputPath)}/`)
  const cleanup = await ensureLocalShikiSetup(deck.sourcePath)
  const prevEntry = previousCache?.decks?.[deck.outputPath]
  const hasOutput = existsSync(outDir)
  const shouldBuild =
    rebuildAll || !prevEntry || prevEntry.hash !== deck.hash || !hasOutput

  try {
    if (shouldBuild) {
      await rm(outDir, { recursive: true, force: true })
      await run(slidevBin, ['build', deck.sourcePath, '--out', outDir, '--base', base])
    } else {
      console.log(`[slidev] skip ${deck.sourcePath}`)
    }
  } finally {
    if (cleanup) {
      await cleanup()
    }
  }
  nextCache.decks[deck.outputPath] = {
    hash: deck.hash,
    sourcePath: deck.sourcePath,
  }
}

await writeFile(cacheFile, JSON.stringify(nextCache, null, 2), 'utf8')

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

    const outputPath = relDir === '.' ? baseName : path.join(relDir, baseName)
    decks.push({ sourcePath: entryPath, outputPath, hash: hashText(src) })
  })
}

async function collectFromLegacy(dir) {
  await walk(dir, dir, async (entryPath, relParts, entry) => {
    if (!entry.name.endsWith('.md')) return

    const src = await readFile(entryPath, 'utf8')
    const relFromSlides = path.relative(dir, entryPath)
    const relDir = path.dirname(relFromSlides)
    let baseName = path.basename(relFromSlides, '.md')
    const outputPath =
      relDir === '.' ? baseName : path.join(relDir, baseName)

    decks.push({ sourcePath: entryPath, outputPath, hash: hashText(src) })
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

async function pruneOutputs(decks) {
  if (!existsSync(outRoot)) return
  const keep = new Set(decks.map((deck) => toPosix(deck.outputPath)))
  const keepPrefixes = new Set()
  for (const value of keep) {
    const parts = value.split('/')
    for (let i = 1; i <= parts.length; i += 1) {
      keepPrefixes.add(parts.slice(0, i).join('/'))
    }
  }

  await pruneDir(outRoot, '', keep, keepPrefixes)
}

async function pruneDir(dirPath, relPath, keep, keepPrefixes) {
  let entries = []
  try {
    entries = await readdir(dirPath, { withFileTypes: true })
  } catch (_error) {
    return
  }

  for (const entry of entries) {
    if (entry.name === path.basename(cacheFile)) continue
    if (!entry.isDirectory()) continue
    const nextRel = relPath ? `${relPath}/${entry.name}` : entry.name
    if (keep.has(nextRel)) continue
    if (!keepPrefixes.has(nextRel)) {
      await rm(path.join(dirPath, entry.name), { recursive: true, force: true })
      continue
    }
    await pruneDir(path.join(dirPath, entry.name), nextRel, keep, keepPrefixes)
  }
}

async function readCache() {
  if (!existsSync(cacheFile)) return null
  try {
    const raw = await readFile(cacheFile, 'utf8')
    return JSON.parse(raw)
  } catch (_error) {
    return null
  }
}

async function getSlidevVersion() {
  try {
    const pkgPath = path.join(rootDir, 'package.json')
    const pkg = JSON.parse(await readFile(pkgPath, 'utf8'))
    return (
      pkg.devDependencies?.['@slidev/cli'] ||
      pkg.dependencies?.['@slidev/cli'] ||
      ''
    )
  } catch (_error) {
    return ''
  }
}

function hashText(value) {
  return crypto.createHash('sha1').update(value).digest('hex')
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
