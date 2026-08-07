// Generate module stub pages for apps/docs/docs/modules/.
//
// For every subpath in package.json#exports (except '.' and './types'):
//   - If apps/docs/docs/modules/<name>.md already exists, skip it (hand-written)
//   - Otherwise, read src/<name>/index.ts (+ any local re-exports), pull out
//     `export function`, `export const`, `export class`, `export type`,
//     `export interface` names plus the first line of the JSDoc above each,
//     and write a stub page with an import snippet + exports table.
//
// Re-run safely: existing files are never overwritten.

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
const JSDOC_BLOCK =
	/\/\*\*([\s\S]*?)\*\/\s*(?:export\s+(?:async\s+)?(?:function|const|let|class|type|interface|enum)\s+([A-Za-z_$][\w$]*))/g

function escapeForMarkdownTable(text) {
	// Strip raw HTML-ish tags (e.g. `\n to <br>`) that would otherwise
	// confuse Docusaurus's MDX parser, and escape pipe characters that
	// would break the table layout.
	return text.replace(/<[^>]*>/g, '').replace(/\|/g, '\\|')
}

function firstSentence(jsdoc) {
	const cleaned = jsdoc
		.split('\n')
		.map((l) => l.replace(/^\s*\*\s?/, '').trim())
		.filter(Boolean)
		.join(' ')
	const match = cleaned.match(/^(.+?[.!?])(\s|$)/)
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

let created = 0
let skipped = 0
for (const sub of subpaths) {
	const docPath = resolve(docsDir, `${sub}.md`)
	if (existsSync(docPath)) {
		skipped++
		continue
	}

	const indexPath = resolve(repoRoot, 'src', sub, 'index.ts')
	const summaries = new Map()
	collectFromFile(indexPath, summaries)

	const title = sub.replace(/[-/]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
	const description = `Utilities exported from @rtorcato/js-common/${sub}.`

	const exportNames = [...summaries.keys()].sort()
	const exampleImports = exportNames.slice(0, 3).join(', ') || '/* utilities */'

	const tableRows = exportNames.length
		? exportNames.map((name) => `| \`${name}\` | ${summaries.get(name) || '—'} |`).join('\n')
		: '| _no exports detected_ | _add docs here_ |'

	const body = `---
title: ${title}
description: ${description}
---

\`\`\`ts
import { ${exampleImports} } from '@rtorcato/js-common/${sub}'
\`\`\`

## Exports

| Name | Summary |
| --- | --- |
${tableRows}
`

	writeFileSync(docPath, body)
	created++
}

console.log(`generate-module-docs: created ${created}, skipped ${skipped} (already existed)`)
