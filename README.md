# js-common

![js-common banner](./banner.png)

[![npm version](https://badge.fury.io/js/%40rtorcato%2Fjs-common.svg)](https://badge.fury.io/js/%40rtorcato%2Fjs-common)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)
[![codecov](https://codecov.io/gh/rtorcato/js-common/branch/main/graph/badge.svg)](https://codecov.io/gh/rtorcato/js-common)
[![Docs](https://img.shields.io/badge/docs-rtorcato.github.io%2Fjs--common-blue.svg)](https://rtorcato.github.io/js-common/)

A comprehensive set of common JavaScript and TypeScript utilities for Node.js projects.

📘 **Documentation:** <https://rtorcato.github.io/js-common/>

## Features

- **Tree-shakeable** — import only what you need via subpath exports
- **TypeScript** — full type definitions, JSDoc on every public API
- **CLI included** — optional binary for use in scripts and terminals
- **Modular** — one module per concern, 46 subpaths
- **Minimal runtime deps** — only `date-fns`, `date-fns-tz`, `luxon`, `pino`, `uuid`, `short-uuid`, `zod`. CLI packages (`chalk`, `commander`, `figlet`, …) are `optionalDependencies` and only needed for the CLI.

## Installation

```bash
npm install @rtorcato/js-common
```

## CLI Usage

This package includes a command-line interface for many utilities:

```bash
# Install globally to use the CLI
npm install -g @rtorcato/js-common

# Or use with npx
npx @rtorcato/js-common@latest --help

# Examples
npx @rtorcato/js-common@latest date today
npx @rtorcato/js-common@latest math sum 1 2 3 4 5
npx @rtorcato/js-common@latest text capitalize "hello world"
npx @rtorcato/js-common@latest system node-version
```

See [CLI.md](./CLI.md) for complete CLI documentation.

## Library Usage

```typescript
// Import specific modules (recommended for tree-shaking)
import { formatDate, today, daysBetween } from '@rtorcato/js-common/date'
import { validateEmail, isValidEmail } from '@rtorcato/js-common/emails'
import { generateUUID, isValidUUID } from '@rtorcato/js-common/uuid'
import { sum, average, roundTo } from '@rtorcato/js-common/numbers'
import { capitalize, toTitleCase } from '@rtorcato/js-common/formatting'

// Example usage
console.log(today()) // "2026-05-29"
console.log(sum([1, 2, 3, 4, 5])) // 15
console.log(capitalize('hello world')) // "Hello world"
console.log(generateUUID()) // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

### Bundle Size Impact

Each module is shipped as its own subpath export so bundlers only include what you import. Individual modules range from ~100 bytes (e.g. `sleep`) to ~2 KB (e.g. `currency`) when minified. Measure against your own bundle with [bundlejs.com](https://bundlejs.com/?q=@rtorcato/js-common/numbers).

## Available Modules

### Date & Time
```typescript
import { today, formatDate, daysBetween, isLeapYear } from '@rtorcato/js-common/date'
import { nowIso, formatDateTimeLocal, unixTimestamp } from '@rtorcato/js-common/datetime'
import { nowTime, parseTime, secondsBetween } from '@rtorcato/js-common/time'
import { runInterval, clearIntervalById } from '@rtorcato/js-common/interval'
```

### Numbers & Math
```typescript
import { sum, average, roundTo, clamp, getRandomInt } from '@rtorcato/js-common/numbers'
import { add, subtract, multiply, divide } from '@rtorcato/js-common/math'
import { randomInt, randomFloat, randomBool, randomElement } from '@rtorcato/js-common/random'
```

### Text & Strings
```typescript
import { capitalize, toTitleCase, padZero } from '@rtorcato/js-common/formatting'
import { slugify, truncate, removeEmojis } from '@rtorcato/js-common/strings'
import { escapeHtml, unescapeHtml, stripHtmlTags } from '@rtorcato/js-common/html'
import { escapeRegExp, matchAll, replaceAllRegex } from '@rtorcato/js-common/regex'
import { detectLanguage, formatNumber, t, pluralize } from '@rtorcato/js-common/i18n'
```

### Security & Validation
```typescript
import { isStrongPassword, generateSecureToken } from '@rtorcato/js-common/security'
import { isValidEmail, validateEmail } from '@rtorcato/js-common/emails'
import { isValidUrl } from '@rtorcato/js-common/url'
import { isString, isNumber, isArray, isObject } from '@rtorcato/js-common/validation'
import { toBoolean, isBoolean, xor } from '@rtorcato/js-common/boolean'
```

### Data Structures
```typescript
import { flatten, unique, chunk, groupBy } from '@rtorcato/js-common/arrays'
import { deepMerge, pick, omit, deepClone } from '@rtorcato/js-common/objects'
import { safeJsonParse, safeJsonStringify } from '@rtorcato/js-common/json'
import { invertMap, mapValues, objectToMap, mapToObject } from '@rtorcato/js-common/maps'
import { union, intersection, difference, isSubset } from '@rtorcato/js-common/sets'
```

### Async & Control Flow
```typescript
import { delay, timeout, retry } from '@rtorcato/js-common/promises'
import { debounce, throttle, once } from '@rtorcato/js-common/functions'
import { sleep } from '@rtorcato/js-common/sleep'
import { tryCatch } from '@rtorcato/js-common/try'
import { createAbortController, withAbort, abortAfter } from '@rtorcato/js-common/abortController'
import { createCustomError, getErrorMessage, assert } from '@rtorcato/js-common/errors'
```

### System & Process
```typescript
import { getENV, isDev, isProd, getNodeEnv, checkEnv } from '@rtorcato/js-common/env'
import { getOsPlatform, getOsArch, getHomeDir } from '@rtorcato/js-common/os'
import { getNodeMajorVersion, isNode, requireOptional } from '@rtorcato/js-common/node'
import { getProcessId, getCwd, exitProcess, isCI } from '@rtorcato/js-common/process'
import { isMacOs, isWindows, isLinux, getPlatform } from '@rtorcato/js-common/system'
import { disableConsole, clearConsole } from '@rtorcato/js-common/console'
```

### Logging
```typescript
import { logger } from '@rtorcato/js-common/logger'                   // pino-based
import { info, warn, error, captureConsole } from '@rtorcato/js-common/logging'
```

### Other
- `colors` — color manipulation and conversion
- `crypto` — cryptographic helpers
- `currency` — currency formatting and conversion
- `events` — event emitter utilities
- `fetch` — HTTP request helpers
- `file` — file system helpers
- `geometry` — 2D geometry calculations
- `mime-types` — MIME-type lookup
- `uuid` — UUID generation and validation
- `types` — shared TypeScript type definitions (types-only export)

## Requirements

- **Node.js** >= 22.0.0 (enforced via the `engines` field)
- **TypeScript** >= 5.0.0 (for TypeScript projects)

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build the project
pnpm run build-prod

# Build development version
pnpm run build-dev

# Lint and format
pnpm run check:fix

# Type checking
pnpm run typecheck

# Run micro-benchmarks (scripts/benchmark.mjs)
pnpm run benchmark
```

## Documentation site

The full documentation site lives in [`apps/doc`](./apps/doc) and is built with [Astro Starlight](https://starlight.astro.build/). It auto-deploys to GitHub Pages on every push to `main` that touches `apps/doc/**`.

```bash
# Run the docs locally (http://localhost:4321/js-common)
pnpm --filter @rtorcato/js-common-docs dev

# Build the static site
pnpm --filter @rtorcato/js-common-docs build
```

Live site: <https://rtorcato.github.io/js-common/>

## Contributing

Contributions are welcome! Please read [CONTRIBUTORS.md](./CONTRIBUTORS.md) for guidelines.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with tests
4. Run the test suite: `pnpm test`
5. Submit a pull request

## License

MIT © [Richard Torcato](https://github.com/rtorcato)


