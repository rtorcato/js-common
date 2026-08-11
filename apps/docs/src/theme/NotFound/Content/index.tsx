/**
 * Swizzled (eject) NotFound/Content — the body of the 404 page.
 *
 * The stock version is a dead end: a heading, "we could not find what you were
 * looking for", and no way onward. This one keeps the same slot (the parent
 * @theme/NotFound still supplies Layout + page metadata) and adds links back
 * into the docs so a stale or mistyped URL lands somewhere useful.
 */
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import clsx from 'clsx'
import type { ReactElement } from 'react'

type Destination = {
	to: string
	label: string
	desc: string
}

const DESTINATIONS: Destination[] = [
	{ to: '/docs', label: 'Documentation', desc: 'Install, quick start, and guides.' },
	{ to: '/docs/modules/overview', label: 'Modules', desc: 'Every module and what it covers.' },
	{ to: '/docs/api', label: 'API reference', desc: 'Generated signatures for each export.' },
]

export default function NotFoundContent({ className }: { className?: string }): ReactElement {
	return (
		<main className={clsx('container margin-vert--xl', className)}>
			<div className="row">
				<div className="col col--8 col--offset-2">
					<Heading as="h1" className="hero__title">
						Page not found
					</Heading>
					<p>
						That page doesn't exist — it may have moved when the docs were reorganised, or the link
						that brought you here is out of date.
					</p>
					<p>
						<Link className="button button--primary button--lg" to="/docs">
							Go to the docs
						</Link>
					</p>
					<ul>
						{DESTINATIONS.map((destination) => (
							<li key={destination.to}>
								<Link to={destination.to}>{destination.label}</Link> — {destination.desc}
							</li>
						))}
					</ul>
					<p>
						If a link on this site is broken,{' '}
						<Link to="https://github.com/rtorcato/js-common/issues">open an issue</Link>.
					</p>
				</div>
			</div>
		</main>
	)
}
