import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import type { ReactElement } from 'react'
import styles from './index.module.css'

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const PILLARS = [
	{ title: 'Ultra-lightweight', desc: '~277 B core bundle; 50–200 B per module.' },
	{ title: 'Tree-shakeable', desc: 'Named subpath exports — ship only what you import.' },
	{ title: 'TypeScript-first', desc: 'Strict types, generics preserved, JSDoc-rich in your IDE.' },
	{ title: 'CLI included', desc: 'Run utilities from your terminal via npx.' },
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
					<h1 className={styles.mobileTitle}>Common JavaScript utilities for modern projects.</h1>
					<p className={styles.mobileTagline}>
						Tiny, tree-shakeable, TypeScript-first.
						<br />
						<span className={styles.gold}>Simple. Reusable. Reliable.</span>
					</p>
					<CodeWindow />
				</div>

				<div className={styles.heroActions}>
					<Link
						className={clsx('button button--primary button--lg', styles.cta)}
						to="/docs/guides/installation"
					>
						Get Started →
					</Link>
					<code className={styles.install}>npm i @rtorcato/js-common</code>
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
				<Link
					className={clsx('button button--secondary', styles.viewAll)}
					to="/docs/modules/overview"
				>
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
			</main>
		</Layout>
	)
}
