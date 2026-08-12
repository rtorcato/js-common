import { describe, expect, it } from 'vitest'
import { functionCategories } from './catalog.js'

const entries = Object.entries(functionCategories).flatMap(([category, { functions }]) =>
	functions.map((func) => ({ category, ...func }))
)

describe('cli function catalog', () => {
	it.each(entries)(
		'js-common $category $name → $exportName from ./$subpath',
		async ({ exportName, subpath }) => {
			const mod = await import(`../${subpath}/index.ts`)

			expect(Object.keys(mod)).toContain(exportName)
		}
	)
})
