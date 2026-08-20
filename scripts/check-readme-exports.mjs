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
 *  4. No two subpaths export a function with the same body — the near-duplicate
 *     rule, which check 2 is structurally blind to because the names differ.
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

/* ---------- check 4: near-duplicate bodies ---------- */

const FUNCTION_START = /^export\s+(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*(?:<[^>]*>)?\s*\(/gm
const TOP_LEVEL_EXPORT = /^export\s/gm
// Below this, a body is a `return x` shape that recurs honestly — matching on it
// is noise, not a finding.
const MIN_BODY_LENGTH = 12

/** Index just past the `)` that closes the `(` at `open`. */
function endOfParams(src, open) {
	let depth = 0
	for (let i = open; i < src.length; i++) {
		if (src[i] === '(') depth++
		else if (src[i] === ')' && --depth === 0) return i + 1
	}
	return -1
}

/** Split on commas that are not inside brackets — `(a: Foo<A, B>, b)` is two params. */
export function splitParams(params) {
	const parts = []
	let depth = 0
	let start = 0
	for (let i = 0; i < params.length; i++) {
		const c = params[i]
		if ('([{<'.includes(c)) depth++
		else if (')]}>'.includes(c)) depth--
		else if (c === ',' && depth === 0) {
			parts.push(params.slice(start, i))
			start = i + 1
		}
	}
	parts.push(params.slice(start))
	return parts.map((p) => p.trim()).filter(Boolean)
}

/**
 * Reduce a body to a form that compares equal across two honest copies of the
 * same function. Parameter names are substituted positionally, because the only
 * difference between `emails.isValidEmail(email)` and `validation.isEmail(str)`
 * is what the argument is called — see #239.
 */
export function normaliseBody(body, params) {
	let out = body
		.replace(/\/\*[\s\S]*?\*\//g, ' ')
		.replace(/\/\/[^\n]*/g, ' ')
		// Drop the return-type annotation and opening brace the slice starts with,
		// then the closing brace it ends with.
		.replace(/^[^{]*\{/, '')
		.replace(/\}\s*$/, '')

	splitParams(params).forEach((param, i) => {
		// `str: string`, `length = 16`, `...rest: T[]` -> `str`, `length`, `rest`.
		// A destructured param has no single name to rename, so leave it verbatim.
		const name = param
			.split(/[:=]/)[0]
			.trim()
			.replace(/^\.\.\./, '')
		if (/^[A-Za-z_$][\w$]*$/.test(name)) {
			out = out.replace(new RegExp(`\\b${name}\\b`, 'g'), `_p${i}`)
		}
	})

	return out.replace(/\s+/g, ' ').trim()
}

/**
 * Bodies of the `export function`s declared directly in `file`.
 *
 * Deliberately does not follow re-exports the way collectExportNames does: a
 * near-duplicate has to be read and judged by a human anyway, and every pair
 * found so far lives in an `index.ts`. Widening it is cheap if one ever hides
 * behind a re-export.
 */
function collectExportBodies(file) {
	const bodies = new Map()
	if (!existsSync(file)) return bodies
	const src = readFileSync(file, 'utf8')

	for (const m of src.matchAll(FUNCTION_START)) {
		const open = m.index + m[0].length - 1
		const close = endOfParams(src, open)
		if (close === -1) continue

		// The declaration runs to the next top-level `export`, or to EOF.
		TOP_LEVEL_EXPORT.lastIndex = close
		const next = TOP_LEVEL_EXPORT.exec(src)
		const body = normaliseBody(
			src.slice(close, next ? next.index : src.length),
			src.slice(open + 1, close - 1)
		)

		if (body.length >= MIN_BODY_LENGTH) bodies.set(m[1], body)
	}
	return bodies
}

/**
 * Pairs that are known duplicates and cannot be fixed without a major version,
 * since the freeze means resolving one deletes an export — tracked in #239.
 * Listed as sorted `sub.name` pairs. Delete a line as its pair is resolved; do
 * not add one without an issue saying why the duplicate is allowed to stand.
 */
const ACCEPTED_DUPLICATES = new Set([
	'emails.isValidEmail|validation.isEmail',
	'os.getOsPlatform|process.getProcessPlatform',
	'url.isValidUrl|validation.isUrl',
	// Same body, different defaults (16 vs 32 bytes), so the two are not
	// interchangeable at their defaults — which is what makes it worth an issue.
	'crypto.randomHex|security.generateSecureToken',
])

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const subpaths = Object.keys(pkg.exports)
	.filter((k) => k !== '.')
	.map((k) => k.replace(/^\.\//, ''))

const errors = []

const readme = readFileSync(join(root, 'README.md'), 'utf8')
const start = readme.indexOf('## Available Modules')
if (start === -1) errors.push('README.md has no "## Available Modules" section.')
const rest = readme.slice(start + 1)
const end = rest.indexOf('\n## ')
const section = end === -1 ? rest : rest.slice(0, end)

// Modules appear either in an import example or as a `- \`name\` — …` bullet.
const imported = [...section.matchAll(/@rtorcato\/js-common\/([\w-]+)/g)].map((m) => m[1])
const bulleted = [...section.matchAll(/^- `([\w-]+)`/gm)].map((m) => m[1])
const mentioned = new Set([...imported, ...bulleted])

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

// 4. Near-duplicates: same body, different names, different subpaths.
const byBody = new Map()
for (const sub of subpaths) {
	for (const [name, body] of collectExportBodies(join(root, 'src', sub, 'index.ts'))) {
		if (!byBody.has(body)) byBody.set(body, [])
		byBody.get(body).push(`${sub}.${name}`)
	}
}
let accepted = 0
for (const owners of byBody.values()) {
	if (owners.length < 2) continue
	const key = [...owners].sort().join('|')
	if (ACCEPTED_DUPLICATES.has(key)) {
		accepted++
		continue
	}
	errors.push(`${owners.join(' and ')} have the same body — one of them is a near-duplicate`)
}

// Importable for tests; only the CLI invocation reports and sets the exit code.
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
	if (errors.length) {
		console.error('Module boundary check failed:')
		for (const e of errors) console.error(`  - ${e}`)
		process.exit(1)
	}
	console.log(
		`README covers all ${subpaths.length} exported modules; ` +
			`${homes.size} export names each have one home; ` +
			`import samples in ${docFiles.length} files resolve; ` +
			`no unlisted duplicate bodies (${accepted} accepted, see #239).`
	)
}
