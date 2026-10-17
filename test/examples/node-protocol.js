import { dirname } from 'node:path'
import * as nodePath from 'node:path'
import * as path from 'path'
import { EventEmitter as EE } from 'node:events'

if (nodePath !== path) {
  throw new Error('`node:path` and `path` should resolve to the same module')
}
var out = dirname('/src/es6/path.js')
if (out !== '/src/es6') {
  throw new Error(`wrong directory, expected '/src/es6' but got '${out}'`)
}

var e = new EE()
e.on('it', function () {
  done()
})
e.emit('it')
