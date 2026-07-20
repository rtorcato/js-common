import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for the js-common docs site.
 *
 * - Boots the production build via `pnpm serve` (port 3000). The dev server
 *   works too, but the built site is closer to what users hit in CI/GitHub
 *   Pages and avoids HMR-related flake.
 * - Two projects: mobile (iPhone 14) and desktop (1280x720). Most of the bugs
 *   we keep finding live in the mobile drawer, so mobile is the primary
 *   target.
 * - Tests are behavioral only — no screenshot assertions yet. Add visual
 *   regression later under a separate project pinned to a Docker browser.
 */

const PORT = 3000
const BASE_URL = `http://localhost:${PORT}/js-common/`

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
	use: {
		baseURL: BASE_URL,
		colorScheme: 'dark',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'mobile',
			// Pixel 7 → chromium-based, so we stay in one engine for both projects.
			// iPhone profiles use WebKit which doubles install/CI time for little gain.
			use: { ...devices['Pixel 7'] },
		},
		{
			name: 'desktop',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 } },
		},
	],
	webServer: {
		// `serve` requires a prior `build`. The script chains them so a single
		// `pnpm test:e2e` works from a clean checkout.
		command: `pnpm run build && pnpm run serve --port ${PORT}`,
		url: BASE_URL,
		reuseExistingServer: !process.env.CI,
		timeout: 180_000,
		stdout: 'ignore',
		stderr: 'pipe',
	},
})
