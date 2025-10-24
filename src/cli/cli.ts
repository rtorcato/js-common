import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import { program } from 'commander'
import figlet from 'figlet'
import gradient from 'gradient-string'
import inquirer from 'inquirer'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Get current directory
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

// List all functions - add as a separate command
program
	.command('list')
	.alias('ls')
	.description('📋 List all available functions')
	.action(() => {
		console.log(chalk.cyan('\n✨ Available Functions:\n'))

		Object.entries(functionCategories).forEach(([key, category]) => {
			console.log(chalk.bold(category.name))
			console.log() // Add space after category header
			category.functions.forEach((func) => {
				console.log(
					chalk.gray(`    js-common ${key} ${func.name}`) + chalk.dim(` - ${func.description}`)
				)
			})
			console.log() // Add space after function list
		})

		console.log(
			chalk.yellow('💡 Use ') +
				chalk.green('js-common add') +
				chalk.yellow(' to integrate functions into your project')
		)
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
	})

// Also add as an option for compatibility
program.option('-l, --list', 'List all available functions')

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
			// Main interactive loop
			while (true) {
				const { category } = await inquirer.prompt([
					{
						type: 'list',
						name: 'category',
						message: chalk.cyan('What would you like to do?'),
						choices: Object.entries(functionCategories)
							.reduce((acc, [key, cat], index) => {
								acc.push({ name: cat.name, value: key })
								// Add separator after each item except the last one
								if (index < Object.entries(functionCategories).length - 1) {
									acc.push(new inquirer.Separator(' '))
								}
								return acc
							}, [] as any[])
							.concat([new inquirer.Separator(' '), { name: chalk.red('❌ Exit'), value: 'exit' }]),
						pageSize: 17, // Show more items to accommodate separators and exit option
						loop: false, // Don't loop at the end
					},
				])

				// Handle exit selection
				if (category === 'exit') {
					console.log(chalk.yellow('\n👋 Goodbye!\n'))
					return
				}

				const selectedCategory = functionCategories[category as keyof typeof functionCategories]

				// Function selection loop
				while (true) {
					const { functionName } = await inquirer.prompt([
						{
							type: 'list',
							name: 'functionName',
							message: chalk.cyan(`Choose a ${selectedCategory.name} function:`),
							choices: selectedCategory.functions
								.reduce((acc, func, index) => {
									acc.push({ name: `${func.name} - ${func.description}`, value: func.name })
									// Add separator after each item except the last one
									if (index < selectedCategory.functions.length - 1) {
										acc.push(new inquirer.Separator(' '))
									}
									return acc
								}, [] as any[])
								.concat([
									new inquirer.Separator(' '),
									{ name: chalk.gray('⬅️  Back to categories'), value: 'back' },
									{ name: chalk.red('❌ Exit'), value: 'exit' },
								]),
							pageSize: 12, // Show more items to accommodate back/exit options
							loop: false, // Don't loop at the end
						},
					])

					// Handle navigation options
					if (functionName === 'exit') {
						console.log(chalk.yellow('\n👋 Goodbye!\n'))
						return
					}

					if (functionName === 'back') {
						break // Break out of function selection loop, go back to categories
					}

					// Show the command
					console.log(chalk.green(`\n🚀 You can run this command:`))
					console.log(chalk.yellow(`js-common ${category} ${functionName} [arguments]`))
					console.log(
						chalk.gray(`\nFor detailed usage, run: js-common ${category} ${functionName} --help\n`)
					)
					return // Exit after showing the command
				}
			}
		} catch (error) {
			if (error && typeof error === 'object' && 'isTtyError' in error) {
				console.log(chalk.red('\n❌ Interactive mode requires a TTY terminal'))
			} else {
				console.log(chalk.red('\n❌ Something went wrong in interactive mode'))
			}
			process.exit(1)
		}
	})

// Add command - help developers integrate functions into their projects
program
	.command('add')
	.alias('a')
	.description('🔧 Add utility functions to your project')
	.action(async () => {
		// Welcome message
		console.log(gradient.pastel('\n🔧 Function Integration Helper\n'))

		try {
			const { category } = await inquirer.prompt([
				{
					type: 'list',
					name: 'category',
					message: chalk.cyan('Which category of utilities do you need?'),
					choices: Object.entries(functionCategories)
						.reduce((acc, [key, cat], index) => {
							acc.push({ name: cat.name, value: key })
							// Add separator after each item except the last one
							if (index < Object.entries(functionCategories).length - 1) {
								acc.push(new inquirer.Separator(' '))
							}
							return acc
						}, [] as any[])
						.concat([new inquirer.Separator(' '), { name: chalk.red('❌ Exit'), value: 'exit' }]),
					pageSize: 17, // Show more items to accommodate separators and exit option
					loop: false, // Don't loop at the end
				},
			])

			// Handle exit selection
			if (category === 'exit') {
				console.log(chalk.yellow('\n👋 Goodbye!\n'))
				return
			}

			const selectedCategory = functionCategories[category as keyof typeof functionCategories]
			const { functions } = await inquirer.prompt([
				{
					type: 'checkbox',
					name: 'functions',
					message: chalk.cyan(`Select ${selectedCategory.name} functions to add:`),
					choices: selectedCategory.functions.map((func) => ({
						name: `${func.name} - ${func.description}`,
						value: func.name,
						checked: false,
					})),
					pageSize: 10, // Show more items at once
					loop: false, // Don't loop at the end
				},
			])

			if (functions.length === 0) {
				console.log(chalk.yellow('\n📝 No functions selected. Exiting...\n'))
				return
			}

			console.log(chalk.green('\n📦 Import Statement:'))
			console.log(
				chalk.white(`import { ${functions.join(', ')} } from '@rtorcato/js-common/${category}'`)
			)

			console.log(chalk.green('\n📝 Usage Examples:'))
			functions.forEach((func: string) => {
				const funcInfo = selectedCategory.functions.find((f) => f.name === func)
				if (funcInfo) {
					console.log(chalk.gray(`\n// ${funcInfo.description}`))
					generateUsageExample(category, func)
				}
			})

			console.log(chalk.green('\n📚 Documentation:'))
			console.log(chalk.blue(`https://github.com/rtorcato/js-common#${category}-utilities`))

			console.log(
				chalk.yellow('\n💡 Tip: Run ') +
					chalk.green(`js-common ${category} ${functions[0]} --help`) +
					chalk.yellow(' for detailed CLI usage\n')
			)
		} catch (error) {
			if (error && typeof error === 'object' && 'isTtyError' in error) {
				console.log(chalk.red('\n❌ Interactive mode requires a TTY terminal'))
			} else {
				console.log(chalk.red('\n❌ Something went wrong'))
			}
			process.exit(1)
		}
	})

// Helper function to generate usage examples
function generateUsageExample(category: string, functionName: string) {
	const examples: Record<string, Record<string, string>> = {
		date: {
			today: `const today = today(); // "${new Date().toISOString().split('T')[0]}"`,
			now: `const timestamp = now(); // ${Date.now()}`,
			between: `const days = daysBetween('2023-01-01', '2023-12-31'); // 364`,
		},
		math: {
			sum: `const total = sum([1, 2, 3, 4, 5]); // 15`,
			avg: `const average = avg([10, 20, 30]); // 20`,
			random: `const num = randomBetween(1, 100); // 42`,
			round: `const rounded = roundTo(3.14159, 2); // 3.14`,
			clamp: `const clamped = clamp(150, 0, 100); // 100`,
		},
		text: {
			capitalize: `const text = capitalize('hello world'); // "Hello world"`,
			title: `const title = toTitleCase('hello world'); // "Hello World"`,
			pad: `const padded = padWithZeros(42, 5); // "00042"`,
		},
		file: {
			exists: `const exists = await fileExists('package.json'); // true`,
			ext: `const extension = getFileExtension('file.txt'); // "txt"`,
		},
		security: {
			password: `const isStrong = checkPasswordStrength('MyPass123!'); // true`,
			token: `const token = generateSecureToken(32); // "abc123..."`,
		},
		validate: {
			url: `const isValid = isValidUrl('https://example.com'); // true`,
		},
		system: {
			pid: `const processId = getProcessId(); // 12345`,
			uptime: `const uptime = getProcessUptime(); // 123.45`,
			ci: `const isCI = isCiEnvironment(); // false`,
			'node-version': `const version = getNodeVersion(); // "18.17.0"`,
		},
	}

	const example = examples[category]?.[functionName]
	if (example) {
		console.log(chalk.white(example))
	}
}

// Date commands
const dateCmd = program.command('date').description('📅 Date and time utilities')

dateCmd
	.command('today')
	.description("Get today's date (YYYY-MM-DD)")
	.action(() => {
		console.log(new Date().toISOString().split('T')[0])
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
		const d1 = new Date(date1)
		const d2 = new Date(date2)
		const timeDiff = Math.abs(d2.getTime() - d1.getTime())
		const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
		console.log(`${daysDiff} days`)
	})

// Math commands
const mathCmd = program.command('math').description('🔢 Mathematical utilities')

mathCmd
	.command('sum')
	.description('Calculate sum of numbers')
	.argument('<numbers...>', 'Numbers to sum')
	.action((numbers: string[]) => {
		const nums = numbers.map(Number).filter((n) => !isNaN(n))
		console.log(nums.reduce((a, b) => a + b, 0))
	})

mathCmd
	.command('avg')
	.description('Calculate average of numbers')
	.argument('<numbers...>', 'Numbers to average')
	.action((numbers: string[]) => {
		const nums = numbers.map(Number).filter((n) => !isNaN(n))
		console.log(nums.reduce((a, b) => a + b, 0) / nums.length)
	})

mathCmd
	.command('random')
	.description('Generate random number')
	.argument('<min>', 'Minimum value')
	.argument('<max>', 'Maximum value')
	.action((min: string, max: string) => {
		const minNum = Number(min)
		const maxNum = Number(max)
		console.log(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum)
	})

mathCmd
	.command('round')
	.description('Round to decimal places')
	.argument('<number>', 'Number to round')
	.argument('<decimals>', 'Decimal places')
	.action((number: string, decimals: string) => {
		const num = Number(number)
		const dec = Number(decimals)
		console.log(Number(num.toFixed(dec)))
	})

mathCmd
	.command('clamp')
	.description('Clamp between min/max')
	.argument('<number>', 'Number to clamp')
	.argument('<min>', 'Minimum value')
	.argument('<max>', 'Maximum value')
	.action((number: string, min: string, max: string) => {
		const num = Number(number)
		const minVal = Number(min)
		const maxVal = Number(max)
		console.log(Math.min(Math.max(num, minVal), maxVal))
	})

// Simple implementations for other commands
const textCmd = program.command('text').description('📝 Text formatting utilities')

textCmd
	.command('capitalize')
	.description('Capitalize first letter')
	.argument('<text>', 'Text to capitalize')
	.action((text: string) => {
		console.log(text.charAt(0).toUpperCase() + text.slice(1))
	})

textCmd
	.command('title')
	.description('Convert to title case')
	.argument('<text>', 'Text to convert')
	.action((text: string) => {
		console.log(
			text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())
		)
	})

// System commands
const systemCmd = program.command('system').description('💻 System information utilities')

systemCmd
	.command('pid')
	.description('Get process ID')
	.action(() => {
		console.log(process.pid)
	})

systemCmd
	.command('uptime')
	.description('Get process uptime')
	.action(() => {
		console.log(`${Math.floor(process.uptime())} seconds`)
	})

systemCmd
	.command('node-version')
	.description('Get Node.js version')
	.action(() => {
		console.log(process.version)
	})

// Handle --list option before parsing
if (process.argv.includes('--list') || process.argv.includes('-l')) {
	console.log(chalk.cyan('\n✨ Available Functions:\n'))

	Object.entries(functionCategories).forEach(([key, category]) => {
		console.log(chalk.bold(category.name))
		console.log() // Add space after category header
		category.functions.forEach((func) => {
			console.log(
				chalk.gray(`    js-common ${key} ${func.name}`) + chalk.dim(` - ${func.description}`)
			)
		})
		console.log() // Add space after function list
	})

	console.log(
		chalk.yellow('💡 Use ') +
			chalk.green('js-common add') +
			chalk.yellow(' to integrate functions into your project')
	)
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

// Parse command line arguments
program.parse()
