import { expect, test } from '@playwright/test'

/**
 * Mobile drawer behavior — these tests pin the contract we hand-debugged:
 *  - Drawer opens on hamburger tap
 *  - Shows the full sidebar-style menu (Get started, CLI, Modules, etc.)
 *  - Closes when a link is tapped, and navigates to that link
 *  - Second open still shows all the links (regression for the
 *    "show-secondary translates primary off-screen" bug)
 *  - Works the same on landing AND on doc pages
 */

test.describe('mobile drawer', () => {
	test.skip(({ viewport }) => (viewport?.width ?? 0) > 996, 'mobile viewport only')

	const EXPECTED_LINKS = [
		'Get started',
		'Tree-shaking & imports',
		'Migrating to 2.x',
		'CLI',
		'Modules',
		'API reference',
		'Changelog',
		'GitHub',
	]

	test('opens with all links on landing page', async ({ page }) => {
		await page.goto('/js-common/')

		const drawer = page.locator('.navbar-sidebar')
		await expect(drawer).toBeHidden()

		await page.getByRole('button', { name: /toggle navigation/i }).click()
		await expect(drawer).toBeVisible()

		const menu = page.locator('.jc-mobile-menu')
		await expect(menu).toBeVisible()
		for (const label of EXPECTED_LINKS) {
			await expect(menu.getByRole('link', { name: label })).toBeVisible()
		}
	})

	test('link tap navigates and closes drawer', async ({ page }) => {
		await page.goto('/js-common/')

		await page.getByRole('button', { name: /toggle navigation/i }).click()
		const drawer = page.locator('.navbar-sidebar')
		await expect(drawer).toBeVisible()

		await page.locator('.jc-mobile-menu').getByRole('link', { name: 'Modules' }).click()

		await expect(page).toHaveURL(/\/docs\/modules\/overview\/?$/)
		await expect(drawer).toBeHidden()
	})

	test('second open still shows all links (no secondary-translate regression)', async ({
		page,
	}) => {
		// Start on a doc page — this is where Docusaurus' MobileSecondaryMenuFiller
		// used to flip the drawer into secondary mode and translate primary off-screen.
		await page.goto('/js-common/docs')

		const toggle = page.getByRole('button', { name: /toggle navigation/i })
		const drawer = page.locator('.navbar-sidebar')
		const menu = page.locator('.jc-mobile-menu')

		// First open
		await toggle.click()
		await expect(menu).toBeVisible()
		await expect(menu.getByRole('link', { name: 'Get started' })).toBeVisible()

		// Close
		await page.getByRole('button', { name: /close navigation bar/i }).click()
		await expect(drawer).toBeHidden()

		// Second open — used to be empty
		await toggle.click()
		await expect(menu).toBeVisible()
		await expect(menu.getByRole('link', { name: 'Get started' })).toBeVisible()
		await expect(menu.getByRole('link', { name: 'Changelog' })).toBeVisible()
	})

	test('no "Back to main menu" button (secondary stub returns null)', async ({ page }) => {
		await page.goto('/js-common/docs')
		await page.getByRole('button', { name: /toggle navigation/i }).click()
		await expect(page.locator('.navbar-sidebar__back')).toBeHidden()
	})

	test('non-active (white) link is clickable when another item is active', async ({ page }) => {
		// Reproduces: user lands on /docs/guides/tree-shaking → that item is gold/active
		// → tapping a different white link (CLI) was reported as not working.
		await page.goto('/js-common/docs/guides/tree-shaking')

		const menu = page.locator('.jc-mobile-menu')

		await page.getByRole('button', { name: /toggle navigation/i }).click()
		await expect(menu).toBeVisible()

		// Sanity: Tree-shaking is the active one.
		const active = menu.locator('.jc-mobile-menu__link--active')
		await expect(active).toHaveText(/tree-shaking/i)

		// Tap a different white link.
		await menu.getByRole('link', { name: 'CLI' }).click()

		await expect(page).toHaveURL(/\/docs\/guides\/cli\/?$/)
		await expect(page.locator('.navbar-sidebar')).toBeHidden()
	})
})
