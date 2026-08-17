/**
 * Converts a string to Title Case (capitalizes the first letter of each word).
 *
 * @example
 * ```typescript
 * titleCase('hello world') // 'Hello World'
 * titleCase('javaScript is awesome') // 'Javascript Is Awesome'
 * titleCase('UPPER CASE TEXT') // 'Upper Case Text'
 * titleCase('mixed-case_string') // 'Mixed-case_string'
 * ```
 *
 * @param str The string to convert to title case
 * @returns The title-cased string
 * @category String Utilities
 */
export function titleCase(str: string): string {
	return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
}

/**
 * Capitalizes the first letter of a string.
 *
 * @example
 * ```typescript
 * capitalize('hello') // 'Hello'
 * capitalize('WORLD') // 'WORLD'
 * capitalize('') // ''
 * capitalize('a') // 'A'
 * ```
 *
 * @param str The string to capitalize
 * @returns The capitalized string
 * @category String Utilities
 */
export function capitalize(str: string): string {
	return str.length === 0 ? '' : (str[0]?.toUpperCase() ?? '') + str.slice(1)
}

/**
 * Converts a string to camelCase.
 * Removes hyphens, underscores, and spaces while capitalizing following letters.
 *
 * @example
 * ```typescript
 * camelCase('hello world') // 'helloWorld'
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 * camelCase('Hello World') // 'helloWorld'
 * camelCase('API_KEY_NAME') // 'aPIKEYNAME'
 * ```
 *
 * @param str The string to convert to camelCase
 * @returns The camelCased string
 * @category String Utilities
 */
export function camelCase(str: string): string {
	return str
		.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
		.replace(/^(.)/, (m) => m.toLowerCase())
}

/**
 * Converts a string to kebab-case.
 * Converts camelCase and spaces/underscores to hyphen-separated lowercase.
 *
 * @example
 * ```typescript
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('Hello World') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 * kebabCase('APIKeyName') // 'a-p-i-key-name'
 * kebabCase('camelCaseString') // 'camel-case-string'
 * ```
 *
 * @param str The string to convert to kebab-case
 * @returns The kebab-cased string
 * @category String Utilities
 */
export function kebabCase(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[_\s]+/g, '-')
		.toLowerCase()
}

/**
 * Converts a string to snake_case.
 * @param str The string to convert.
 * @returns The snake_cased string.
 */
export function snakeCase(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, '$1_$2')
		.replace(/[-\s]+/g, '_')
		.toLowerCase()
}

/**
 * Truncates a string to a maximum length, adding ellipsis if needed.
 * @param str The string to truncate.
 * @param maxLength The maximum length.
 * @returns The truncated string.
 */
export function truncate(str: string, maxLength: number): string {
	return str.length > maxLength ? `${str.slice(0, maxLength - 1)}…` : str
}

/**
 * Reverses a string.
 *
 * @example
 * ```typescript
 * reverse('hello') // 'olleh'
 * reverse('abc123') // '321cba'
 * ```
 *
 * @param str The string to reverse
 * @returns The reversed string
 */
export function reverse(str: string): string {
	return [...str].reverse().join('')
}

/**
 * Converts a string to a URL-friendly slug.
 * Handles unicode, accents, and special characters.
 *
 * @example
 * ```typescript
 * slugify('Hello World!') // 'hello-world'
 * slugify('Café & Résumé') // 'cafe-resume'
 * slugify('  Multiple   Spaces  ') // 'multiple-spaces'
 * ```
 *
 * @param str The string to slugify
 * @returns The slugified string
 */
export function slugify(str: string): string {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritics
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric
		.replace(/[\s_]+/g, '-') // Replace spaces/underscores with hyphens
		.replace(/-+/g, '-') // Remove consecutive hyphens
		.replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

/**
 * Splits a string into an array of words.
 *
 * @example
 * ```typescript
 * words('hello world') // ['hello', 'world']
 * words('camelCaseString') // ['camel', 'Case', 'String']
 * words('hello-world_test') // ['hello', 'world', 'test']
 * ```
 *
 * @param str The string to split
 * @returns Array of words
 */
export function words(str: string): string[] {
	return str
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/[-_]+/g, ' ')
		.trim()
		.split(/\s+/)
		.filter(Boolean)
}

/**
 * Counts the number of words in a string.
 *
 * @example
 * ```typescript
 * wordCount('hello world') // 2
 * wordCount('  one  two  three  ') // 3
 * wordCount('') // 0
 * ```
 *
 * @param str The string to count words in
 * @returns The word count
 */
export function wordCount(str: string): number {
	const trimmed = str.trim()
	if (trimmed === '') return 0
	return trimmed.split(/\s+/).length
}

/**
 * Returns the plural form of a word based on count.
 *
 * @example
 * ```typescript
 * pluralize('item', 0) // 'items'
 * pluralize('item', 1) // 'item'
 * pluralize('item', 5) // 'items'
 * pluralize('box', 2, 'boxes') // 'boxes'
 * ```
 *
 * @param word The singular word
 * @param count The count
 * @param plural Optional custom plural form
 * @returns The pluralized word
 */
export function pluralize(word: string, count: number, plural?: string): string {
	if (count === 1) return word
	return plural ?? `${word}s`
}

/**
 * Converts a number to its ordinal form.
 *
 * @example
 * ```typescript
 * ordinalize(1) // '1st'
 * ordinalize(2) // '2nd'
 * ordinalize(3) // '3rd'
 * ordinalize(4) // '4th'
 * ordinalize(11) // '11th'
 * ordinalize(21) // '21st'
 * ```
 *
 * @param num The number to ordinalize
 * @returns The ordinal string
 */
export function ordinalize(num: number): string {
	const abs = Math.abs(num)
	const lastTwo = abs % 100
	const lastOne = abs % 10

	if (lastTwo >= 11 && lastTwo <= 13) {
		return `${num}th`
	}

	switch (lastOne) {
		case 1:
			return `${num}st`
		case 2:
			return `${num}nd`
		case 3:
			return `${num}rd`
		default:
			return `${num}th`
	}
}

/**
 * Checks if a string is blank (empty or only whitespace).
 *
 * @example
 * ```typescript
 * isBlank('') // true
 * isBlank('   ') // true
 * isBlank('\t\n') // true
 * isBlank('hello') // false
 * isBlank(' a ') // false
 * ```
 *
 * @param str The string to check
 * @returns True if blank, false otherwise
 */
export function isBlank(str: string): boolean {
	return str.trim().length === 0
}

/**
 * Masks part of a string with a specified character.
 *
 * @example
 * ```typescript
 * mask('1234567890', 0, 4) // '******7890'
 * mask('1234567890', 6, 10) // '123456****'
 * mask('secret', 0, 3, 'X') // 'XXXret'
 * mask('4111111111111111', 0, 12) // '************1111'
 * ```
 *
 * @param str The string to mask
 * @param start Start index of masking
 * @param end End index of masking
 * @param char The masking character (default: '*')
 * @returns The masked string
 */
export function mask(str: string, start: number, end: number, char = '*'): string {
	if (start < 0) start = 0
	if (end > str.length) end = str.length
	if (start >= end) return str

	const masked = char.repeat(end - start)
	return str.slice(0, start) + masked + str.slice(end)
}

/**
 * Simple template interpolation using ${key} syntax.
 *
 * @example
 * ```typescript
 * template('Hello, ${name}!', { name: 'World' }) // 'Hello, World!'
 * template('${a} + ${b} = ${c}', { a: 1, b: 2, c: 3 }) // '1 + 2 = 3'
 * template('Missing ${key}', {}) // 'Missing ${key}'
 * ```
 *
 * @param str The template string
 * @param data The data object with values
 * @returns The interpolated string
 */
export function template(str: string, data: Record<string, unknown>): string {
	return str.replace(/\$\{(\w+)\}/g, (match, key) => {
		return Object.hasOwn(data, key) ? String(data[key]) : match
	})
}
