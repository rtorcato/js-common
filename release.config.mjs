import preset from '@rtorcato/repo-tooling/semantic-release/github'

// Two plugins are dropped from the preset, and the second follows from the first.
//
// @semantic-release/git — the `code-scanning-main` ruleset rejects any push to
// main that lacks CodeQL results, which a commit created seconds earlier can
// never have; the push fails with GH013. Unwinnable rather than flaky: the
// commit must exist to be scanned, and be scanned to exist. See #153.
//
// @semantic-release/changelog — writes CHANGELOG.md, which only @semantic-release/git
// ever committed back. Without that push it regenerates the file inside the CI
// workspace and throws it away every release, so keeping it did nothing except
// imply CHANGELOG.md was still maintained. See #211.
//
// The consequence, stated plainly because it is easy to miss: **CHANGELOG.md and
// the `version` field in package.json are frozen on main** at whatever the last
// release with the git plugin wrote (2.8.2). The tag, the npm publish and the
// GitHub release are unaffected and remain the source of truth for what shipped.
// The docs changelog page is built from GitHub Releases for that reason —
// see scripts/sync-changelog.mjs.
//
// `branches` comes from the preset and already carries `{ name: 'beta',
// prerelease: true }`, which is what makes @semantic-release/npm publish the
// beta branch under the `beta` dist-tag instead of `latest`. Don't restate it
// here — CI just has to run the release job on that branch too (see ci.yml).
const DROPPED = new Set(['@semantic-release/git', '@semantic-release/changelog'])

const plugins = preset.plugins.filter(
	(plugin) => !DROPPED.has(Array.isArray(plugin) ? plugin[0] : plugin)
)

export default {
	...preset,
	plugins,
	repositoryUrl: 'https://github.com/rtorcato/js-common.git',
}
