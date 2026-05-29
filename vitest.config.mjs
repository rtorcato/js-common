import { mergeConfig } from 'vitest/config'
import base from '@rtorcato/js-tooling/vitest/config'

export default mergeConfig(base, {
	test: {
		coverage: {
			thresholds: {
				lines: 85,
				statements: 85,
				functions: 95,
				branches: 70,
			},
		},
	},
})
