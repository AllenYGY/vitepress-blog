import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const docsDir = path.join(rootDir, 'docs')

const SKIP_DIRS = new Set(['.git', 'node_modules', '.vitepress', 'public', 'dist'])

let changedCount = 0

await walk(docsDir)

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
  }
}
