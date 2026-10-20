import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { siblings } from '@rtorcato/shared-docs'
import UseWithAI from '@rtorcato/shared-docs/components/UseWithAI'
import CodeBlock from '@theme/CodeBlock'
import Layout from '@theme/Layout'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import { type KeyboardEvent, type ReactElement, useEffect, useRef, useState } from 'react'
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
		count: 3,
		desc: 'Dates, times and timezones.',
		chips: ['date', 'datetime', 'time'],
	},
	{
		name: 'Numbers',
		count: 2,
		desc: 'Arithmetic, rounding and randomness.',
		chips: ['numbers', 'random'],
	},
	{
		name: 'Text & Strings',
		count: 5,
		desc: 'Formatting, slugs, HTML and i18n.',
		chips: ['strings', 'html', 'regex', 'i18n'],
	},
	{
		name: 'Security & Validation',
		count: 5,
		desc: 'Passwords, emails, URLs and guards.',
		chips: ['security', 'emails', 'url', 'validation'],
	},
	{
		name: 'Data Structures',
		count: 4,
		desc: 'Arrays, objects, maps and JSON.',
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

const EXAMPLES: { module: string; code: string }[] = [
	{
		module: 'date',
		code: `import { today, daysBetween }
  from '@rtorcato/js-common/date'

// "2026-10-20"
today()

// 292
daysBetween('2026-01-01', today())`,
	},
	{
		module: 'arrays',
		code: `import { unique, chunk }
  from '@rtorcato/js-common/arrays'

// [1, 2, 3]
unique([1, 2, 2, 3, 1])

// [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4, 5], 2)`,
	},
	{
		module: 'strings',
		code: `import { slugify, truncate }
  from '@rtorcato/js-common/strings'

// "cafe-resume"
slugify('Café & Résumé')

// "Tree-shak…"
truncate('Tree-shakeable', 10)`,
	},
	{
		module: 'uuid',
		code: `import { getUUIDv7, isUUID }
  from '@rtorcato/js-common/uuid'

// "018e5e2c-7c0a-7000-8000-…"
const id = getUUIDv7()

// true
isUUID(id)`,
	},
]

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Hero(): ReactElement {
	const mark = {
		light: useBaseUrl('/img/logo.svg'),
		dark: useBaseUrl('/img/logo-dark.svg'),
	}
	return (
		<header className={styles.hero}>
			<div className={styles.heroGlow} aria-hidden />
			<div className={styles.heroInner}>
				{/* Decorative: the H1 carries the name. The wrapper centres it, because
				    Docusaurus sets display: initial on the themed img. */}
				<div className={styles.heroMarkWrap} aria-hidden>
					<ThemedImage className={styles.heroMark} alt="" sources={mark} />
				</div>
				<h1 className={styles.wordmark}>
					js-<span className={styles.wordmarkAccent}>common</span>
				</h1>
				<p className={styles.tagline}>
					Tree-shakeable TypeScript utilities: tiny bundles, full type safety, CLI included.
				</p>
				<p className={styles.heroSub}>42 modules. One subpath each. Import only what you use.</p>

				<CodeCard />

				<div className={styles.heroActions}>
					<div className={styles.heroButtons}>
						<Link
							className={clsx('button button--primary button--lg', styles.cta)}
							to="/docs#install"
						>
							Get started →
						</Link>
						<Link
							className={clsx('button button--lg', styles.ctaSecondary)}
							to="/docs/modules/overview"
						>
							Browse modules
						</Link>
					</div>
					<InstallTabs pkg="@rtorcato/js-common" />
					<MigrationCallout />
				</div>
			</div>
		</header>
	)
}

const MIGRATION_DISMISSED = 'jc-migration-callout-dismissed'

function MigrationCallout(): ReactElement | null {
	// Starts hidden: localStorage doesn't exist during the prerender, and reading it
	// in an effect means people who dismissed it never see a flash of the callout.
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		try {
			setVisible(localStorage.getItem(MIGRATION_DISMISSED) !== '1')
		} catch {
			// Storage blocked (e.g. all cookies disabled) — show it, just don't persist.
			setVisible(true)
		}
	}, [])

	if (!visible) return null

	return (
		<div className={styles.migration}>
			<span>
				Upgrading from an older version?{' '}
				<Link to="/docs/guides/migration">Read the migration guide</Link>.
			</span>
			<button
				type="button"
				className={styles.migrationDismiss}
				aria-label="Dismiss migration guide notice"
				onClick={() => {
					setVisible(false)
					try {
						localStorage.setItem(MIGRATION_DISMISSED, '1')
					} catch {
						// Storage blocked — dismissal just won't persist across reloads.
					}
				}}
			>
				×
			</button>
		</div>
	)
}

function CodeCard(): ReactElement {
	const [active, setActive] = useState(0)
	const tabs = useRef<(HTMLButtonElement | null)[]>([])

	// Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation).
	function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
		if (!step) return
		e.preventDefault()
		const next = (active + step + EXAMPLES.length) % EXAMPLES.length
		setActive(next)
		tabs.current[next]?.focus()
	}

	return (
		<div className={styles.codeCard}>
			<div
				className={styles.codeTabs}
				role="tablist"
				aria-label="Module examples"
				onKeyDown={onKeyDown}
			>
				{EXAMPLES.map((ex, i) => (
					<button
						key={ex.module}
						ref={(el) => {
							tabs.current[i] = el
						}}
						type="button"
						role="tab"
						id={`hero-tab-${ex.module}`}
						aria-selected={i === active}
						aria-controls="hero-tabpanel"
						tabIndex={i === active ? 0 : -1}
						className={i === active ? styles.codeTabActive : styles.codeTab}
						onClick={() => setActive(i)}
					>
						{ex.module}
					</button>
				))}
			</div>
			<div
				id="hero-tabpanel"
				role="tabpanel"
				aria-labelledby={`hero-tab-${EXAMPLES[active].module}`}
				className={styles.codePanel}
			>
				<CodeBlock language="ts">{EXAMPLES[active].code}</CodeBlock>
			</div>
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
						Nine focused categories. 42 modules. Import exactly what you need.
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

const SIBLINGS = siblings('@rtorcato/js-common')

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
							<div className={styles.cardName} style={{ color: s.accent }}>
								{s.name}
							</div>
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
				<UseWithAI
					repo="rtorcato/js-common"
					plugin="js-common"
					skill="js-common"
					pkg="@rtorcato/js-common"
					blurb="One skill teaches your coding agent the subpath-import rules, the three error idioms and which modules are Node-only."
				/>
				<Siblings />
			</main>
		</Layout>
	)
}
