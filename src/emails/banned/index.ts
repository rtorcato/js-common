/**
 * Checks if the domain part of the given email is present in a list of forbidden domains.
 *
 * @param email - The email address to check.
 * @param forbiddenEmails - A newline-separated string of forbidden email domains.
 * @throws Will throw an error if the email is not formatted properly or if the domain is forbidden.
 */
export const isEmailinBannedDomains = (email: string, forbiddenEmails: string) => {
	// const forbiddenEmailList = await forbiddenEmailResponse.text();
	const forbiddenEmailList = forbiddenEmails.split('\n')
	const domainPart = email.split('@')[1]
	const isForbidden = forbiddenEmailList.some((e) => {
		if (!e.length || !domainPart) {
			throw Error('Email not formatted properly')
		}
		return e.trim().toLowerCase() === domainPart.trim().toLowerCase()
	})
	if (isForbidden) throw Error('Not allowed!')
}
