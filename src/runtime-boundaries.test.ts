import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Guards the runtime claim in skills/js-common/SKILL.md item 4 ("Node-only modules"), which
// scripts/sync-agents.mjs mirrors into AGENTS.md. If a module starts importing node: builtins
// or touching the DOM, the claim goes stale silently and consumers ship a bundle that crashes.
// It also checks the `**Runtime:**` line under the title of each apps/docs module page.
// Update this file, SKILL.md and the docs pages together, then run `pnpm sync:agents`.

const NODE_ONLY = ['crypto', 'file', 'logger', 'security']
const BROWSER_ONLY = ['events']
const DEGRADES = ['i18n', 'node', 'os', 'process', 'system']
const NEEDS_PROCESS = ['console', 'env']

const DOCS = join(import.meta.dirname, '..', 'apps', 'docs', 'docs', 'modules')

const SRC = join(import.meta.dirname, '.')

/**
 * Drops whole-line comments so JSDoc examples don't count as real usage — `functions` and
 * `i18n` both mention `window.`/`navigator.` only inside `@example` blocks.
 */
function stripComments(source: string): string {
	return source
		.split('\n')
		.filter((line) => !/^\s*(\/\/|\/?\*)/.test(line))
		.join('\n')
}

function readModules(): { name: string; code: string }[] {
	// src/*/index.ts only: skips src/cli (built separately, not a public subpath) and
	// src/types (declarations, no runtime code).
	return readdirSync(SRC, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => ({ name: entry.name, path: join(SRC, entry.name, 'index.ts') }))
		.filter((mod) => {
			try {
				readFileSync(mod.path)
				return true
			} catch {
				return false
			}
		})
		.map((mod) => ({ name: mod.name, code: stripComments(readFileSync(mod.path, 'utf8')) }))
}

const modules = readModules()

describe('runtime boundaries', () => {
	it('finds the module sources', () => {
		expect(modules.length).toBeGreaterThan(30)
	})

	it('only the documented modules depend on Node', () => {
		const nodeOnly = modules
			.filter(({ code }) => /from '(node:|pino)/.test(code))
			.map(({ name }) => name)
			.sort()

		expect(
			nodeOnly,
			'A module gained (or lost) a node:/pino import. Update NODE_ONLY above and SKILL.md item 4, then run `pnpm sync:agents`.'
		).toEqual(NODE_ONLY)
	})

	it('only the documented modules require the DOM unguarded', () => {
		const browserOnly = modules
			.filter(({ code }) => /\b(EventTarget|window|navigator|document)\b/.test(code))
			.filter(({ code }) => !/typeof (window|navigator|document) [!=]==/.test(code))
			.map(({ name }) => name)
			.sort()

		expect(
			browserOnly,
			'A module gained an unguarded DOM reference. Guard it with `typeof window !== undefined`, or update BROWSER_ONLY above and SKILL.md item 4, then run `pnpm sync:agents`.'
		).toEqual(BROWSER_ONLY)
	})

	it('only the documented modules probe for the runtime', () => {
		const degrades = modules
			.filter(({ code }) => /typeof (process|window|navigator) [!=]==/.test(code))
			.map(({ name }) => name)
			.sort()

		expect(degrades, 'Update DEGRADES above and SKILL.md item 4.').toEqual(DEGRADES)
	})

	it('only the documented modules read `process` unguarded', () => {
		const needsProcess = modules
			.filter(({ name }) => !NODE_ONLY.includes(name) && !DEGRADES.includes(name))
			.filter(({ code }) => /\bprocess\./.test(code))
			.map(({ name }) => name)
			.sort()

		expect(needsProcess, 'Update NEEDS_PROCESS above and SKILL.md item 4.').toEqual(NEEDS_PROCESS)
	})

	it('each docs module page states the runtime that matches its source', () => {
		const expected = (name: string) =>
			NODE_ONLY.includes(name)
				? 'Node.js only'
				: BROWSER_ONLY.includes(name)
					? 'browser only'
					: DEGRADES.includes(name)
						? 'Node.js; degrades in browsers'
						: NEEDS_PROCESS.includes(name)
							? 'Node.js; needs `process` in browsers'
							: 'any'

		for (const { name } of modules) {
			const page = readFileSync(join(DOCS, `${name}.md`), 'utf8')
			const runtime = page.match(/^\*\*Runtime:\*\* (.+)$/m)?.[1]
			expect(runtime?.startsWith(`${expected(name)} —`), `${name}.md: ${runtime}`).toBe(true)
		}
	})
})
