import { readdir, readFile, writeFile, stat, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const docsDir = path.join(rootDir, 'docs')
const cacheDir = path.join(docsDir, '.vitepress', 'cache')
const cacheFile = path.join(cacheDir, 'frontmatter-cache.json')

const SKIP_DIRS = new Set(['.git', 'node_modules', '.vitepress', 'public', 'dist'])

const skipSanitize =
  process.env.SANITIZE_FRONTMATTER === '0' ||
  process.env.SANITIZE_FRONTMATTER === 'false'

if (skipSanitize) {
  console.log('Frontmatter sanitize skipped.')
  process.exit(0)
}

let changedCount = 0

const previousCache = await readCache()
const nextCache = { files: {} }

await walk(docsDir)

await writeCache()

if (changedCount > 0) {
  console.log(`Normalized frontmatter in ${changedCount} file(s).`)
}

async function walk(dir) {
  let entries = []
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch (_error) {
    return
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      await walk(fullPath)
      continue
    }
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue
    await sanitizeFile(fullPath)
  }
}

async function sanitizeFile(filePath) {
  const cacheKey = toCacheKey(filePath)
  let fileStat
  try {
    fileStat = await stat(filePath)
  } catch (_error) {
    return
  }
  const previousEntry = previousCache.files[cacheKey]
  if (
    previousEntry &&
    previousEntry.mtimeMs === fileStat.mtimeMs &&
    previousEntry.size === fileStat.size
  ) {
    nextCache.files[cacheKey] = previousEntry
    return
  }

  let text = ''
  try {
    const buffer = await readFile(filePath)
    text = buffer.toString('utf8')
  } catch (_error) {
    return
  }

  let updated = text.replace(/\u0000/g, '')
  if (!updated.startsWith('---')) {
    if (updated !== text) {
      await writeFile(filePath, updated, 'utf8')
      changedCount += 1
      fileStat = await stat(filePath)
    }
    nextCache.files[cacheKey] = {
      mtimeMs: fileStat.mtimeMs,
      size: fileStat.size,
    }
    return
  }

  const lines = updated.split('\n')
  let endIndex = -1
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') {
      endIndex = i
      break
    }
  }

  if (endIndex === -1) {
    if (updated !== text) {
      await writeFile(filePath, updated, 'utf8')
      changedCount += 1
      fileStat = await stat(filePath)
    }
    nextCache.files[cacheKey] = {
      mtimeMs: fileStat.mtimeMs,
      size: fileStat.size,
    }
    return
  }

  const frontmatter = lines.slice(1, endIndex).join('\n')
  const cleanedFrontmatter = frontmatter
    .replace(/\u00a0/g, ' ')
    .replace(/\t/g, '  ')

  if (cleanedFrontmatter !== frontmatter) {
    const nextLines = cleanedFrontmatter.split('\n')
    lines.splice(1, endIndex - 1, ...nextLines)
    updated = lines.join('\n')
  }

  if (updated !== text) {
    await writeFile(filePath, updated, 'utf8')
    changedCount += 1
    fileStat = await stat(filePath)
  }
  nextCache.files[cacheKey] = {
    mtimeMs: fileStat.mtimeMs,
    size: fileStat.size,
  }
}

function toCacheKey(filePath) {
  return path.relative(docsDir, filePath).split(path.sep).join('/')
}

async function readCache() {
  if (!existsSync(cacheFile)) {
    return { files: {} }
  }
  try {
    const raw = await readFile(cacheFile, 'utf8')
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.files) {
      return { files: parsed.files }
    }
  } catch (_error) {
    return { files: {} }
  }
  return { files: {} }
}

async function writeCache() {
  try {
    await mkdir(cacheDir, { recursive: true })
    await writeFile(cacheFile, JSON.stringify(nextCache, null, 2), 'utf8')
  } catch (_error) {
    return
  }
}
