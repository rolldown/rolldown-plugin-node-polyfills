import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(
  fileURLToPath(new URL(import.meta.url)),
  '../../polyfills'
)

const allContents = {}

function walk(dir) {
  for (const child of fs.readdirSync(dir)) {
    const childPath = path.join(dir, child)
    if (fs.statSync(childPath).isDirectory()) {
      walk(childPath)
    } else {
      allContents[childPath] = fs.readFileSync(childPath, 'utf-8')
    }
  }
}

walk(root)
