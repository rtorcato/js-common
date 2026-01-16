/**
 * Performance benchmarks for @rtorcato/js-common utilities
 * Run with: node scripts/benchmark.mjs
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { performance } from 'node:perf_hooks'

// Import utilities (adjust path as needed)
const packagePath = join(process.cwd(), 'dist/index.js')
let utils

try {
	utils = await import(packagePath)
} catch (_error) {
	console.error('❌ Build required: run `pnpm run build-prod` first')
	process.exit(1)
}

const { unique, chunk, groupBy, flatten, compact, shuffle } = utils
const { camelCase, kebabCase, titleCase, capitalize } = utils
const { pick, omit, deepMerge, deepClone } = utils

/**
 * Simple benchmark runner
 */
function benchmark(name, fn, iterations = 10000) {
	// Warm up
	for (let i = 0; i < Math.min(iterations / 10, 1000); i++) {
		fn()
	}

	const start = performance.now()
	for (let i = 0; i < iterations; i++) {
		fn()
	}
	const end = performance.now()

	const totalTime = end - start
	const avgTime = totalTime / iterations
	const opsPerSecond = 1000 / avgTime

	console.log(`📊 ${name}:`)
	console.log(
		`   ${avgTime.toFixed(4)}ms avg | ${opsPerSecond.toFixed(0)} ops/sec | ${totalTime.toFixed(2)}ms total`
	)

	return avgTime
}

console.log('🚀 @rtorcato/js-common Performance Benchmarks')
console.log('='.repeat(50))

// Test data generators
const createArray = (size, generator = (i) => i) =>
	Array.from({ length: size }, (_, i) => generator(i))

const createUsers = (count) =>
	createArray(count, (i) => ({
		id: i,
		name: `User ${i}`,
		email: `user${i}@example.com`,
		group: i % 5,
		active: i % 3 === 0,
		nested: { preferences: { theme: 'dark', lang: 'en' } },
	}))

// Array benchmarks
console.log('\n📋 Array Utilities')
console.log('-'.repeat(30))

const largeArray = createArray(10000, (i) => i % 1000) // Many duplicates
benchmark('unique(10k items w/ dupes)', () => unique(largeArray))

const chunkedArray = createArray(10000)
benchmark('chunk(10k items, size 50)', () => chunk(chunkedArray, 50))

const nestedArray = createArray(1000, (i) => createArray(10, (j) => i * 10 + j))
benchmark('flatten(1k nested arrays)', () => flatten(nestedArray))

const mixedArray = [1, null, 0, 'hello', '', false, true, undefined, 'world']
benchmark('compact(mixed falsy)', () => compact(mixedArray), 50000)

const shuffleArray = createArray(1000)
benchmark('shuffle(1k items)', () => shuffle(shuffleArray), 1000)

const users = createUsers(1000)
benchmark('groupBy(1k objects)', () => groupBy(users, 'group'))

// String benchmarks
console.log('\n📝 String Utilities')
console.log('-'.repeat(30))

const testStrings = [
	'hello world',
	'camelCaseString',
	'kebab-case-string',
	'Title Case String',
	'UPPERCASE_STRING',
]

testStrings.forEach((str) => {
	benchmark(`camelCase('${str}')`, () => camelCase(str), 20000)
})

benchmark('kebabCase(camelCase)', () => kebabCase('camelCaseString'), 20000)
benchmark('titleCase(lowercase)', () => titleCase('hello world test'), 20000)
benchmark('capitalize(string)', () => capitalize('hello'), 50000)

// Object benchmarks
console.log('\n📦 Object Utilities')
console.log('-'.repeat(30))

const testObject = {
	id: 1,
	name: 'Test User',
	email: 'test@example.com',
	metadata: {
		preferences: { theme: 'dark', notifications: true },
		stats: { loginCount: 42, lastSeen: new Date() },
	},
	tags: ['admin', 'premium'],
	settings: { privacy: 'public', language: 'en' },
}

benchmark('pick(object, 3 keys)', () => pick(testObject, ['id', 'name', 'email']), 50000)
benchmark('omit(object, 2 keys)', () => omit(testObject, ['metadata', 'settings']), 50000)
benchmark('deepClone(nested object)', () => deepClone(testObject), 10000)

const obj1 = { a: 1, b: { c: 2, d: 3 } }
const obj2 = { b: { e: 4 }, f: 5 }
benchmark('deepMerge(2 objects)', () => deepMerge(obj1, obj2), 20000)

// Memory usage
console.log('\n💾 Memory Usage')
console.log('-'.repeat(30))

if (global.gc) {
	global.gc()
	const memBefore = process.memoryUsage()

	// Create large dataset and process it
	const largeUsers = createUsers(50000)
	const processed = groupBy(
		largeUsers.filter((u) => u.active).map((u) => pick(u, ['id', 'name'])),
		(u) => u.id % 10
	)

	global.gc()
	const memAfter = process.memoryUsage()

	const heapDiff = (memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024
	console.log(`📊 Processed ${largeUsers.length} users: ${heapDiff.toFixed(2)}MB heap diff`)
	console.log(`📊 Result groups: ${Object.keys(processed).length}`)
} else {
	console.log('🔍 Run with --expose-gc flag for memory analysis')
}

// Performance summary
console.log('\n✅ Benchmark Complete')
console.log('='.repeat(50))
console.log('📈 All operations completed successfully')
console.log('💡 Consider running with different data sizes for scaling analysis')

// Bundle size info
try {
	const packageInfo = JSON.parse(readFileSync('package.json', 'utf8'))
	const distSize = readFileSync('dist/index.js', 'utf8').length
	console.log(`📦 Bundle size: ${(distSize / 1024).toFixed(2)}KB`)
	console.log(`📌 Version: ${packageInfo.version}`)
} catch (_error) {
	console.log('📦 Bundle size info unavailable')
}
