import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import { type ReactElement, useEffect, useState } from 'react'
import styles from './index.module.css'

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconKey = 'gauge' | 'layers' | 'brackets' | 'terminal' | 'copy' | 'check'

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
	copy: (
		<>
			<rect x="9" y="9" width="11" height="11" rx="2" />
			<path d="M5 15V6a2 2 0 0 1 2-2h9" />
		</>
	),
	check: <path d="M5 12l5 5L20 7" />,
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

const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const
type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const INSTALL_CMDS: Record<PackageManager, string> = {
	npm: 'npm i @rtorcato/js-common',
	pnpm: 'pnpm add @rtorcato/js-common',
	yarn: 'yarn add @rtorcato/js-common',
	bun: 'bun add @rtorcato/js-common',
}

const PM_STORAGE_KEY = 'jc-pkg-manager'

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

function InstallPill(): ReactElement {
	const [pm, setPm] = useState<PackageManager>('npm')
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		const stored = window.localStorage.getItem(PM_STORAGE_KEY)
		if (stored && (PACKAGE_MANAGERS as readonly string[]).includes(stored)) {
			setPm(stored as PackageManager)
		}
	}, [])

	function selectPm(next: PackageManager) {
		setPm(next)
		try {
			window.localStorage.setItem(PM_STORAGE_KEY, next)
		} catch {
			// localStorage may be unavailable — ignore.
		}
	}

	async function onCopy() {
		try {
			await navigator.clipboard.writeText(INSTALL_CMDS[pm])
			setCopied(true)
			setTimeout(() => setCopied(false), 1600)
		} catch {
			// Clipboard may be unavailable (e.g., insecure context) — ignore.
		}
	}

	return (
		<div className={styles.installGroup}>
			<div className={styles.pmTabs} role="tablist" aria-label="Package manager">
				{PACKAGE_MANAGERS.map((name) => (
					<button
						key={name}
						type="button"
						role="tab"
						aria-selected={pm === name}
						className={clsx(styles.pmTab, pm === name && styles.pmTabActive)}
						onClick={() => selectPm(name)}
					>
						{name}
					</button>
				))}
			</div>
			<div className={styles.install}>
				<span className={styles.installPrompt} aria-hidden>
					$
				</span>
				<code className={styles.installCmd}>{INSTALL_CMDS[pm]}</code>
				<button
					type="button"
					className={styles.installCopy}
					onClick={onCopy}
					aria-label={copied ? 'Copied' : 'Copy install command'}
				>
					<Icon icon={copied ? 'check' : 'copy'} title={copied ? 'Copied' : 'Copy'} size={16} />
				</button>
			</div>
		</div>
	)
}

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
					<InstallPill />
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
