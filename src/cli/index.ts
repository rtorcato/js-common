import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import { program } from 'commander'
import figlet from 'figlet'
import gradient from 'gradient-string'
import inquirer from 'inquirer'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Import utility functions
import { daysBetween, today } from '../date/index'
import { fileExists, getFileExtension } from '../file/index'
import { capitalize, padZero, toTitleCase } from '../formatting/index'
import { getNodeMajorVersion } from '../node/index'
import { average, clamp, getRandomInt, roundTo, sum } from '../numbers/index'
import { getProcessId, getProcessUptime, isCI } from '../process/index'
import { generateSecureToken, isStrongPassword } from '../security/index'
import { isValidUrl } from '../url/index'

// Get current directory for ESM
const currentDir = dirname(fileURLToPath(import.meta.url))

// Get package version
const packageJson = JSON.parse(readFileSync(resolve(currentDir, '../../package.json'), 'utf-8'))

program
	.name('js-common')
	.description(chalk.cyan('✨ CLI utilities from @rtorcato/js-common'))
	.version(packageJson.version)

// Function categories for list and interactive mode
const functionCategories = {
	date: {
		name: '📅 Date & Time',
		functions: [
			{ name: 'today', description: "Get today's date (YYYY-MM-DD)" },
			{ name: 'now', description: 'Get current timestamp' },
			{ name: 'between', description: 'Calculate days between dates' },
		],
	},
	math: {
		name: '🔢 Mathematical',
		functions: [
			{ name: 'sum', description: 'Calculate sum of numbers' },
			{ name: 'avg', description: 'Calculate average of numbers' },
			{ name: 'random', description: 'Generate random number' },
			{ name: 'round', description: 'Round to decimal places' },
			{ name: 'clamp', description: 'Clamp between min/max' },
		],
	},
	text: {
		name: '📝 Text Formatting',
		functions: [
			{ name: 'capitalize', description: 'Capitalize first letter' },
			{ name: 'title', description: 'Convert to title case' },
			{ name: 'pad', description: 'Pad with leading zeros' },
		],
	},
	file: {
		name: '📁 File Operations',
		functions: [
			{ name: 'exists', description: 'Check if file exists' },
			{ name: 'ext', description: 'Get file extension' },
		],
	},
	security: {
		name: '🔒 Security',
		functions: [
			{ name: 'password', description: 'Check password strength' },
			{ name: 'token', description: 'Generate secure token' },
		],
	},
	validate: {
		name: '✅ Validation',
		functions: [{ name: 'url', description: 'Validate URL format' }],
	},
	system: {
		name: '💻 System Info',
		functions: [
			{ name: 'pid', description: 'Get process ID' },
			{ name: 'uptime', description: 'Get process uptime' },
			{ name: 'ci', description: 'Check CI environment' },
			{ name: 'node-version', description: 'Get Node.js version' },
		],
	},
}

// List all functions
program.option('-l, --list', 'List all available functions').hook('preAction', (thisCommand) => {
	const options = thisCommand.opts()
	if (options['list']) {
		console.log(chalk.cyan('\n✨ Available Functions:\n'))

		Object.entries(functionCategories).forEach(([key, category]) => {
			console.log(chalk.bold(category.name))
			category.functions.forEach((func) => {
				console.log(
					chalk.gray(`  js-common ${key} ${func.name}`) + chalk.dim(` - ${func.description}`)
				)
			})
			console.log()
		})

		console.log(
			chalk.yellow('💡 Use ') +
				chalk.green('js-common interactive') +
				chalk.yellow(' for interactive mode')
		)
		console.log(
			chalk.yellow('💡 Use ') +
				chalk.green('js-common <command> --help') +
				chalk.yellow(' for detailed help\n')
		)
		process.exit(0)
	}
})

// Interactive mode
program
	.command('interactive')
	.alias('i')
	.description('🎮 Interactive mode with guided prompts')
	.action(async () => {
		// Welcome animation
		const title = figlet.textSync('JS Common', { font: 'Small' })
		console.log(gradient.pastel.multiline(title))

		const rainbow = chalkAnimation.rainbow('\n✨ Welcome to JS Common Interactive Mode! ✨\n')
		await new Promise((resolve) => setTimeout(resolve, 1000))
		rainbow.stop()

		try {
			const { category } = await inquirer.prompt([
				{
					type: 'list',
					name: 'category',
					message: chalk.cyan('What would you like to do?'),
					choices: Object.entries(functionCategories).map(([key, cat]) => ({
						name: cat.name,
						value: key,
					})),
				},
			])

			const selectedCategory = functionCategories[category as keyof typeof functionCategories]
			const { functionName } = await inquirer.prompt([
				{
					type: 'list',
					name: 'functionName',
					message: chalk.cyan(`Choose a ${selectedCategory.name} function:`),
					choices: selectedCategory.functions.map((func) => ({
						name: `${func.name} - ${func.description}`,
						value: func.name,
					})),
				},
			])

			console.log(chalk.green(`\n🚀 You can run this command:`))
			console.log(chalk.yellow(`js-common ${category} ${functionName} [arguments]`))
			console.log(
				chalk.gray(`\nFor detailed usage, run: js-common ${category} ${functionName} --help\n`)
			)
		} catch (error) {
			if (error && typeof error === 'object' && 'isTtyError' in error) {
				console.log(chalk.red('\n❌ Interactive mode requires a TTY terminal'))
			} else {
				console.log(chalk.red('\n❌ Something went wrong in interactive mode'))
			}
			process.exit(1)
		}
	})

// Date commands
const dateCmd = program.command('date').description('📅 Date and time utilities')

dateCmd
	.command('today')
	.description("Get today's date (YYYY-MM-DD)")
	.action(() => {
		console.log(today())
	})

dateCmd
	.command('now')
	.description('Get current timestamp')
	.option('-i, --iso', 'ISO format')
	.option('-t, --time', 'Time only')
	.action((options) => {
		if (options.iso) {
			console.log(new Date().toISOString())
		} else if (options.time) {
			console.log(new Date().toTimeString())
		} else {
			console.log(Date.now())
		}
	})

dateCmd
	.command('between')
	.description('Calculate days between dates')
	.argument('<date1>', 'First date (YYYY-MM-DD)')
	.argument('<date2>', 'Second date (YYYY-MM-DD)')
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
