// Catalog of the functions the CLI advertises, used by `list`, `interactive`
// and `add`.
//
// Three names per entry, and they are deliberately different things:
//   - `name`       the CLI verb (`js-common math avg`) — part of the CLI surface
//   - `exportName` the real library export (`average`) — what `add` must print
//   - `subpath`    the published module the export lives in (`numbers`)
//
// `subpath` is per entry, not per category: the CLI groups by task ('math',
// 'system') while the library groups by module — 'math' spans `numbers` and
// `random`, 'system' spans `process` and `node`.
//
// `src/cli/catalog.test.ts` asserts both halves, so this cannot drift back into
// fiction: every `exportName` really is exported by `src/<subpath>/index.ts`,
// and every `name` really is a command registered in `src/cli/cli.ts`. The
// second check exists because it wasn't there — `file`, `security`, `validate`,
// `text pad` and `system ci` were advertised here for long enough that `list`
// printed commands that errored when run.
export const functionCategories = {
	date: {
		name: '📅 Date & Time',
		functions: [
			{
				name: 'today',
				description: "Get today's date (YYYY-MM-DD)",
				exportName: 'today',
				subpath: 'date',
				example: `const date = today() // '${new Date().toISOString().slice(0, 10)}'`,
			},
			{
				name: 'now',
				description: 'Get current timestamp',
				exportName: 'nowIso',
				subpath: 'datetime',
				example: `const timestamp = nowIso() // '${new Date().toISOString()}'`,
			},
			{
				name: 'between',
				description: 'Calculate days between dates',
				exportName: 'daysBetween',
				subpath: 'date',
				example: `const days = daysBetween('2023-01-01', '2023-12-31') // 364`,
			},
		],
	},
	math: {
		name: '🔢 Mathematical',
		functions: [
			{
				name: 'sum',
				description: 'Calculate sum of numbers',
				exportName: 'sum',
				subpath: 'numbers',
				example: `const total = sum([1, 2, 3, 4, 5]) // 15`,
			},
			{
				name: 'avg',
				description: 'Calculate average of numbers',
				exportName: 'average',
				subpath: 'numbers',
				example: `const mean = average([10, 20, 30]) // 20`,
			},
			{
				name: 'random',
				description: 'Generate random number',
				exportName: 'randomInt',
				subpath: 'random',
				example: `const num = randomInt(1, 100) // 42`,
			},
			{
				name: 'round',
				description: 'Round to decimal places',
				exportName: 'roundTo',
				subpath: 'numbers',
				example: `const rounded = roundTo(3.14159, 2) // 3.14`,
			},
			{
				name: 'clamp',
				description: 'Clamp between min/max',
				exportName: 'clamp',
				subpath: 'numbers',
				example: `const clamped = clamp(150, 0, 100) // 100`,
			},
		],
	},
	text: {
		name: '📝 Text Formatting',
		functions: [
			{
				name: 'capitalize',
				description: 'Capitalize first letter',
				exportName: 'capitalize',
				subpath: 'strings',
				example: `const text = capitalize('hello world') // 'Hello world'`,
			},
			{
				name: 'title',
				description: 'Convert to title case',
				exportName: 'titleCase',
				subpath: 'strings',
				example: `const heading = titleCase('hello world') // 'Hello World'`,
			},
		],
	},
	system: {
		name: '💻 System Info',
		functions: [
			{
				name: 'pid',
				description: 'Get process ID',
				exportName: 'getProcessId',
				subpath: 'process',
				example: `const processId = getProcessId() // 12345`,
			},
			{
				name: 'uptime',
				description: 'Get process uptime',
				exportName: 'getProcessUptime',
				subpath: 'process',
				example: `const uptime = getProcessUptime() // 123.45`,
			},
			{
				name: 'node-version',
				description: 'Get Node.js version',
				exportName: 'getNodeMajorVersion',
				subpath: 'node',
				example: `const major = getNodeMajorVersion() // 22`,
			},
		],
	},
}

export type CliFunction =
	(typeof functionCategories)[keyof typeof functionCategories]['functions'][number]
