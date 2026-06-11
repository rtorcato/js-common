import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes as prismThemes } from 'prism-react-renderer'

const config: Config = {
	title: 'js-common',
	tagline: 'Tree-shakeable TypeScript utilities — tiny bundles, full type safety, CLI included.',
	favicon: 'img/logo.svg',

	url: 'https://rtorcato.github.io',
	baseUrl: '/js-common/',

	organizationName: 'rtorcato',
	projectName: 'js-common',

	onBrokenLinks: 'warn',

	markdown: {
		format: 'detect',
		hooks: {
			onBrokenMarkdownLinks: 'warn',
		},
	},

	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					routeBasePath: '/',
					editUrl: 'https://github.com/rtorcato/js-common/edit/main/apps/doc/',
					lastVersion: 'current',
					versions: {
						current: {
							label: '2.x',
						},
					},
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	plugins: [
		[
			'docusaurus-plugin-typedoc',
			{
				entryPoints: ['../../src/*/index.ts'],
				entryPointStrategy: 'expand',
				exclude: ['../../src/cli/**', '../../src/types/**'],
				tsconfig: '../../tsconfig.json',
				out: 'docs/api',
				readme: 'none',
				includeVersion: false,
				excludePrivate: true,
				excludeInternal: true,
				excludeExternals: true,
				sort: ['source-order'],
				hidePageTitle: false,
				hideBreadcrumbs: false,
				sidebar: {
					autoConfiguration: false,
				},
			},
		],
	],

	themeConfig: {
		colorMode: {
			defaultMode: 'dark',
			respectPrefersColorScheme: true,
		},
		navbar: {
			title: 'js-common',
			logo: {
				alt: 'js-common',
				src: 'img/logo.svg',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'docs',
					position: 'left',
					label: 'Docs',
				},
				{
					type: 'docsVersionDropdown',
					position: 'right',
				},
				{
					href: 'https://github.com/rtorcato/js-common',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{ label: 'Installation', to: '/guides/installation' },
						{ label: 'Quick start', to: '/guides/quick-start' },
						{ label: 'Migrating to 2.x', to: '/guides/migration' },
					],
				},
				{
					title: 'More',
					items: [
						{
							label: 'GitHub',
							href: 'https://github.com/rtorcato/js-common',
						},
						{
							label: 'npm',
							href: 'https://www.npmjs.com/package/@rtorcato/js-common',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Richard Torcato. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
			additionalLanguages: ['bash', 'json', 'typescript'],
		},
	} satisfies Preset.ThemeConfig,
}

export default config
