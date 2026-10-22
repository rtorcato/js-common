export interface TtlCacheOptions {
	/** How long a loaded value counts as fresh, in milliseconds. */
	ttlMs: number
	/** When a refresh throws, serve the last good value instead of rethrowing. Default `false`. */
	staleOnError?: boolean
}

export interface TtlCache<V> {
	/** Returns the fresh cached value for `key`, or calls `load` and caches the result. */
	get(key: string, load: () => Promise<V>): Promise<V>
	/** Drops one key, so the next `get` loads again. */
	delete(key: string): void
	/** Drops every key. */
	clear(): void
}

/**
 * In-memory TTL cache with optional stale-on-error.
 *
 * `get` serves a value younger than `ttlMs` without calling `load`. Concurrent `get`s for the same
 * key share one `load`. With `staleOnError`, a failed refresh returns the last good value (however
 * old) and leaves it in place, so the next `get` retries; with no good value yet, or without
 * `staleOnError`, the error is rethrown. Entries are never evicted by age, only replaced — bound the
 * key space yourself or call `delete` / `clear`.
 *
 * @example
 * ```typescript
 * const quotes = createTtlCache<Quote>({ ttlMs: 60_000, staleOnError: true })
 * const quote = await quotes.get('AAPL', () => fetchQuote('AAPL'))
 * ```
 *
 * @param options Freshness window and error behaviour.
 * @returns {TtlCache}
 */
export function createTtlCache<V>({ ttlMs, staleOnError = false }: TtlCacheOptions): TtlCache<V> {
	const entries = new Map<string, { value: V; at: number }>()
	const inflight = new Map<string, Promise<V>>()

	return {
		get(key, load) {
			const hit = entries.get(key)
			if (hit && Date.now() - hit.at < ttlMs) return Promise.resolve(hit.value)
			let pending = inflight.get(key)
			if (!pending) {
				pending = load()
					.then((value) => {
						entries.set(key, { value, at: Date.now() })
						return value
					})
					.catch((error) => {
						if (staleOnError && hit) return hit.value
						throw error
					})
					.finally(() => inflight.delete(key))
				inflight.set(key, pending)
			}
			return pending
		},
		delete(key) {
			entries.delete(key)
		},
		clear() {
			entries.clear()
		},
	}
}
