#!/usr/bin/env node

import { program } from 'commander'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Import utility functions
import { daysBetween, today } from '../date/index.js'
import { nowIso } from '../datetime/index.js'
import { fileExists, getFileExtension } from '../file/index.js'
import { capitalize, padZero, toTitleCase } from '../formatting/index.js'
import { getNodeMajorVersion } from '../node/index.js'
import { average, clamp, getRandomInt, roundTo, sum } from '../numbers/index.js'
import { getProcessId, getProcessUptime, isCI } from '../process/index.js'
import { generateSecureToken, isStrongPassword } from '../security/index.js'
import { nowTime } from '../time/index.js'
import { isValidUrl } from '../url/index.js'

// Get package version
const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../../package.json'), 'utf-8'))

program
	.name('js-common')
	.description('CLI utilities from @rtorcato/js-common')
	.version(packageJson.version)

// Date & Time commands
const dateCmd = program.command('date').description('Date and time utilities')

dateCmd
	.command('today')
	.description("Get today's date in YYYY-MM-DD format")
	.action(() => {
		console.log(today())
	})

dateCmd
	.command('now')
	.description('Get current timestamp')
	.option('-i, --iso', 'ISO format')
	.option('-t, --time', 'Time only (HH:MM:SS)')
	.action((options: { iso?: boolean; time?: boolean }) => {
		if (options.iso) {
			console.log(nowIso())
		} else if (options.time) {
			console.log(nowTime())
		} else {
			console.log(new Date().toLocaleString())
		}
	})

dateCmd
	.command('between <date1> <date2>')
	.description('Calculate days between two dates (YYYY-MM-DD format)')
	.action((date1: string, date2: string) => {
		try {
			const days = daysBetween(date1, date2)
			console.log(days)
		} catch (_error) {
			console.error('Error: Invalid date format. Use YYYY-MM-DD')
			process.exit(1)
		}
	})

// Math commands
const mathCmd = program.command('math').description('Mathematical utilities')

mathCmd
	.command('sum <numbers...>')
	.description('Calculate sum of numbers')
	.action((numbers: string[]) => {
		const nums = numbers.map(Number).filter((n: number) => !Number.isNaN(n))
		if (nums.length === 0) {
			console.error('Error: No valid numbers provided')
			process.exit(1)
		}
		console.log(sum(nums))
	})

mathCmd
	.command('avg <numbers...>')
	.description('Calculate average of numbers')
	.action((numbers: string[]) => {
		const nums = numbers.map(Number).filter((n: number) => !Number.isNaN(n))
		if (nums.length === 0) {
			console.error('Error: No valid numbers provided')
			process.exit(1)
		}
		console.log(average(nums))
	})

mathCmd
	.command('random')
	.description('Generate random number')
	.option('--min <min>', 'Minimum value', '0')
	.option('--max <max>', 'Maximum value', '100')
	.action((options: { min: string; max: string }) => {
		const min = parseInt(options.min, 10)
		const max = parseInt(options.max, 10)
		console.log(getRandomInt(min, max))
	})

mathCmd
	.command('round <number>')
	.description('Round number to specified decimal places')
	.option('-d, --decimals <decimals>', 'Number of decimal places', '2')
	.action((number: string, options: { decimals: string }) => {
		const num = parseFloat(number)
		const decimals = parseInt(options.decimals, 10)
		if (Number.isNaN(num)) {
			console.error('Error: Invalid number')
			process.exit(1)
		}
		console.log(roundTo(num, decimals))
	})

mathCmd
	.command('clamp <number> <min> <max>')
	.description('Clamp number between min and max values')
	.action((number: string, min: string, max: string) => {
		const num = parseFloat(number)
		const minVal = parseFloat(min)
		const maxVal = parseFloat(max)
		if (Number.isNaN(num) || Number.isNaN(minVal) || Number.isNaN(maxVal)) {
			console.error('Error: Invalid number(s)')
			process.exit(1)
		}
		console.log(clamp(num, minVal, maxVal))
	})

// Text formatting commands
const textCmd = program.command('text').description('Text formatting utilities')

textCmd
	.command('capitalize <text>')
	.description('Capitalize first letter of text')
	.action((text: string) => {
		console.log(capitalize(text))
	})

textCmd
	.command('title <text>')
	.description('Convert text to title case')
	.action((text: string) => {
		console.log(toTitleCase(text))
	})

textCmd
	.command('pad <value>')
	.description('Pad value with leading zeros')
	.option('-l, --length <length>', 'Desired length', '2')
	.action((value: string, options: { length: string }) => {
		const length = parseInt(options.length, 10)
		console.log(padZero(value, length))
	})

// File utilities
const fileCmd = program.command('file').description('File utilities')

fileCmd
	.command('exists <path>')
	.description('Check if file exists')
	.action(async (path: string) => {
		const exists = await fileExists(path)
		console.log(exists)
		process.exit(exists ? 0 : 1)
	})

fileCmd
	.command('ext <filename>')
	.description('Get file extension')
	.action((filename: string) => {
		console.log(getFileExtension(filename))
	})

// Security utilities
const securityCmd = program.command('security').description('Security utilities')

securityCmd
	.command('password <password>')
	.description('Check if password is strong')
	.action((password: string) => {
		const isStrong = isStrongPassword(password)
		console.log(isStrong ? 'Strong' : 'Weak')
		process.exit(isStrong ? 0 : 1)
	})

securityCmd
	.command('token')
	.description('Generate secure random token')
	.option('-l, --length <length>', 'Token length in bytes', '32')
	.action((options: { length: string }) => {
		const length = parseInt(options.length, 10)
		console.log(generateSecureToken(length))
	})

// Validation utilities
const validateCmd = program.command('validate').description('Validation utilities')

validateCmd
	.command('url <url>')
	.description('Validate URL format')
	.action((url: string) => {
		const isValid = isValidUrl(url)
		console.log(isValid ? 'Valid' : 'Invalid')
		process.exit(isValid ? 0 : 1)
	})

// System information
const systemCmd = program.command('system').description('System information')

systemCmd
	.command('pid')
	.description('Get current process ID')
	.action(() => {
		console.log(getProcessId())
	})

systemCmd
	.command('uptime')
	.description('Get process uptime in seconds')
	.action(() => {
		console.log(getProcessUptime())
	})

systemCmd
	.command('ci')
	.description('Check if running in CI environment')
	.action(() => {
		const ci = isCI()
		console.log(ci ? 'CI' : 'Not CI')
		process.exit(ci ? 0 : 1)
	})

systemCmd
	.command('node-version')
	.description('Get Node.js major version')
	.action(() => {
		console.log(getNodeMajorVersion())
	})

program.parse()
