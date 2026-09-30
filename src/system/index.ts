const IOS_UA = /iPad|iPhone|iPod/

/**
 * Checks if the current OS is macOS.
 *
 * The user-agent branch is deprecated — browser detection belongs to
 * `@rtorcato/browser-common` and will be removed in the next major. In Node this
 * reads `process.platform` and stays.
 *
 * @example
 * ```typescript
 * isMacOs() // true on macOS (via process.platform in Node, userAgent in the browser)
 * ```
 *
 * @returns {boolean} True if macOS, false otherwise.
 */
export function isMacOs(): boolean {
	if (typeof window !== 'undefined') {
		const ua = window.navigator.userAgent
		// ponytail: iPadOS 13+ sends a desktop Mac UA and still reads as macOS; browser-common handles that
		return ua.includes('Mac') && !IOS_UA.test(ua)
	}
	if (typeof process !== 'undefined' && process.platform) {
		return process.platform === 'darwin'
	}
	return false
}

/**
 * Checks if the current OS is Windows.
 *
 * The user-agent branch is deprecated — browser detection belongs to
 * `@rtorcato/browser-common` and will be removed in the next major. In Node this
 * reads `process.platform` and stays.
 *
 * @example
 * ```typescript
 * isWindows() // true when process.platform === 'win32'
 * ```
 *
 * @returns {boolean} True if Windows, false otherwise.
 */
export function isWindows(): boolean {
	if (typeof window !== 'undefined') {
		return window.navigator.userAgent.includes('Windows')
	}
	if (typeof process !== 'undefined' && process.platform) {
		return process.platform === 'win32'
	}
	return false
}

/**
 * Checks if the current OS is Linux.
 *
 * The user-agent branch is deprecated — browser detection belongs to
 * `@rtorcato/browser-common` and will be removed in the next major. In Node this
 * reads `process.platform` and stays.
 *
 * @example
 * ```typescript
 * isLinux() // true when process.platform === 'linux'
 * ```
 *
 * @returns {boolean} True if Linux, false otherwise.
 */
export function isLinux(): boolean {
	if (typeof window !== 'undefined') {
		const ua = window.navigator.userAgent
		return ua.includes('Linux') && !ua.includes('Android')
	}
	if (typeof process !== 'undefined' && process.platform) {
		return process.platform === 'linux'
	}
	return false
}

/**
 * Checks if the device is running iOS. Always `false` in Node.
 * @deprecated Browser detection belongs to `@rtorcato/browser-common`; removed in the next major.
 * @returns {boolean} True if iOS, false otherwise.
 */
export function isIOS(): boolean {
	if (typeof window !== 'undefined') {
		return IOS_UA.test(window.navigator.userAgent) && !(window as any).MSStream
	}
	return false
}

/**
 * Checks if the device is running Android. Always `false` in Node.
 * @deprecated Browser detection belongs to `@rtorcato/browser-common`; removed in the next major.
 * @returns {boolean} True if Android, false otherwise.
 */
export function isAndroid(): boolean {
	if (typeof window !== 'undefined') {
		return window.navigator.userAgent.includes('Android')
	}
	return false
}

/**
 * Returns a string representing the detected platform.
 *
 * The user-agent branch is deprecated — browser detection belongs to
 * `@rtorcato/browser-common` and will be removed in the next major. In Node this
 * reads `process.platform` and stays.
 * @returns {string} The platform name (e.g., 'macos', 'windows', 'linux', 'ios', 'android', or 'unknown').
 */
export function getPlatform(): string {
	// iOS and Android UAs also contain 'Mac' / 'Linux', so they must be checked first.
	if (isIOS()) return 'ios'
	if (isAndroid()) return 'android'
	if (isMacOs()) return 'macos'
	if (isWindows()) return 'windows'
	if (isLinux()) return 'linux'
	return 'unknown'
}

/**
 * Checks if the device supports touch events. Always `false` in Node.
 * @deprecated Browser detection belongs to `@rtorcato/browser-common`; removed in the next major.
 * @returns {boolean} True if touch is supported, false otherwise.
 */
export function isTouchDevice(): boolean {
	if (typeof window === 'undefined') return false
	return (
		'ontouchstart' in window ||
		(typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0)
	)
}
