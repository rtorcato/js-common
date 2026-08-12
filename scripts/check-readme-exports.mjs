#!/usr/bin/env node
/**
 * Guards the module boundary freeze (MODULE-BOUNDARIES.md) in CI:
 *
 *  1. The README "Available Modules" section lists every package.json `exports`
 *     subpath and nothing else.
 *  2. No export name is reachable from two different subpaths — the freeze's
 *     "every helper has exactly one home" rule.
 *  3. Every `import { … } from '@rtorcato/js-common/<module>'` sample anywhere in
 *     README.md or apps/docs/docs/** names something that module really exports.
 *
 *   node scripts/check-readme-exports.mjs --check   # exit 1 on drift (used by CI)
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
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

// 1. The README lists every subpath and nothing that is not one.
for (const sub of subpaths) {
	if (!mentioned.has(sub)) errors.push(`exported but missing from the README: ./${sub}`)
}
for (const name of mentioned) {
	if (!subpaths.includes(name))
		errors.push(`in the README but not in package.json exports: ${name}`)
}

// One pass over the source, reused by both checks below. `./types` is types-only
// (no `import` field, no runtime index.ts) — absent, not broken.
const exportsBySubpath = new Map()
for (const sub of subpaths) {
	const entry = join(root, 'src', sub, 'index.ts')
	if (!existsSync(entry)) continue
	exportsBySubpath.set(sub, collectExportNames(entry))
}

// 2. One home per name: the rule MODULE-BOUNDARIES.md freezes.
const homes = new Map()
for (const [sub, names] of exportsBySubpath) {
	for (const name of names) {
		if (!homes.has(name)) homes.set(name, [])
		homes.get(name).push(sub)
	}
}
for (const [name, subs] of homes) {
	if (subs.length > 1) {
		errors.push(`\`${name}\` is exported from ${subs.length} modules: ${subs.join(', ')}`)
	}
}

// 3. Import samples across all the prose, not just the README section.
const IMPORT_EXAMPLE =
	/import\s+(?:type\s+)?\{([^}]+)\}\s*from\s*['"]@rtorcato\/js-common\/([\w-]+)['"]/g
const docFiles = [join(root, 'README.md')]
const docsDir = join(root, 'apps', 'docs', 'docs')
if (existsSync(docsDir)) {
	for (const name of readdirSync(docsDir, { recursive: true })) {
		if (/\.mdx?$/.test(name)) docFiles.push(join(docsDir, name))
	}
}

/**
 * Blank out every fenced block containing `boundary-check: ignore` — a migration
 * guide has to quote the API it is migrating away from.
 *
 * Line-oriented on purpose: the regex this replaced (`/^```[\s\S]*?^```/gm`) had
 * to rescan to EOF from every opener that never closed, which is polynomial on a
 * file with many unclosed fences. Walking once is linear and lets an unclosed
 * fence be handled deliberately — its lines are kept and still checked, rather
 * than being silently paired with the *next* block's opener, which used to shift
 * which block the ignore marker appeared to belong to.
 */
function stripIgnoredBlocks(text) {
	const kept = []
	let fence = null
	for (const line of text.split('\n')) {
		if (line.startsWith('```')) {
			if (fence) {
				fence.push(line)
				if (!fence.some((l) => l.includes('boundary-check: ignore'))) kept.push(...fence)
				fence = null
			} else {
				fence = [line]
			}
			continue
		}
		if (fence) fence.push(line)
		else kept.push(line)
	}
	// Unclosed fence: not an opt-out, so keep it and check what is inside.
	if (fence) kept.push(...fence)
	return kept.join('\n')
}

for (const file of docFiles) {
	const where = relative(root, file)
	const text = stripIgnoredBlocks(readFileSync(file, 'utf8'))
	for (const m of text.matchAll(IMPORT_EXAMPLE)) {
		const sub = m[2]
		const available = exportsBySubpath.get(sub)
		// ./types is declaration-only (`.d.ts`, no src/types/index.ts) — its names
		// are not collectable here, so samples importing from it are left alone.
		if (!available) {
			if (!subpaths.includes(sub))
				errors.push(`${where} imports from ./${sub}, which is not an exported module`)
			continue
		}
		for (const name of m[1]
			.split(',')
			.map((s) => s.trim().replace(/^type\s+/, ''))
			.filter(Boolean)) {
			if (!available.has(name)) {
				errors.push(`${where} imports \`${name}\` from ./${sub}, which does not export it`)
			}
		}
	}
}

if (errors.length) {
	console.error('Module boundary check failed:')
	for (const e of errors) console.error(`  - ${e}`)
	process.exit(1)
}
console.log(
	`README covers all ${subpaths.length} exported modules; ` +
		`${homes.size} export names each have one home; ` +
		`import samples in ${docFiles.length} files resolve.`
)
