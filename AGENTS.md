<!-- Generated from skills/js-common/SKILL.md by scripts/sync-agents.mjs — do not edit by hand; run `pnpm sync:agents`. -->

# Using @rtorcato/js-common

`@rtorcato/js-common` is a tree-shakeable, ESM-only utility library for Node.js >= 22 (TypeScript-first, JSDoc on every public API). One subpath export per concern — 44 of them. The package root is intentionally empty.

## Rules

1. **Import from the subpath, never the package root.** The root export has no runtime code at all, so a root import gets you nothing.

   ```ts
   // ✅ do
   import { slugify } from '@rtorcato/js-common/strings'
   // ❌ don't — the root export is empty by design
   import { slugify } from '@rtorcato/js-common'
   ```

2. **Every export name has exactly one home.** No name is exported from two modules, so the module → exports table below is the only lookup you need. These pairs still read alike — check which one you want:

   | Looks like | Actually |
   |---|---|
   | `functions.once` vs `events.onceEvent` | `once(fn)` memoises a call; `onceEvent(target, type)` awaits a DOM event |
   | `logger` vs `logging` | `logger` is one configured pino instance; `logging` is `console` helpers with no runtime deps |
   | `try.tryCatch` vs `errors.tryWithFallback` | Result object vs swallow-and-fall-back — see rule 3 |
   | `date.formatDate` vs `datetime.formatDateTimeLocal` | a UTC calendar day vs a local instant |

   Where two modules used to ship the same name, the loser was deleted rather than aliased — [MODULE-BOUNDARIES.md](https://github.com/rtorcato/js-common/blob/main/MODULE-BOUNDARIES.md) records which side won and why.

3. **Three different error idioms — don't mix them up.**

   ```ts
   // Result object — preferred for new code
   import { tryCatch } from '@rtorcato/js-common/try'
   const { data, error } = await tryCatch(() => fetchData())

   // Go-style tuple: [error, data] — error FIRST
   import { to } from '@rtorcato/js-common/promises'
   const [err, value] = await to(fetchData())

   // Swallows the error and returns a fallback — only when the fallback is genuinely safe
   import { tryWithFallback } from '@rtorcato/js-common/errors'
   const rows = await tryWithFallback(() => fetchRows(), [])
   ```

   `tryCatch` in `errors` was renamed to `tryWithFallback` in 2.0; `tryCatch` now means the Result helper in `try`.

4. **Node-only modules.** `crypto`, `security`, and `file` import `node:crypto` / `node:fs`; `logger` uses pino. Don't ship these to a browser bundle. `events` is the opposite — it wraps DOM `EventTarget` and is browser-only. `os`, `process`, `node`, and `system` probe for `process` / `window` and degrade rather than throw.

5. **`./types` is types-only.** It has a `types` field and no `import` field on purpose — use it for `import type { Prettify, Merge } from '@rtorcato/js-common/types'` only.

6. **Some helpers need a peer input you must supply.** `convertCurrency(amount, rate)` takes the rate — the library does no FX lookup. `checkEnv(schema)` needs a Zod object schema and throws with the list of missing keys.

## Module → exports

Import from `@rtorcato/js-common/<module>`.

| Module | Exports |
|---|---|
| abortController | createAbortController, abortPromise, withAbort, abortAfter |
| arrays | first, last, unique, flatten, chunk, compact, shuffle, groupBy |
| boolean | toBoolean, xor, and, or, not |
| colors | randomColor, matchingTextColor, hexToRgb, rgbToHex, isValidHex, darken, lighten |
| console | disableConsole, clearConsole |
| crypto | hashString, randomHex, hmacHash, base64Encode, base64Decode |
| currency | getCurrencySymbol, getCurrencyName, getCurrencyLocale, formatPrice, formatPriceCompact, parsePrice, parseCurrencyString, convertCurrency, isValidCurrencyCode, isValidCurrency |
| date | today, parseDate, formatDate, daysBetween, diffInHours, diffInMinutes, isLeapYear, addDays, subDays, addMonths, getDayOfWeek, startOfDay, endOfDay, isWeekend, isSameDay, isToday, formatRelative |
| datetime | nowIso, parseIsoDateTime, formatDateTimeLocal, getTimezoneOffset, toUtcDate, unixTimestamp, unixMillis, getIsoWeek, getIsoWeekInfo |
| emails | isValidEmail, normalizeEmail, maskEmail, getEmailDomain, isFreeEmailProvider |
| env | getENV, isDev, isProd, isTest, getNodeEnv, checkEnv, RootApiEnvSchema |
| errors | createCustomError, isErrorName, getErrorMessage, assert, tryWithFallback |
| events | on, emit, onceEvent, preventDefault, stopPropagation |
| fetch | fetchWithTimeout, postJson, getJson, fetchText, handleApiError |
| file | readFileAsString, writeFileAsString, fileExists, deleteFile, getFileExtension |
| functions | once, debounce, throttle, compose, pipe |
| geometry | distance2D, midpoint2D, angle2D, pointInRect, rectsOverlap, polygonArea |
| html | escapeHtml, unescapeHtml, stripHtmlTags, textToHtml, containsHtml |
| i18n | detectLanguage, formatNumber, formatDateI18n, t |
| interval | runInterval, clearIntervalById |
| json | safeJsonParse, safeJsonStringify, isValidJson, deepCloneJson |
| logger | logger (pino instance — pretty in dev, JSON in prod) |
| logging | logWithTimestamp, info, warn, error, captureConsole, ConsoleLevel |
| maps | invertMap, mapValues, mergeMaps, objectToMap, mapToObject |
| mime-types | lookup, types, extensions, mimeTypes |
| node | nodeVersionCheck, getNodeMajorVersion, isNode, requireOptional |
| numbers | clamp, roundTo, formatPercent, isFiniteNumber, isInteger, between, sum, average, mod, min, max |
| objects | isPlainObject, deepMerge, omit, pick, deepClone |
| os | getOsPlatform, getOsRelease, getOsArch, getHomeDir, getTmpDir |
| process | getProcessId, getProcessUptime, getCwd, getProcessPlatform, exitProcess, isCI |
| promises | delay, to, withTimeout, all, allSettled, race |
| random | randomInt, randomFloat, randomBool, randomElement, randomString |
| regex | escapeRegExp, testRegex, matchAll, replaceAllRegex, splitByRegex |
| security | sanitizeString, isStrongPassword, generateSecureToken |
| sets | union, intersection, difference, isSubset, isSuperset, setToArray, arrayToSet |
| sleep | sleep, sleepSync, sleepRandom, sleepWithAbort |
| strings | titleCase, capitalize, camelCase, kebabCase, snakeCase, truncate, padStart, padEnd, replaceString, reverse, slugify, words, wordCount, pluralize, ordinalize, isBlank, mask, template |
| system | isMacOs, isWindows, isLinux, isIOS, isAndroid, getPlatform, isTouchDevice |
| time | nowTime, nowTimeShort, parseTime, formatTime, secondsBetween, pad2 |
| try | tryCatch, isSuccess, Result, Success, Failure |
| types | Prettify, Merge (types only) |
| url | isValidUrl, getQueryParams, setQueryParam, removeQueryParam, joinUrl, getHostname |
| uuid | getUUID, getUUIDv7, getShortUUID, toShortUUID, fromShortUUID, isUUID, isUUIDv4, isNilUUID, getUUIDVersion, getNilUUID, uuidToBytes, bytesToUUID |
| validation | isDefined, isString, isNumber, isBoolean, isArray, isObject, isEmail, isUrl |

## CLI

The package also ships a binary for shell use:

```bash
npx @rtorcato/js-common@latest date today
npx @rtorcato/js-common@latest math sum 1 2 3
npx @rtorcato/js-common@latest text capitalize "hello world"
```

See [CLI.md](https://github.com/rtorcato/js-common/blob/main/CLI.md) for the full command list.

For full signatures and examples, see <https://rtorcato.github.io/js-common/>.
