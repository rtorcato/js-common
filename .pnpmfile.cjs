// typedoc drives the TypeScript compiler API, which TS 7 no longer ships, and
// its peer range caps at 6.0.x. Swap its `typescript` peer for a pinned TS 6
// dependency so the docs API reference still builds while everything else
// typechecks with TS 7. Delete this file once a typedoc release supports TS 7.
module.exports = {
	hooks: {
		readPackage(pkg) {
			if (pkg.name === 'typedoc') {
				delete pkg.peerDependencies?.typescript
				pkg.dependencies = { ...pkg.dependencies, typescript: '~6.0.3' }
			}
			return pkg
		},
	},
}
