import fs from 'node:fs/promises'
import path from 'node:path'
import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

const isProduction = process.env.NODE_ENV === 'production'

async function build() {
	console.log(`Building...${isProduction ? '(production)' : '(development)'}`)
	const folders = await getEntrypointFolders('src')
	const libEntryPointsArrays = await Promise.all(folders.map((folder) => getEntryPoints(folder)))
	const libEntryPoints = libEntryPointsArrays.flat()
	const allEntryPoints = [
		'src/index.ts', // Main entry point
		...libEntryPoints,
		// ...exampleEntryPoints,
	]
	console.log('All entry points:', allEntryPoints)
	const buildPrefs = {
		entryPoints: allEntryPoints, // Array of entry points to build
		outdir: 'dist', // Output directory
		platform: 'node', // Use 'browser' for browser builds
		sourcemap: !isProduction, // Generate sourcemaps in development mode
		minify: isProduction, // Minify in production mode
		splitting: true, // Enable code splitting
		format: 'esm', // Use 'cjs' for CommonJS format
		target: ['esnext'], // Specify ECMAScript target version
		bundle: true, // Bundle all dependencies into the output
		chunkNames: 'chunks/[name]-[hash]', // Define chunk naming pattern
		// external: ['react', 'react-dom'], // Add other external dependencies here
		// plugins: [
		//   {
		//     name: 'make-all-packages-external',
		//     setup(build) {
		//       let filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/; // Must not start with "/" or "./" or "../"
		//       build.onResolve({ filter }, args => ({ path: args.path, external: true }));
		//     },
		//   },
		// ],
		plugins: [nodeExternalsPlugin()],
	}
	await esbuild.build(buildPrefs)
}

/**
 * Returns a list of all subdirectories in the given directory that contain an index.ts file.
 * @param {string} dir - The directory to search (e.g., 'src')
 * @returns {Promise<string[]>} - Array of entrypoint folder paths (e.g., ['src/arrays', 'src/strings'])
 */
export async function getEntrypointFolders(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true })
	const folders = entries.filter((e) => e.isDirectory())
	const entryFolders = []
	for (const folder of folders) {
		const indexPath = path.join(dir, folder.name, 'index.ts')
		try {
			await fs.access(indexPath)
			entryFolders.push(path.join(dir, folder.name))
		} catch {
			// index.ts does not exist, skip
		}
	}
	return entryFolders
}

/**
 * Returns a list of entry point files in a directory.
 *
 * Scans the given directory and returns all files that:
 *   - End with the specified file extension (default: ".ts")
 *   - Are not test files (by default, excludes files containing ".test.")
 *
 * @param {string} dir - The directory to search (e.g., 'src')
 * @param {string} [fileExtension='.ts'] - The file extension to match (e.g., '.ts', '.tsx')
 * @param {boolean} [excludeTestFiles=true] - Whether to exclude test files (files containing '.test.')
 * @returns {Promise<string[]>} - Array of entry point file paths (e.g., ['src/arrays/index.ts', ...])
 */
export async function getEntryPoints(dir, fileExtension = '.ts', excludeTestFiles = true) {
	try {
		const entries = await fs.readdir(dir, { withFileTypes: true })
		return entries
			.filter(
				(entry) =>
					entry.isFile() &&
					entry.name.endsWith(fileExtension) &&
					(!excludeTestFiles || !entry.name.includes('.test.'))
			)
			.map((entry) => path.join(dir, entry.name))
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.warn(`Directory ${dir} does not exist.`)
			return []
		}
		throw error
	}
}
// Run the build function
build().catch((e) => {
	console.error(e)
	process.exit(1)
})
