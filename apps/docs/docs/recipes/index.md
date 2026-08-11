---
title: Recipes
description: Task-oriented walkthroughs that combine several js-common modules to solve a concrete problem.
---

The [module pages](../modules/overview.md) tell you what each function does.
These pages start from a problem instead — the kind you arrive at from a search
engine — and show the whole solution, including the parts that are not
`js-common` at all.

Every snippet is copy-pasteable as written.

| Recipe | Modules |
| --- | --- |
| [Format a date for a user's locale](./format-date-for-locale.md) | `date`, `datetime`, `i18n` |
| [Debounce a search input](./debounce-a-search-input.md) | `functions`, `abortController`, `try`, `errors` |
| [Safely parse untrusted JSON](./parse-untrusted-json.md) | `json`, `validation` |
| [Generate a slug and keep it unique](./generate-a-unique-slug.md) | `strings`, `arrays`, `random` |
| [Retry an async operation with exponential backoff](./retry-with-exponential-backoff.md) | `promises`, `numbers`, `random`, `try` |

Missing one you needed? [Open an issue](https://github.com/rtorcato/js-common/issues) —
the gaps people hit are the best guide to what to write next.
