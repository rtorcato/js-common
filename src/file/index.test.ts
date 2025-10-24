import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	deleteFile,
	fileExists,
	getFileExtension,
	readFileAsString,
	writeFileAsString,
} from './index'

describe('file module', () => {
	const tmpFile = path.join(__dirname, 'testfile.txt')

	afterEach(async () => {
		try {
			await fs.unlink(tmpFile)
		} catch {}
	})

	it('writeFileAsString and readFileAsString work', async () => {
		await writeFileAsString(tmpFile, 'hello world')
		const content = await readFileAsString(tmpFile)
		expect(content).toBe('hello world')
	})

	it('fileExists returns true if file exists, false otherwise', async () => {
		await writeFileAsString(tmpFile, 'exists')
		expect(await fileExists(tmpFile)).toBe(true)
		await fs.unlink(tmpFile)
		expect(await fileExists(tmpFile)).toBe(false)
	})

	it('deleteFile deletes a file', async () => {
		await writeFileAsString(tmpFile, 'bye')
		await deleteFile(tmpFile)
		expect(await fileExists(tmpFile)).toBe(false)
	})

	it('getFileExtension returns the file extension', () => {
		expect(getFileExtension('foo.txt')).toBe('.txt')
		expect(getFileExtension('/path/to/file.js')).toBe('.js')
		expect(getFileExtension('noext')).toBe('')
	})
})
