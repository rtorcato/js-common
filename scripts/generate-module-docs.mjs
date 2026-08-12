// Generate the API-reference block of apps/docs/docs/modules/.
//
// For every subpath in package.json#exports (except '.' and './types'), read
// src/<name>/index.ts (+ any local re-exports), pull out `export function`,
// `export const`, `export class`, `export type`, `export interface` names plus
// the first line of the JSDoc above each, and build an import snippet + an
// exports table.
//
// That block is fenced by MARKER_START/MARKER_END so the hand-written guide
// around it survives regeneration:
//   - File missing            -> write frontmatter + block.
//   - File has both markers   -> replace only what is between them.
//   - File has no markers     -> leave alone (fully hand-written page).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..')
const pkg = JSON.parse(readFileSync(resolve(repoRoot, 'package.json'), 'utf8'))
const docsDir = resolve(repoRoot, 'apps/docs/docs/modules')
mkdirSync(docsDir, { recursive: true })

const EXPORT_NAMED =
	/export\s+(?:async\s+)?(?:function|const|let|class|type|interface|enum)\s+([A-Za-z_$][\w$]*)/g
const EXPORT_BRACE = /export\s*\{\s*([^}]+)\}/g
const REEXPORT_FROM = /export\s+\*\s+from\s+['"]\.\/([\w-]+)(?:\.js|\.ts)?['"]/g
// The comment body must not itself contain `*/`, otherwise a file-header
// comment swallows everything down to the first exported symbol.
const JSDOC_BLOCK =
	/\/\*\*((?:[^*]|\*(?!\/))*)\*\/\s*(?:export\s+(?:async\s+)?(?:function|const|let|class|type|interface|enum)\s+([A-Za-z_$][\w$]*))/g

export function escapeForMarkdownTable(text) {
	// Neutralise raw HTML-ish tags outside code spans, which would otherwise
	// confuse Docusaurus's MDX parser — but keep them inside backticks, where
	// `Success<T>` and `<br>` are the point. Then escape pipes everywhere, since
	// one anywhere in the cell breaks the table layout.
	//
	// Escaping the `<` beats stripping `/<[^>]*>/`: a one-pass tag strip can
	// leave a tag behind on nested input (`<<b>>` -> `<b>`) and silently eats
	// text like `Success<T>` when the JSDoc forgot the backticks.
	return text
		.split(/(`[^`]*`)/)
		.map((part, i) => (i % 2 === 1 ? part : part.replace(/</g, '&lt;')))
		.join('')
		.replace(/\|/g, '\\|')
}

function firstSentence(jsdoc) {
	const cleaned = jsdoc
		.split('\n')
		.map((l) => l.replace(/^\s*\*\s?/, '').trim())
		.filter(Boolean)
		.join(' ')
	// `(?<!e\.g|i\.e|etc)` so an abbreviation does not end the sentence early.
	const match = cleaned.match(/^(.+?(?<!\be\.g)(?<!\bi\.e)(?<!\betc)[.!?])(\s|$)/)
	return escapeForMarkdownTable((match ? match[1] : cleaned).trim() || '')
}

function collectFromFile(filePath, summaries, seen = new Set()) {
	if (seen.has(filePath) || !existsSync(filePath)) return
	seen.add(filePath)
	const src = readFileSync(filePath, 'utf8')

	for (const m of src.matchAll(JSDOC_BLOCK)) {
		const name = m[2]
		if (name && !summaries.has(name)) {
			summaries.set(name, firstSentence(m[1]))
		}
	}
	for (const m of src.matchAll(EXPORT_NAMED)) {
		if (!summaries.has(m[1])) summaries.set(m[1], '')
	}
	for (const m of src.matchAll(EXPORT_BRACE)) {
		for (const part of m[1].split(',')) {
			const name = part
				.trim()
				.split(/\s+as\s+/)[0]
				?.trim()
			if (name && !summaries.has(name)) summaries.set(name, '')
		}
	}
	for (const m of src.matchAll(REEXPORT_FROM)) {
		const baseDir = dirname(filePath)
		for (const ext of ['.ts', '.tsx', '/index.ts']) {
			const next = resolve(baseDir, `${m[1]}${ext}`)
			if (existsSync(next)) {
				collectFromFile(next, summaries, seen)
				break
			}
		}
	}
}

const subpaths = Object.keys(pkg.exports)
	.filter((k) => k !== '.' && k !== './types')
	.map((k) => k.replace(/^\.\//, ''))

export const MARKER_START =
	'<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->'
export const MARKER_END = '<!-- /generated:exports -->'

/**
 * Splice `block` into `existing` between the markers. Returns null when the
 * page has no markers, which means "hand-written, leave it alone".
 */
export function spliceGeneratedBlock(existing, block) {
	const start = existing.indexOf(MARKER_START)
	const end = existing.indexOf(MARKER_END)
	if (start === -1 || end === -1 || end < start) return null
	return existing.slice(0, start) + block + existing.slice(end + MARKER_END.length)
}

export function buildBlock(sub, summaries) {
	const exportNames = [...summaries.keys()].sort()
	const exampleImports = exportNames.slice(0, 3).join(', ') || '/* utilities */'
	const tableRows = exportNames.length
		? exportNames.map((name) => `| \`${name}\` | ${summaries.get(name) || '—'} |`).join('\n')
		: '| _no exports detected_ | _add docs here_ |'

	return `${MARKER_START}

## Import

\`\`\`ts
import { ${exampleImports} } from '@rtorcato/js-common/${sub}'
\`\`\`

## Exports

| Name | Summary |
| --- | --- |
${tableRows}

${MARKER_END}`
}

// Importable for tests; only the CLI invocation touches the filesystem.
export function generate() {
	let created = 0
	let updated = 0
	let skipped = 0

	for (const sub of subpaths) {
		const docPath = resolve(docsDir, `${sub}.md`)
		const summaries = new Map()
		collectFromFile(resolve(repoRoot, 'src', sub, 'index.ts'), summaries)
		const block = buildBlock(sub, summaries)

		// Read first and treat ENOENT as "not there yet", rather than asking
		// existsSync and then writing — the check-then-write pair is a race, and
		// the answer is thrown away the moment it is read anyway.
		let existing = null
		try {
			existing = readFileSync(docPath, 'utf8')
		} catch (err) {
			if (err.code !== 'ENOENT') throw err
		}

		if (existing !== null) {
			const next = spliceGeneratedBlock(existing, block)
			if (next === null) {
				skipped++
			} else if (next !== existing) {
				writeFileSync(docPath, next)
				updated++
			}
			continue
		}

		const title = sub.replace(/[-/]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
		writeFileSync(
			docPath,
			`---
title: ${title}
description: Utilities exported from @rtorcato/js-common/${sub}.
---

${block}
`
		)
		created++
	}

	return { created, updated, skipped }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
	const { created, updated, skipped } = generate()
	console.log(
		`generate-module-docs: created ${created}, updated ${updated}, skipped ${skipped} (no marker block)`
	)
}
