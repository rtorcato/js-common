import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import type { ReactElement } from 'react'
import InstallTabs from '@site/src/components/InstallTabs'
import styles from './index.module.css'

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconKey = 'gauge' | 'layers' | 'brackets' | 'terminal'

type IconProps = {
	icon: IconKey
	title: string
	className?: string
	size?: number
}

function Icon({ icon, title, className, size = 22 }: IconProps): ReactElement {
	return (
		<svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.6}
			strokeLinecap="round"
			strokeLinejoin="round"
			role="img"
		>
			<title>{title}</title>
			{ICONS[icon]}
		</svg>
	)
}

const ICONS: Record<IconKey, ReactElement> = {
	gauge: (
		<>
			<path d="M12 14l4-4" />
			<path d="M3.5 17a9 9 0 0 1 17 0" />
			<circle cx="12" cy="14" r="1.2" fill="currentColor" />
		</>
	),
	layers: (
		<>
			<path d="m12 3 9 5-9 5-9-5z" />
			<path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
		</>
	),
	brackets: (
		<>
			<path d="m9 8-5 4 5 4" />
			<path d="m15 8 5 4-5 4" />
		</>
	),
	terminal: (
		<>
			<rect x="3" y="4" width="18" height="16" rx="2" />
			<path d="M7 9l3 3-3 3M13 15h4" />
		</>
	),
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Pillar = {
	title: string
	desc: string
	icon: IconKey
}

const PILLARS: Pillar[] = [
	{ title: 'Ultra-lightweight', desc: '~277 B core bundle; 50–200 B per module.', icon: 'gauge' },
	{
		title: 'Tree-shakeable',
		desc: 'Named subpath exports — ship only what you import.',
		icon: 'layers',
	},
	{
		title: 'TypeScript-first',
		desc: 'Strict types, generics preserved, JSDoc-rich in your IDE.',
		icon: 'brackets',
	},
	{
		title: 'CLI included',
		desc: 'Run utilities from your terminal via npx.',
		icon: 'terminal',
	},
]

type Category = {
	name: string
	count: number
	desc: string
	chips: string[]
}

const CATEGORIES: Category[] = [
	{
		name: 'Date & Time',
		count: 4,
		desc: 'Dates, times, intervals and timezones.',
		chips: ['date', 'datetime', 'time', 'interval'],
	},
	{
		name: 'Numbers & Math',
		count: 3,
		desc: 'Arithmetic, rounding and randomness.',
		chips: ['numbers', 'math', 'random'],
	},
	{
		name: 'Text & Strings',
		count: 5,
		desc: 'Formatting, slugs, HTML and i18n.',
		chips: ['formatting', 'strings', 'html', 'regex'],
	},
	{
		name: 'Security & Validation',
		count: 5,
		desc: 'Passwords, emails, URLs and guards.',
		chips: ['security', 'emails', 'url', 'validation'],
	},
	{
		name: 'Data Structures',
		count: 5,
		desc: 'Arrays, objects, maps, sets and JSON.',
		chips: ['arrays', 'objects', 'json', 'maps'],
	},
	{
		name: 'Async & Control Flow',
		count: 6,
		desc: 'Promises, debounce, retries and aborts.',
		chips: ['promises', 'functions', 'sleep', 'try'],
	},
	{
		name: 'System & Process',
		count: 6,
		desc: 'Env, OS, Node and process helpers.',
		chips: ['env', 'os', 'node', 'process'],
	},
	{
		name: 'Logging',
		count: 2,
		desc: 'Pino logger and console capture.',
		chips: ['logger', 'logging'],
	},
	{
		name: 'Other Utilities',
		count: 10,
		desc: 'Colors, crypto, currency, files and more.',
		chips: ['colors', 'crypto', 'currency', 'uuid'],
	},
]

const HERO_CODE = `import {
  isEmpty,
  toKebabCase,
  sleep,
  deepClone,
} from '@rtorcato/js-common'

const data = { a: 1 }
const copy = deepClone(data)
await sleep(200)
toKebabCase('Hello World')
// 'hello-world'`

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Hero(): ReactElement {
	const banner = useBaseUrl('/img/banner.png')
	const heroBrand = useBaseUrl('/img/hero-brand.png')
	return (
		<header className={styles.hero}>
			<div className={styles.heroGlow} aria-hidden />
			<div className={styles.heroInner}>
				{/* Desktop / tablet: full banner */}
				<div className={styles.bannerWrap}>
					<img
						src={banner}
						alt="js-common — common JavaScript utilities"
						className={styles.banner}
					/>
				</div>

				{/* Mobile: composed hero */}
				<div className={styles.mobileHero}>
					<div className={styles.mobileBrandBand}>
						<img
							src={heroBrand}
							alt="js-common — common JavaScript utilities and helpers for modern projects. Simple. Reusable. Reliable."
							className={styles.mobileBrand}
						/>
					</div>
					<CodeWindow />
				</div>

				<div className={styles.heroActions}>
					<div className={styles.heroButtons}>
						<Link
							className={clsx('button button--primary button--lg', styles.cta)}
							to="/docs#install"
						>
							Get Started →
						</Link>
						<Link
							className={clsx('button button--lg', styles.ctaSecondary)}
							to="/docs/modules/overview"
						>
							Browse modules
						</Link>
					</div>
					<InstallTabs pkg="@rtorcato/js-common" />
				</div>
			</div>
		</header>
	)
}

function CodeWindow(): ReactElement {
	return (
		<div className={styles.codeWindow}>
			<div className={styles.codeBar}>
				<span className={styles.dot} style={{ background: '#ff5f57' }} />
				<span className={styles.dot} style={{ background: '#febc2e' }} />
				<span className={styles.dot} style={{ background: '#28c840' }} />
				<span className={styles.codeFile}>app.ts</span>
			</div>
			<pre className={styles.codePre}>{HERO_CODE}</pre>
		</div>
	)
}

function Pillars(): ReactElement {
	return (
		<section className={styles.section}>
			<div className={styles.pillarGrid}>
				{PILLARS.map((p) => (
					<div key={p.title} className={styles.pillar}>
						<div className={styles.pillarIcon}>
							<Icon icon={p.icon} title={p.title} size={20} className={styles.pillarIconSvg} />
						</div>
						<div className={styles.pillarTitle}>{p.title}</div>
						<div className={styles.pillarDesc}>{p.desc}</div>
					</div>
				))}
			</div>
		</section>
	)
}

function Categories(): ReactElement {
	return (
		<section className={styles.section}>
			<div className={styles.sectionHead}>
				<div>
					<h2 className={styles.h2}>Everything in one place</h2>
					<p className={styles.sub}>
						Nine focused categories. 46 modules. Import exactly what you need.
					</p>
				</div>
				<Link className={styles.viewAll} to="/docs/modules/overview">
					View all modules →
				</Link>
			</div>
			<div className={styles.catGrid}>
				{CATEGORIES.map((c) => (
					<Link key={c.name} to="/docs/modules/overview" className={styles.card}>
						<div className={styles.cardHead}>
							<div className={styles.cardName}>{c.name}</div>
							<div className={styles.cardCount}>{c.count} modules</div>
						</div>
						<p className={styles.cardDesc}>{c.desc}</p>
						<div className={styles.chips}>
							{c.chips.map((ch) => (
								<span key={ch} className={styles.chip}>
									{ch}
								</span>
							))}
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}

type Sibling = {
	name: string
	tagline: string
	href: string
	dest: 'Docs' | 'GitHub'
}

const SIBLINGS: Sibling[] = [
	{
		name: '@rtorcato/browser-common',
		tagline: 'Small, tree-shakeable TypeScript wrappers around 40+ browser Web APIs.',
		href: 'https://rtorcato.github.io/browser-common/',
		dest: 'Docs',
	},
	{
		name: '@rtorcato/js-tooling',
		tagline:
			'Shared Biome, TypeScript, Vitest and semantic-release presets that power the @rtorcato/* family.',
		href: 'https://rtorcato.github.io/js-tooling/',
		dest: 'Docs',
	},
	{
		name: 'rtorcato/swift-common',
		tagline: 'Common Swift utilities for Apple platforms — Foundation Core + SwiftUI UI.',
		href: 'https://rtorcato.github.io/swift-common/',
		dest: 'Docs',
	},
]

function Siblings(): ReactElement {
	return (
		<section className={styles.section}>
			<div className={styles.sectionHead}>
				<div>
					<h2 className={styles.h2}>Sibling projects</h2>
					<p className={styles.sub}>
						More from <code>@rtorcato</code> — same conventions, same release pipeline.
					</p>
				</div>
			</div>
			<div className={styles.siblingGrid}>
				{SIBLINGS.map((s) => (
					<Link key={s.name} href={s.href} className={styles.card}>
						<div className={styles.cardHead}>
							<div className={styles.cardName}>{s.name}</div>
							<div className={styles.cardCount}>{s.dest} ↗</div>
						</div>
						<p className={styles.cardDesc}>{s.tagline}</p>
					</Link>
				))}
			</div>
		</section>
	)
}

export default function Home(): ReactElement {
	return (
		<Layout
			title="js-common"
			description="Tree-shakeable TypeScript utilities — tiny bundles, full type safety, CLI included."
		>
			<main>
				<Hero />
				<Pillars />
				<Categories />
				<Siblings />
			</main>
		</Layout>
	)
}
