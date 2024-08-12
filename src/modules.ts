import POLYFILLS from './polyfills'
const EMPTY_PATH = POLYFILLS['empty.js']

export const mods: Map<string, string> = new Map()

mods.set('process', POLYFILLS['process-es6.js'])
mods.set('global', POLYFILLS['global.js'])
mods.set('buffer', POLYFILLS['buffer-es6.js'])
mods.set('util', POLYFILLS['util.js'])
mods.set('sys', mods.get('util') as string)
mods.set('events', POLYFILLS['events.js'])
mods.set('stream', POLYFILLS['stream.js'])
mods.set('path', POLYFILLS['path.js'])
mods.set('querystring', POLYFILLS['querystring.js'])
mods.set('punycode', POLYFILLS['punycode.js'])
mods.set('url', POLYFILLS['url.js'])
mods.set('string_decoder', POLYFILLS['string-decoder.js'])
mods.set('http', POLYFILLS['http.js'])
mods.set('https', POLYFILLS['http.js'])
mods.set('os', POLYFILLS['os.js'])
mods.set('assert', POLYFILLS['assert.js'])
mods.set('constants', POLYFILLS['constants.js'])
mods.set('_stream_duplex', POLYFILLS['__readable-stream/duplex.js'])
mods.set('_stream_passthrough', POLYFILLS['__readable-stream/passthrough.js'])
mods.set('_stream_readable', POLYFILLS['__readable-stream/readable.js'])
mods.set('_stream_writable', POLYFILLS['__readable-stream/writable.js'])
mods.set('_stream_transform', POLYFILLS['__readable-stream/transform.js'])
mods.set('_inherits', POLYFILLS['inherits.js'])
mods.set('_buffer_list', POLYFILLS['__readable-stream/buffer-list.js'])
mods.set('timers', POLYFILLS['timers.js'])
mods.set('console', POLYFILLS['console.js'])
mods.set('vm', POLYFILLS['vm.js'])
mods.set('zlib', POLYFILLS['zlib.js'])
mods.set('tty', POLYFILLS['tty.js'])
mods.set('domain', POLYFILLS['domain.js'])

// TODO: Decide if we want to implement these or not
// currently causing trouble in tests
mods.set('fs', EMPTY_PATH)
mods.set('crypto', EMPTY_PATH)
// libs.set('fs', POLYFILLS['browserify-fs.js']);
// libs.set('crypto', POLYFILLS['crypto-browserify.js']);

// TODO: No good polyfill exists yet
mods.set('http2', EMPTY_PATH)

// not shimmed
mods.set('dns', EMPTY_PATH)
mods.set('dgram', EMPTY_PATH)
mods.set('child_process', EMPTY_PATH)
mods.set('cluster', EMPTY_PATH)
mods.set('module', EMPTY_PATH)
mods.set('net', EMPTY_PATH)
mods.set('readline', EMPTY_PATH)
mods.set('repl', EMPTY_PATH)
mods.set('tls', EMPTY_PATH)
mods.set('perf_hooks', EMPTY_PATH)
