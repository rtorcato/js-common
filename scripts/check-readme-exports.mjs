#!/usr/bin/env node
/**
 * Fail when the README "Available Modules" section drifts from package.json
 * `exports`: every subpath must appear in the README, and every module the
 * README mentions must be a real export. Also checks that the named imports in
 * the README examples exist in src/<module>/index.ts.
 *
 *   node scripts/check-readme-exports.mjs --check   # exit 1 on drift (used by CI)
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const EXPORT_NAMED =
	/export\s+(?:async\s+)?(?:function|const|let|class|type|interface|enum)\s+([A-Za-z_$][\w$]*)/g
const EXPORT_BRACE = /export\s*\{\s*([^}]+)\}/g
const REEXPORT_FROM = /export\s+(?:\*|\{[^}]*\})\s+from\s+['"]([^'"]+)['"]/g

function collectExportNames(file, names = new Set(), seen = new Set()) {
	if (seen.has(file) || !existsSync(file)) return names
	seen.add(file)
	const src = readFileSync(file, 'utf8')

	for (const m of src.matchAll(EXPORT_NAMED)) names.add(m[1])
	for (const m of src.matchAll(EXPORT_BRACE)) {
		for (const part of m[1].split(',')) {
			const name = part
				.trim()
				.split(/\s+as\s+/)
				.pop()
				?.trim()
			if (name) names.add(name)
		}
	}
	for (const m of src.matchAll(REEXPORT_FROM)) {
		if (!m[1].startsWith('.')) continue
		const base = resolve(dirname(file), m[1].replace(/\.js$/, ''))
		for (const candidate of [`${base}.ts`, `${base}.tsx`, join(base, 'index.ts')]) {
			if (existsSync(candidate)) {
				collectExportNames(candidate, names, seen)
				break
			}
		}
	}
	return names
}

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const subpaths = Object.keys(pkg.exports)
	.filter((k) => k !== '.')
	.map((k) => k.replace(/^\.\//, ''))

const readme = readFileSync(join(root, 'README.md'), 'utf8')
const start = readme.indexOf('## Available Modules')
if (start === -1) {
	console.error('README.md has no "## Available Modules" section.')
	process.exit(1)
}
const rest = readme.slice(start + 1)
const end = rest.indexOf('\n## ')
const section = end === -1 ? rest : rest.slice(0, end)

// Modules appear either in an import example or as a `- \`name\` — …` bullet.
const imported = [...section.matchAll(/@rtorcato\/js-common\/([\w-]+)/g)].map((m) => m[1])
const bulleted = [...section.matchAll(/^- `([\w-]+)`/gm)].map((m) => m[1])
const mentioned = new Set([...imported, ...bulleted])

const errors = []

for (const sub of subpaths) {
	if (!mentioned.has(sub)) errors.push(`exported but missing from the README: ./${sub}`)
}
for (const name of mentioned) {
	if (!subpaths.includes(name))
		errors.push(`in the README but not in package.json exports: ${name}`)
}

const IMPORT_EXAMPLE = /import\s*\{([^}]+)\}\s*from\s*'@rtorcato\/js-common\/([\w-]+)'/g
for (const m of section.matchAll(IMPORT_EXAMPLE)) {
	const sub = m[2]
	const available = collectExportNames(join(root, 'src', sub, 'index.ts'))
	if (available.size === 0) continue
	for (const name of m[1]
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean)) {
		if (!available.has(name)) {
			errors.push(`README imports \`${name}\` from ./${sub}, which does not export it`)
		}
	}
}

if (errors.length) {
	console.error('README "Available Modules" is out of sync with package.json exports:')
	for (const e of errors) console.error(`  - ${e}`)
	process.exit(1)
}
console.log(`README "Available Modules" covers all ${subpaths.length} exported modules.`)
