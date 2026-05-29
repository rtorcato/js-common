# js-common docs

[Astro Starlight](https://starlight.astro.build/) documentation site for [`@rtorcato/js-common`](https://www.npmjs.com/package/@rtorcato/js-common).

Live site: <https://rtorcato.github.io/js-common/>

## Local development

From the repo root:

```bash
pnpm install
pnpm --filter @rtorcato/js-common-docs dev
```

The dev server runs at <http://localhost:4321/js-common>.

## Build

```bash
pnpm --filter @rtorcato/js-common-docs build
# output: apps/doc/dist
```

## Deployment

`.github/workflows/docs.yml` builds and publishes this site to GitHub Pages on every push to `main` that changes `apps/doc/**`. The first deploy requires enabling **Settings → Pages → Build and deployment → Source: GitHub Actions** on the repository.

## Structure

```
src/
├── assets/                  # images used in MDX (banner, etc.)
├── content/
│   └── docs/
│       ├── index.mdx        # landing page (splash)
│       ├── guides/          # installation, quick start, CLI
│       └── modules/         # per-module reference pages
└── content.config.ts        # Starlight content collection config
```

Add new module pages under `src/content/docs/modules/` — they appear in the sidebar automatically via Starlight's `autogenerate` config in `astro.config.mjs`.
