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

// @semantic-release/github's `success` step posts a "included in version X"
// comment on every issue and PR referenced in the release notes. That is one
// API call each, after the npm publish and the GitHub release have already
// happened — so when those calls fail, semantic-release exits non-zero on a
// release that fully shipped.
//
// 3.0.0 did exactly that (#215): the release and the publish both succeeded at
// 17:06, then GitHub's API started returning 503 "No server is currently
// available" and ~30 comment calls failed until semantic-release gave up at
// 17:12. A release carrying 76 commits references dozens of PRs, so the
// blast radius grows with the size of the release — the bigger and more
// important the release, the likelier it fails on a cosmetic step.
//
// The comments are noise here anyway: PRs are squash-merged and closed long
// before they ship. Turning them off removes the failure mode entirely.
const plugins = preset.plugins
	.filter((plugin) => !DROPPED.has(Array.isArray(plugin) ? plugin[0] : plugin))
	.map((plugin) =>
		Array.isArray(plugin) && plugin[0] === '@semantic-release/github'
			? [plugin[0], { ...plugin[1], successComment: false }]
			: plugin
	)

export default {
	...preset,
	plugins,
	repositoryUrl: 'https://github.com/rtorcato/js-common.git',
}
