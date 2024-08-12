# @rolldown/plugin-node-polyfills

This is a node polyfills plugin for [Rolldown](https://rolldown.rs/), largely based on the original [rollup-plugin-polyfill-node](https://github.com/FredKSchott/rollup-plugin-polyfill-node) by @fks, which is in turn a fork of [rollup-plugin-node-polyfills](https://github.com/ionic-team/rollup-plugin-node-polyfills).

The reason for a Rolldown-specific version is because Rolldown natively supports [esbuild-style `inject` option](https://esbuild.github.io/api/#inject), which removes the need for [@rollup/plugin-inject](https://github.com/rollup/plugins/tree/master/packages/inject#readme), which is used to inject polyfills for globals like `Buffer`. Rolldown's native `inject` is many times more efficient than a plugin because it completely avoids extra AST parse and traversals.

## Quickstart

```
npm install --save-dev @rolldown/plugin-node-polyfills
```

```js
import { rolldown } from 'rolldown'
import nodePolyfills from '@rolldown/plugin-node-polyfills'

rolldown({
  entry: 'main.js',
  plugins: [nodePolyfills()]
})
```

## Node.js Builtin Support Table

The following modules include ES6 specific version which allow you to do named imports in addition to the default import and should work fine if you only use this plugin.

- process*
- events
- stream*
- util*
- path
- buffer*
- querystring
- url*
- string_decoder*
- punycode
- http*†
- https*†
- os*
- assert*
- constants
- timers*
- console*‡
- vm*§
- zlib*
- tty
- domain
- dns∆
- dgram∆
- child_process∆
- cluster∆
- module∆
- net∆
- readline∆
- repl∆
- tls∆
- fs˚
- crypto˚
- perf_hooks˚ - **New:* just an empty shim for now, but would love help building a true polyfill!*


† the http and https modules are actually the same and don't differentiate based on protocol

‡ default export only, because it's console, seriously just use the global

§ vm does not have all corner cases and has less of them in a web worker

∆ not shimmed, just returns mock

˚ shimmed, but too complex to polyfill fully. Avoid if at all possible. Some bugs and partial support expected. 

Not all included modules bundle equally, streams (and by extension anything that requires it like http) are a mess of circular references that are pretty much impossible to tree-shake out, similarly url methods are actually a shortcut to a url object so those methods don't tree shake out very well, punycode, path, querystring, events, util, and process tree shake very well especially if you do named imports.
