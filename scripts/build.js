import fs from 'node:fs'
import path from 'node:path'
import constants from 'node:constants'
import { fileURLToPath } from 'node:url'

const allContents = {}

// 1. generate constants.js in contents
let constantsString = ''
Object.keys(constants).forEach(key => {
  const value = constants[key]
  constantsString += `export var ${key} = ${JSON.stringify(value)};\n`
})
constantsString += 'export default {\n  '
Object.keys(constants).forEach((key, i) => {
  if (i) {
    constantsString += ',\n  '
  }
  constantsString += `${key}: ${key}`
})
constantsString += '\n};\n'
allContents['constants.js'] = constantsString

// 2. generate polyfills.ts
const root = path.join(
  fileURLToPath(new URL(import.meta.url)),
  '../../polyfills'
)

function walk(dir) {
  for (const child of fs.readdirSync(dir)) {
    const childPath = path.join(dir, child)
    if (fs.statSync(childPath).isDirectory()) {
      walk(childPath)
    } else if (!childPath.endsWith('.txt')) {
      allContents[path.relative(root, childPath)] = fs.readFileSync(
        childPath,
        'utf-8'
      )
    }
  }
}

walk(root)

fs.writeFileSync(
  path.join(root, '../src/polyfills.ts'),
  `export default ${JSON.stringify(allContents, null, 2)}`
)
