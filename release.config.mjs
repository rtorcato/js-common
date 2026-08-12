import preset from '@rtorcato/repo-tooling/semantic-release/github'

// The `code-scanning-main` ruleset rejects any push to main that lacks CodeQL
// results, which a commit created seconds earlier can never have. Dropping
// @semantic-release/git means no push-back to main; tag, npm publish and the
// GitHub release are unaffected.
// `branches` comes from the preset and already carries `{ name: 'beta',
// prerelease: true }`, which is what makes @semantic-release/npm publish the
// beta branch under the `beta` dist-tag instead of `latest`. Don't restate it
// here — CI just has to run the release job on that branch too (see ci.yml).
const plugins = preset.plugins.filter(
	(plugin) => (Array.isArray(plugin) ? plugin[0] : plugin) !== '@semantic-release/git'
)

export default {
	...preset,
	plugins,
	repositoryUrl: 'https://github.com/rtorcato/js-common.git',
}
