export {}

// Entry point for the js-common CLI binary.
// CLI-only npm deps (chalk, commander, figlet, …) live under
// `optionalDependencies` to keep the install footprint small for
// library-only consumers. If any of them is missing at runtime we
// catch the resolution error and print install instructions instead
// of letting Node emit an opaque ERR_MODULE_NOT_FOUND trace.

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
			'The js-common CLI requires optional dependencies that are not installed.\n' +
				'Install them globally to use the CLI:\n\n' +
				'  npm install -g @rtorcato/js-common\n\n' +
				'Or run it ad-hoc with npx, which installs them on demand:\n\n' +
				'  npx @rtorcato/js-common@latest --help\n'
		)
		process.exit(1)
	}
	throw err
}
