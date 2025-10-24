/**
 * Checks if the current OS is macOS.
 * @returns {boolean} True if macOS, false otherwise.
 */
export function isMacOs(): boolean {
	if (typeof window !== 'undefined') {
		return window.navigator.userAgent.includes('Mac')
	}
	if (typeof process !== 'undefined' && process.platform) {
		return process.platform === 'darwin'
	}
	return false
}

/**
 * Checks if the current OS is Windows.
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
 * @returns {boolean} True if Linux, false otherwise.
 */
export function isLinux(): boolean {
	if (typeof window !== 'undefined') {
		return window.navigator.userAgent.includes('Linux')
	}
	if (typeof process !== 'undefined' && process.platform) {
		return process.platform === 'linux'
	}
	return false
}

/**
 * Checks if the device is running iOS.
 * @returns {boolean} True if iOS, false otherwise.
 */
export function isIOS(): boolean {
	if (typeof window !== 'undefined') {
		return /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !(window as any).MSStream
	}
	return false
}

/**
 * Checks if the device is running Android.
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
 * @returns {string} The platform name (e.g., 'macos', 'windows', 'linux', 'ios', 'android', or 'unknown').
 */
export function getPlatform(): string {
	if (isMacOs()) return 'macos'
	if (isWindows()) return 'windows'
	if (isLinux()) return 'linux'
	if (isIOS()) return 'ios'
	if (isAndroid()) return 'android'
	return 'unknown'
}

/**
 * Checks if the device supports touch events.
 * @returns {boolean} True if touch is supported, false otherwise.
 */
export function isTouchDevice(): boolean {
	if (typeof window === 'undefined') return false
	return (
		'ontouchstart' in window ||
		(typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0)
	)
}
