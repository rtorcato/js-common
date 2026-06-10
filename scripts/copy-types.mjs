// Copy hand-written .d.ts source files from src/types/ to dist/types/.
//
// The ./types subpath in package.json#exports is types-only — there is no
// runtime code, so esbuild doesn't produce anything for it, and tsc skips
// .d.ts files in its input set (they're already declarations). Without this
// copy step, the published tarball is missing dist/types/ entirely, and any
// `import type { ... } from '@rtorcato/js-common/types'` fails to resolve.

import { cpSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const src = resolve(here, '..', 'src', 'types')
const dest = resolve(here, '..', 'dist', 'types')

if (!existsSync(src)) {
	console.error(`copy-types: source directory not found: ${src}`)
	process.exit(1)
}

cpSync(src, dest, {
	recursive: true,
	filter: (p) => p.endsWith('.d.ts') || !p.includes('.'),
})
