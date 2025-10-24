import { buildCode, getEntryPoints, getEntrypointFolders } from '@rtorcato/js-tooling/esbuild'

const folders = await getEntrypointFolders('src')
const libEntryPointsArrays = await Promise.all(folders.map((folder) => getEntryPoints(folder)))
const allEntryPoints = ['src/index.ts', 'src/cli/index.ts', ...libEntryPointsArrays.flat()]
buildCode(allEntryPoints).catch((e) => {
	console.error(e)
	process.exit(1)
})
