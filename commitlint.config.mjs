import config from '@rtorcato/repo-tooling/commitlint/config'

// config-conventional caps body AND footer lines at 72 characters. That rule is
// aimed at `git log` in an 80-column terminal; it buys nothing here and reliably
// fails agent-written commit messages, leaving PRs permanently amber on a check
// that is not required to merge. Amber checks nobody acts on are worse than none.
// Subject-line rules stay enforced — those decide the release type.
//
// The footer half matters more than it looks: `BREAKING CHANGE:` is a footer, so
// the one place a message most needs room to explain itself was the one place
// still capped. PR #182 and #184 each burned a CI run on a 73-character line.
export default {
	...config,
	rules: {
		...config.rules,
		'body-max-line-length': [0, 'always', Number.POSITIVE_INFINITY],
		'footer-max-line-length': [0, 'always', Number.POSITIVE_INFINITY],
	},
}
