import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://rtorcato.github.io',
	base: '/js-common',
	trailingSlash: 'ignore',
	integrations: [
		starlight({
			title: 'js-common',
			description:
				'A comprehensive set of common JavaScript and TypeScript utilities for Node.js projects.',
			logo: {
				src: './src/assets/banner.png',
				replacesTitle: false,
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/rtorcato/js-common',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/rtorcato/js-common/edit/main/apps/doc/',
			},
			lastUpdated: true,
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Installation', slug: 'guides/installation' },
						{ label: 'Quick start', slug: 'guides/quick-start' },
						{ label: 'Migrating to 2.x', slug: 'guides/migration' },
					],
				},
				{
					label: 'CLI',
					items: [{ label: 'Using the CLI', slug: 'guides/cli' }],
				},
				{
					label: 'Modules',
					items: [{ autogenerate: { directory: 'modules' } }],
				},
			],
		}),
	],
})
