import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
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

	it('prints one install line naming every CLI peer when they are missing, and exits 1', () => {
		// A copy of the bin outside the repo has no node_modules to resolve from,
		// which is exactly a library-only install without the CLI peers.
		const dir = mkdtempSync(join(tmpdir(), 'js-common-cli-'))
		try {
			copyFileSync(binPath, join(dir, 'index.mjs'))
			copyFileSync(resolve(binPath, '../cli.mjs'), join(dir, 'cli.mjs'))
			const result = spawnSync(process.execPath, [join(dir, 'index.mjs'), '--help'], {
				encoding: 'utf-8',
				timeout: 10_000,
			})

			expect(result.status).toBe(1)
			expect(result.stderr.trim().split('\n')).toHaveLength(1)
			const cliSource = readFileSync(resolve(here, 'cli.ts'), 'utf-8')
			const peers = [...cliSource.matchAll(/^import .* from '([^.][^']*)'$/gm)]
				.map((m) => m[1])
				.filter((name) => !name.startsWith('node:'))
			expect(peers.length).toBeGreaterThan(0)
			for (const peer of peers) expect(result.stderr).toContain(` ${peer}`)
		} finally {
			rmSync(dir, { recursive: true, force: true })
		}
	})
})
