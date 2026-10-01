const { builtinModules } = require('node:module')
const pkg = require('./package.json')

// Node-only subpaths import builtins; keep them external so the bundler can measure them.
const NODE_BUILTINS = builtinModules.flatMap((m) => [m, `node:${m}`])

// Budgets sit ~25% above the measured gzip size. Every subpath gets one, so a
// new module is covered the moment it lands in `exports`.
// ponytail: one shared default; tiny modules (logger, console) get slack — give them an override if it matters.
const DEFAULT_LIMIT = '500 B'
const OVERRIDES = {
	'./mime-types': '11 kB',
	'./currency': '1450 B',
	'./strings': '950 B',
	'./date': '800 B',
	'./promises': '700 B',
	'./numbers': '600 B',
	'./datetime': '600 B',
	'./arrays': '550 B',
	'./colors': '550 B',
	'./env': '550 B',
	'./node': '550 B',
}

// Resolve the ESM entry file for an exports condition (string, or an object
// with a string `import`, or a nested `import.default`).
function importPath(cond) {
	if (typeof cond === 'string') return cond
	if (cond && typeof cond === 'object') {
		if (typeof cond.import === 'string') return cond.import
		if (cond.import && typeof cond.import === 'object') return cond.import.default
	}
	return undefined
}

module.exports = Object.entries(pkg.exports || {})
	.filter(([sub]) => sub !== '.' && sub !== './package.json')
	.map(([sub, cond]) => [sub, importPath(cond)])
	.filter(([, file]) => typeof file === 'string')
	.map(([sub, file]) => ({
		name: `${pkg.name}${sub.slice(1)}`,
		path: file.replace(/^\.\//, ''),
		limit: OVERRIDES[sub] || DEFAULT_LIMIT,
		ignore: NODE_BUILTINS,
	}))
