// Imports every universal subpath from the built dist/ and fails if one throws or exports
// nothing. CI runs it under Bun and Deno; runtime-boundaries.test.ts only checks imports
// statically, and vitest only ever executes on Node.
//
// The module list is package.json#exports minus NODE_ONLY, and NODE_ONLY is read straight
// out of src/runtime-boundaries.test.ts, so neither list can drift from this one.
//
// Usage (after `pnpm run build-prod`):
//   bun scripts/smoke-import.mjs
//   deno run --allow-read --allow-env --allow-sys scripts/smoke-import.mjs
import { readFileSync } from 'node:fs'
import process from 'node:process'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')

const nodeOnlySource = read('src/runtime-boundaries.test.ts').match(
	/const NODE_ONLY = \[([^\]]*)\]/
)?.[1]
if (nodeOnlySource === undefined) {
	throw new Error('NODE_ONLY not found in src/runtime-boundaries.test.ts')
}
const NODE_ONLY = [...nodeOnlySource.matchAll(/'([^']+)'/g)].map((m) => m[1])

const modules = Object.entries(JSON.parse(read('package.json')).exports)
	// `./types` is types-only: no `import` condition, nothing to load.
	.filter(([, target]) => target.import)
	.filter(([subpath]) => !NODE_ONLY.includes(subpath.slice(2)))

const runtime = globalThis.Deno ? 'Deno' : globalThis.Bun ? 'Bun' : 'Node'
let failed = 0
for (const [subpath, { import: file }] of modules) {
	try {
		const ns = await import(new URL(file, root).href)
		if (Object.keys(ns).length === 0) throw new Error('empty namespace')
		console.log(`ok   ${subpath}`)
	} catch (error) {
		failed++
		console.error(`FAIL ${subpath}: ${error?.stack ?? error}`)
	}
}

console.log(`\n${runtime}: ${modules.length - failed}/${modules.length} universal modules imported`)
if (failed > 0) process.exit(1)
