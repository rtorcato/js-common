export {}

// Entry point for the js-common CLI binary.
// CLI-only npm deps (chalk, commander, figlet, …) are optional
// `peerDependencies`, so library-only consumers never install them. If any
// of them is missing at runtime we catch the resolution error and print one
// install line instead of letting Node emit an opaque ERR_MODULE_NOT_FOUND
// trace. cli.test.ts fails if this list misses a package cli.ts imports.
const CLI_PEERS = '@inquirer/prompts chalk chalk-animation commander figlet gradient-string'

try {
	await import('./cli.js')
} catch (err) {
	const isMissingModule =
		err !== null &&
		typeof err === 'object' &&
		'code' in err &&
		(err as { code?: string }).code === 'ERR_MODULE_NOT_FOUND'

	if (isMissingModule) {
		process.stderr.write(
			`js-common CLI: missing peer dependencies. Install them with: npm i -D ${CLI_PEERS}\n`
		)
		process.exit(1)
	}
	throw err
}
