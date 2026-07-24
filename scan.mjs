// Scan a folder of screenshots -> copy into public/screenshots/ and (re)build
// public/data.json. Existing metadata (tags/imagePrompt/brief/category) is
// preserved on re-scan, keyed by filename — so Claude's analysis isn't wiped.
//
// Usage:  node scan.mjs "C:\path\to\your\screenshots"
//   or set SHELF_SRC env var. Sub-folder name is used as the category guess
//   (landing/dashboard/mobile/spec); otherwise "Landing".
//
// ponytail: no image-dimension parsing here (browser reads naturalWidth on load),
//   no watch mode — re-run when you add screenshots. add watch if that annoys you.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = process.argv[2] || process.env.SHELF_SRC
const OUT_IMG = path.join(__dirname, 'public', 'screenshots')
const OUT_JSON = path.join(__dirname, 'public', 'data.json')
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg'])
const KNOWN = ['landing', 'dashboard', 'mobile', 'spec']

if (!SRC) {
  console.error('Give a source folder:  node scan.mjs "C:\\path\\to\\screenshots"')
  process.exit(1)
}
if (!fs.existsSync(SRC)) {
  console.error('Folder not found: ' + SRC)
  process.exit(1)
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// walk recursively, remember which sub-folder each image came from
function walk(dir, rel = '') {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const st = fs.statSync(full)
    if (st.isDirectory()) out.push(...walk(full, path.join(rel, name)))
    else if (EXT.has(path.extname(name).toLowerCase())) out.push({ full, rel, name, mtime: st.mtime })
  }
  return out
}

function guessCategory(rel) {
  const first = rel.split(path.sep)[0]?.toLowerCase() || ''
  return KNOWN.includes(first) ? cap(first) : 'Landing'
}

// keep existing metadata
let prev = {}
if (fs.existsSync(OUT_JSON)) {
  try {
    for (const it of JSON.parse(fs.readFileSync(OUT_JSON, 'utf8'))) prev[it.id] = it
  } catch {}
}

fs.mkdirSync(OUT_IMG, { recursive: true })
const found = walk(SRC)
const items = found.map(({ full, rel, name, mtime }) => {
  const id = (rel ? rel.replace(/[\\/]/g, '-') + '-' : '') + name
  const dest = path.join(OUT_IMG, id)
  // re-indexing public/screenshots itself: don't copy a file onto itself
  if (path.resolve(full) !== path.resolve(dest)) fs.copyFileSync(full, dest)
  const p = prev[id] || {}
  return {
    id,
    file: '/screenshots/' + encodeURIComponent(id),
    name: p.name || path.parse(name).name.replace(/[-_]+/g, ' '),
    category: p.category || guessCategory(rel),
    tags: p.tags || [],
    imagePrompt: p.imagePrompt || '',
    brief: p.brief || '',
    addedAt: p.addedAt || mtime.toISOString().slice(0, 10),
  }
})

items.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
fs.writeFileSync(OUT_JSON, JSON.stringify(items, null, 2))

const missing = items.filter((i) => !i.tags.length).length
console.log(`Scanned ${items.length} screenshot(s) -> public/data.json`)
if (missing) console.log(`${missing} still need metadata (tags/imagePrompt/brief) — ask Claude to fill them.`)
