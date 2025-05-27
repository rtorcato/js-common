export function uploadFile(file: File) {
	const controller = new AbortController()

	// Provide the abort signal to this fetch request
	// so it can be aborted anytime be calling `controller.abort()`.
	const response = fetch('/upload', {
		method: 'POST',
		body: file,
		signal: controller.signal,
	})

	return { response, controller }
}
