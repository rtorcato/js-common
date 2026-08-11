import config from '@rtorcato/repo-tooling/commitlint/config'

// config-conventional caps body lines at 72 characters. That rule is aimed at
// `git log` in an 80-column terminal; it buys nothing here and reliably fails
// agent-written commit bodies, leaving PRs permanently amber on a check that
// is not required to merge. Amber checks nobody acts on are worse than none.
// Subject-line rules stay enforced — those decide the release type.
export default {
	...config,
	rules: { ...config.rules, 'body-max-line-length': [0, 'always', Number.POSITIVE_INFINITY] },
}
