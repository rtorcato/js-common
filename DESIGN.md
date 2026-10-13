# Design

js-common's docs site is a Docusaurus v3 app in `apps/docs`, part of the
docs.torcato.dev family. Shared tokens live in `apps/docs/src/css/_jt-tokens.css`.
This file covers the parts that are specific to js-common.

## Home hero

Signed off by rtorcato on 2026-10-13. The mockup is private and lives outside
this repo.

The hero is live HTML. It replaces the baked `img/banner.png` and
`img/hero-brand.png`, which put the title, tagline and five feature tiles inside
an image. The new layout matches browser-common and brand-kit.

From top to bottom, centred:

1. **Mark.** A 64px gold tile (`#f4ba2f`) with a dark `JS` (`#0a0e16`), radius 16px.
   It's 52px on phones.
2. **H1 wordmark.** `js-common`, with `common` in the accent colour. Geist 800,
   `clamp(44px, 8vw, 84px)`, letter-spacing −0.045em.
3. **Tagline.** "Tree-shakeable TypeScript utilities: tiny bundles, full type
   safety, CLI included." 20px/500, or 17px on phones. Use the same line as the
   site description and OG text.
4. **Sub-line.** "42 modules. One subpath each. Import only what you use." 16px, muted.
5. **Code card.** Max width 640px, radius 14px, with module tabs
   (`date` / `arrays` / `strings` / `uuid`) that switch a short import + call example.
   The tabs scroll sideways. Long code wraps or scrolls inside the card and never widens the page.
6. **CTAs.** `Get started →` (primary: gold background, dark text, about 11:1) and
   `Browse modules` (ghost). Both are 48px tall. On phones they stack full width.
7. **Install tabs.** The existing `InstallTabs` component, max width 460px.

Below the hero sit the four existing HTML feature cards (Ultra-lightweight,
Tree-shakeable, TypeScript-first, CLI included), now the only feature set:
four columns, two below 996px and one below 560px. Everything after them stays as it is.

### Navbar

Add `npm ↗` (`https://www.npmjs.com/package/@rtorcato/js-common`) next to
GitHub, as browser-common and brand-kit already do.

### Fixes that ship with the hero

- **Mobile overflow.** At 390px the home page renders 700px wide, because the
  "Use with AI" command rows don't shrink. Give them `min-width: 0` and
  `overflow-x: auto` so they scroll inside their box. The intro doc page
  (484px) has the same bug. Done means no horizontal page scroll at 390px.
- **Badge row on the intro doc.** The bundlephobia badge shows "rate limited", and
  the row wraps onto four lines on phones. Keep only npm + license, or drop the row.
- **The 3D illustration** (mug, plant, JS cube) leaves the docs site. It can stay
  in the README banner.

### Tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| Gold | `#f4ba2f` | `#f4ba2f` | Buttons, mark, active tab underline |
| Accent text | `#9a6f00` (5:1 on white) | `#f4ba2f` | `common`, active tab label, links |
| On-gold | `#0a0e16` | `#0a0e16` | Text on gold |
| Code background | `#f3f6f9` | `#0c111b` | Code card |

Map these onto the existing `--ifm-*` / `--jt-*` variables. Don't add new ones.

### Accessibility

- Text contrast meets WCAG AA in both themes. Touch targets are 44px or more.
- Focus rings are visible on the CTAs, tabs and copy button.
- The code-card tabs use `role="tablist"` with arrow-key support.
- The mark is decorative (`aria-hidden`). The H1 carries the name.
