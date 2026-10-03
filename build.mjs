import { rmSync } from 'node:fs'

// `--prod` replaces `cross-env NODE_ENV=production`; set before importing the
// tooling so it sees the mode whether it reads NODE_ENV at load or call time.
process.env.NODE_ENV = process.argv.includes('--prod') ? 'production' : 'development'

// Replaces `rimraf` — clean outputs, including the tsbuildinfo (see #53).
for (const p of ['dist', 'tsconfig.build.tsbuildinfo']) rmSync(p, { recursive: true, force: true })

const { buildCode, getEntryPoints, getEntrypointFolders } = await import(
	'@rtorcato/repo-tooling/esbuild'
)

const folders = await getEntrypointFolders('src')
// Exclude CLI from library build - it's built separately
const libFolders = folders.filter((folder) => !folder.includes('/cli'))
const libEntryPointsArrays = await Promise.all(libFolders.map((folder) => getEntryPoints(folder)))
const allEntryPoints = libEntryPointsArrays.flat()
buildCode(allEntryPoints).catch((e) => {
	console.error(e)
	process.exit(1)
})
