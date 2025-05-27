/* eslint-disable no-console */
export const testPackage = () => {
	console.log('test')
	return 'testPackage'
}

export const helloWorld = (val: string | undefined) => {
	console.log(`hello ${val ?? 'world'}`)
}
