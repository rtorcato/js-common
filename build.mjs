import { buildCode, getEntryPoints, getEntrypointFolders } from '@rtorcato/js-tooling/esbuild'

const folders = await getEntrypointFolders('src')
// Exclude CLI from library build - it's built separately
const libFolders = folders.filter((folder) => !folder.includes('/cli'))
const libEntryPointsArrays = await Promise.all(libFolders.map((folder) => getEntryPoints(folder)))
const allEntryPoints = ['src/index.ts', ...libEntryPointsArrays.flat()]
buildCode(allEntryPoints).catch((e) => {
	console.error(e)
	process.exit(1)
})
