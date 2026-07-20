---
title: Tree-shaking & imports
description: How to import @rtorcato/js-common so your bundler only ships the bytes you use.
sidebar_position: 5
---

`@rtorcato/js-common` is built to vanish from your bundle when you don't use it.
Every module ships as its own subpath, the root entry point is **empty by
design**, and the package is marked `"sideEffects": false`. Any modern bundler
(esbuild, Rollup, Vite, Webpack 5+, Next.js, Astro, SvelteKit) will tree-shake
unused exports automatically — but only if you import from the right place.

## Always import from a subpath

✅ **Good — subpath import:**

```ts
import { slugify } from '@rtorcato/js-common/strings'
import { formatDate } from '@rtorcato/js-common/date'
import { chunk } from '@rtorcato/js-common/arrays'
```

❌ **Won't work — root import:**

```ts
// dist/index.js is intentionally empty. This import resolves to nothing.
import { slugify } from '@rtorcato/js-common'
```

The root entry point is empty on purpose. There is no barrel re-export at the
top level, because barrel files defeat tree-shaking in some bundler
configurations and force every consumer to pull in metadata for every module.
Subpaths give the bundler one clear answer: "load this file, nothing else."

## What "subpath" means

The list of subpaths is defined in `package.json#exports`. Each one points at a
single module's `dist/<name>/index.js`. For example:

```jsonc
{
  "exports": {
    "./strings": {
      "import": "./dist/strings/index.js",
      "types": "./dist/strings/index.d.ts"
    },
    "./date": {
      "import": "./dist/date/index.js",
      "types": "./dist/date/index.d.ts"
    }
  }
}
```

If your editor autocompletes `@rtorcato/js-common/...`, it will list every
available subpath. The full list is also browsable in the
[Modules](/docs/modules/overview) section of this site.

## Bundle size in practice

Every module's compiled JavaScript is in the 130 B – 2.5 KB range
(uncompressed). Real numbers from the published 2.x build:

| Module | Compiled size |
| --- | ---: |
| `try` | 129 B |
| `math` | 150 B |
| `json` | 360 B |
| `arrays` | 697 B |
| `numbers` | 785 B |
| `colors` | 1.1 KB |
| `datetime` | 1.5 KB |
| `currency` | 2.3 KB |
| `strings` | 2.5 KB |

Gzipped these are roughly a third of that. After tree-shaking, your bundle only
ships the functions you actually reference — so importing one helper from
`strings` does **not** pay the full 2.5 KB cost.

## Verifying it tree-shook

Check with your bundler's analyzer:

- **Vite / Rollup**: `vite build --mode production` then open `stats.html` via
  `rollup-plugin-visualizer`.
- **webpack**: `webpack-bundle-analyzer`.
- **esbuild**: `--analyze` flag prints a tree of bytes per module.
- **Next.js**: `ANALYZE=true next build` with `@next/bundle-analyzer`.

If you see `@rtorcato/js-common` appearing larger than the single subpath you
imported, double-check that:

1. You imported from a subpath, not the root.
2. The bundler is in production mode (dev mode often skips tree-shaking).
3. You are not re-exporting everything from a local barrel file in your own
   codebase — barrels in your code can also defeat tree-shaking even when the
   library itself is shake-friendly.

## Types-only subpath

`@rtorcato/js-common/types` is a special subpath that ships only `.d.ts`
declarations — no runtime code. Use it to share type definitions across files
without paying any bundle cost.

```ts
import type { JsonValue, UnknownRecord } from '@rtorcato/js-common/types'
```

Because there is no `import` field on the `./types` export, runtime imports
from this subpath will fail at resolve time — which is the intended behavior.
