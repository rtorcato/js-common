import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { functionCategories } from './catalog.js'

const entries = Object.entries(functionCategories).flatMap(([category, { functions }]) =>
	functions.map((func) => ({ category, ...func }))
)

// `cli.ts` calls `program.parse()` at module scope, so importing it would run the
// CLI. Scan the source text instead — the same trick `scripts/check-readme-exports.mjs`
// uses. `.command('x')` covers both `program.command(…)` and `<group>Cmd.command(…)`.
const cliSource = readFileSync(fileURLToPath(new URL('./cli.ts', import.meta.url)), 'utf8')
const registered = new Set(
	Array.from(cliSource.matchAll(/\.command\('([^']+)'\)/g), (match) => match[1])
)

describe('cli function catalog', () => {
	it.each(entries)(
		'js-common $category $name → $exportName from ./$subpath',
		async ({ exportName, subpath }) => {
			const mod = await import(`../${subpath}/index.ts`)

			expect(Object.keys(mod)).toContain(exportName)
		}
	)

	// The catalog is what `list`, `interactive` and `add` advertise. Anything in it
	// that `cli.ts` never registers is a command the CLI offers and then fails to run.
	it.each(entries)('js-common $category $name is a registered command', ({ name }) => {
		expect(registered).toContain(name)
	})

	it('every category is a registered command group', () => {
		for (const category of Object.keys(functionCategories)) {
			expect(registered).toContain(category)
		}
	})
})
