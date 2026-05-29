import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const here = dirname(fileURLToPath(import.meta.url))
const binPath = resolve(here, '../../dist/cli/index.mjs')
const pkgPath = resolve(here, '../../package.json')

const binExists = existsSync(binPath)
const describeIfBuilt = binExists ? describe : describe.skip

if (!binExists) {
	console.warn(`[cli smoke test] Skipped: ${binPath} not built. Run \`pnpm run build-cli\` first.`)
}

function runCli(args: string[]) {
	return spawnSync(process.execPath, [binPath, ...args], {
		encoding: 'utf-8',
		timeout: 10_000,
	})
}

describeIfBuilt('cli binary', () => {
	it('prints --version matching package.json and exits 0', () => {
		const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
		const result = runCli(['--version'])

		expect(result.status).toBe(0)
		expect(result.stderr).toBe('')
		expect(result.stdout.trim()).toBe(pkg.version)
	})

	it('prints --help with usage and exits 0', () => {
		const result = runCli(['--help'])

		expect(result.status).toBe(0)
		expect(result.stderr).toBe('')
		expect(result.stdout).toContain('Usage: js-common')
		expect(result.stdout).toContain('CLI utilities from @rtorcato/js-common')
	})

	it('runs a subcommand (date today) and exits 0', () => {
		const result = runCli(['date', 'today'])

		expect(result.status).toBe(0)
		expect(result.stderr).toBe('')
		expect(result.stdout.trim()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
	})
})
