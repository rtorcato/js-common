---
name: verify
description: Run full verification suite (typecheck, biome check, tests) before marking work done
---

Run the full verification suite in sequence and report results:

```bash
pnpm typecheck && pnpm check && pnpm test
```

If any step fails, report which step failed and the relevant error output. Do not proceed to the next step if a previous one fails.

Use this before marking any implementation task as complete, before creating a PR, or when the user asks you to verify your changes.
