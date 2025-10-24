/**
 * Adds an event listener and returns a function to remove it.
 * @param target The event target.
 * @param type The event type.
 * @param handler The event handler.
 * @param options Event listener options.
 * @returns {() => void} Unsubscribe function.
 */
export function on<K extends keyof HTMLElementEventMap>(
	target: EventTarget,
	type: K,
	handler: (event: HTMLElementEventMap[K]) => void,
	options?: boolean | AddEventListenerOptions
): () => void {
	target.addEventListener(type, handler as EventListener, options)
	return () => target.removeEventListener(type, handler as EventListener, options)
}

/**
 * Dispatches a custom event on the target.
 * @param target The event target.
 * @param type The event type.
 * @param detail Optional detail data.
 * @returns {boolean} True if not canceled.
 */

// biome-ignore lint/suspicious/noExplicitAny: Event detail can be any type of data
export function emit(target: EventTarget, type: string, detail?: any): boolean {
	return target.dispatchEvent(new CustomEvent(type, { detail }))
}

/**
 * Waits for a single event to occur and resolves a promise.
 * @param target The event target.
 * @param type The event type.
 * @returns {Promise<Event>} Resolves with the event object.
 */
export function once<K extends keyof HTMLElementEventMap>(
	target: EventTarget,
	type: K
): Promise<HTMLElementEventMap[K]> {
	return new Promise((resolve) => {
		const handler = (event: Event) => {
			target.removeEventListener(type, handler)
			resolve(event as HTMLElementEventMap[K])
		}
		target.addEventListener(type, handler)
	})
}

/**
 * Prevents the default action for an event.
 * @param event The event object.
 */
export function preventDefault(event: Event): void {
	event.preventDefault()
}

/**
 * Stops propagation for an event.
 * @param event The event object.
 */
export function stopPropagation(event: Event): void {
	event.stopPropagation()
}
