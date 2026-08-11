import preset from '@rtorcato/repo-tooling/semantic-release/github'

// The `code-scanning-main` ruleset rejects any push to main that lacks CodeQL
// results, which a commit created seconds earlier can never have. Dropping
// @semantic-release/git means no push-back to main; tag, npm publish and the
// GitHub release are unaffected.
const plugins = preset.plugins.filter(
	(plugin) => (Array.isArray(plugin) ? plugin[0] : plugin) !== '@semantic-release/git'
)

export default {
	...preset,
	plugins,
	repositoryUrl: 'https://github.com/rtorcato/js-common.git',
}
