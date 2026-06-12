import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes as prismThemes } from 'prism-react-renderer'

const config: Config = {
	title: 'js-common',
	tagline: 'Tree-shakeable TypeScript utilities — tiny bundles, full type safety, CLI included.',
	favicon: 'img/favicon.svg',

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

	headTags: [
		{
			tagName: 'link',
			attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		},
		{
			tagName: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossorigin: 'anonymous',
			},
		},
	],

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					// Moved from '/' to '/docs' so the marketing landing (src/pages/index.tsx) owns '/'.
					routeBasePath: '/docs',
					editUrl: 'https://github.com/rtorcato/js-common/edit/main/apps/doc/',
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
				// One file per module instead of <module>/index.md + <module>/functions/*.md.
				// Flattens the sidebar from "API Reference → module → index → functions → fn"
				// down to "API Reference → module".
				outputFileStrategy: 'modules',
				sidebar: {
					autoConfiguration: false,
				},
			},
		],
		[
			'@easyops-cn/docusaurus-search-local',
			{
				hashed: true,
				indexDocs: true,
				indexBlog: false,
				docsRouteBasePath: '/docs',
				highlightSearchTermsOnTargetPage: true,
				searchBarShortcutHint: false,
			},
		],
	],

	themeConfig: {
		colorMode: {
			defaultMode: 'dark',
			respectPrefersColorScheme: true,
		},
		navbar: {
			// The wordmark "js-common" with gold "common" is baked into the SVG logo
			// (light + dark variants), so title stays empty to avoid a duplicate text label.
			title: '',
			logo: {
				alt: 'js-common',
				src: 'img/logo.svg',
				srcDark: 'img/logo-dark.svg',
				width: 118,
				height: 26,
			},
			items: [
				{ to: '/docs', position: 'left', label: 'Docs' },
				{ to: '/docs/modules/overview', position: 'left', label: 'Modules' },
				{ to: '/docs/api', position: 'left', label: 'API' },
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
					title: 'Documentation',
					items: [
						{ label: 'Installation', to: '/docs#install' },
						{ label: 'Quick start', to: '/docs#quick-start' },
						{ label: 'All modules', to: '/docs/modules/overview' },
						{ label: 'API reference', to: '/docs/api' },
					],
				},
				{
					title: 'Resources',
					items: [
						{ label: 'GitHub', href: 'https://github.com/rtorcato/js-common' },
						{ label: 'npm', href: 'https://www.npmjs.com/package/@rtorcato/js-common' },
						{ label: 'Migrating to 2.x', to: '/docs/guides/migration' },
					],
				},
				{
					title: 'Community',
					items: [
						{ label: 'Issues', href: 'https://github.com/rtorcato/js-common/issues' },
						{
							label: 'License (MIT)',
							href: 'https://github.com/rtorcato/js-common/blob/main/LICENSE',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Richard Torcato. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.vsDark,
			darkTheme: prismThemes.vsDark,
			additionalLanguages: ['bash', 'json', 'typescript'],
		},
	} satisfies Preset.ThemeConfig,
}

export default config
