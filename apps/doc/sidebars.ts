import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
	docs: [
		{
			type: 'category',
			label: 'Start here',
			collapsed: false,
			items: ['index', 'guides/installation', 'guides/quick-start', 'guides/migration'],
		},
		{
			type: 'category',
			label: 'CLI',
			items: ['guides/cli'],
		},
		{
			type: 'category',
			label: 'Modules',
			items: [
				'modules/overview',
				'modules/date',
				'modules/numbers',
				'modules/strings',
				'modules/uuid',
			],
		},
	],
}

export default sidebars
