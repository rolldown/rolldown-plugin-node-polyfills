import type { Plugin } from 'rolldown'
import { mods } from './modules'
import { posix } from 'node:path'
import { randomBytes } from 'node:crypto'
import POLYFILLS from './polyfills'

// Node import paths use POSIX separators
const { dirname, relative, join } = posix

const PREFIX = `\0polyfill-node.`
const PREFIX_LENGTH = PREFIX.length

const DIRNAME_PATH = '\0node-polyfills:dirname'
const FILENAME_PATH = '\0node-polyfills:filename'

export interface NodePolyfillsOptions {
  baseDir?: string
}

export default function (opts: NodePolyfillsOptions = {}): Plugin {
  const basedir = opts.baseDir || '/'
  const dirs = new Map<string, string>()
  return {
    name: 'polyfill-node',
    options(options) {
      return {
        ...options,
        inject: {
          process: PREFIX + 'process',
          Buffer: [PREFIX + 'buffer', 'Buffer'],
          global: PREFIX + 'global',
          __filename: FILENAME_PATH,
          __dirname: DIRNAME_PATH,
          ...options.inject
        }
      }
    },
    resolveId(importee: string, importer?: string) {
      // Fixes commonjs compatability: https://github.com/FredKSchott/rollup-plugin-polyfill-node/pull/42
      if (importee[0] == '\0' && /\?commonjs-\w+$/.test(importee)) {
        importee = importee.slice(1).replace(/\?commonjs-\w+$/, '')
      }
      if (importee === DIRNAME_PATH) {
        const id = getRandomId()
        dirs.set(id, dirname('/' + relative(basedir, importer!)))
        return { id, moduleSideEffects: false }
      }
      if (importee === FILENAME_PATH) {
        const id = getRandomId()
        dirs.set(id, dirname('/' + relative(basedir, importer!)))
        return { id, moduleSideEffects: false }
      }
      if (importee && importee.slice(-1) === '/') {
        importee = importee.slice(0, -1)
      }
      if (importer && importer.startsWith(PREFIX) && importee.startsWith('.')) {
        importee =
          PREFIX +
          join(
            importer.substr(PREFIX_LENGTH).replace('.js', ''),
            '..',
            importee
          ) +
          '.js'
      }
      if (importee.startsWith(PREFIX)) {
        importee = importee.substr(PREFIX_LENGTH)
      }
      if (
        mods.has(importee) ||
        (POLYFILLS as any)[importee.replace('.js', '') + '.js']
      ) {
        return {
          id: PREFIX + importee.replace('.js', '') + '.js',
          moduleSideEffects: false
        }
      }
      return null
    },
    load(id: string) {
      if (dirs.has(id)) {
        return `export default '${dirs.get(id)}'`
      }
      if (id.startsWith(PREFIX)) {
        const importee = id.substr(PREFIX_LENGTH).replace('.js', '')
        return mods.get(importee) || (POLYFILLS as any)[importee + '.js']
      }
    }
  }
}

function getRandomId() {
  return randomBytes(15).toString('hex')
}
