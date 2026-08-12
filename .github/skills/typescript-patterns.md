# TypeScript Patterns for @rtorcato/js-common

This file provides GitHub Copilot with specific TypeScript patterns used throughout the js-common library for better code completion and suggestions.

## Generic Function Patterns

### Array Manipulation Functions
```typescript
// Pattern: Generic array transformation
export function mapItems<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn)
}

// Pattern: Array grouping with a computed key — js-common's `groupBy` takes a
// key function, not a property name
export function groupBy<T>(
  arr: T[],
  fn: (item: T) => string | number
): Record<string | number, T[]> {
  // Implementation details...
}
```

### Object Manipulation Patterns
```typescript
// Pattern: Object key picking with type safety
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  // Implementation...
}

// Pattern: Object merging with deep type inference
export function deepMerge<T extends object, U extends object>(
  target: T,
  source: U
): T & U {
  // Implementation...
}
```

### Validation Patterns
```typescript
// Pattern: Type predicate functions
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}
```

### Async Utility Patterns
```typescript
// Pattern: Go-style Result instead of a thrown exception
export type Success<T> = { data: T; error: null }
export type Failure<E> = { data: null; error: E }
export type Result<T, E = Error> = Success<T> | Failure<E>

export async function tryCatch<T, E = Error>(fn: () => Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await fn()
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as E }
  }
}

// Pattern: Promise timeout wrapper
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  // Implementation...
}
```

### String Processing Patterns
```typescript
// Pattern: Template string processing
export function template(
  str: string,
  values: Record<string, unknown>
): string {
  // Implementation...
}
```

## Common Usage Examples for Copilot

### Data Processing Pipeline
```typescript
import { groupBy } from '@rtorcato/js-common/arrays'
import { pick } from '@rtorcato/js-common/objects'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  active: boolean
}

// Copilot should suggest this pattern for user data processing
function processUsers(users: User[]) {
  const active = users
    .filter((user) => user.active)
    .map((user) => pick(user, ['id', 'name', 'email', 'role']))

  return groupBy(active, (user) => user.role)
}
```

### Error Handling Pipeline
```typescript
import { isSuccess, tryCatch } from '@rtorcato/js-common/try'

// Pattern for API calls with error handling
async function fetchUserData(userId: string) {
  const result = await tryCatch(async () => {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return response.json()
  })

  if (isSuccess(result)) {
    return result.data
  }

  console.error('Failed to fetch user:', result.error.message)
  return null
}
```

### Validation Chain
```typescript
import { isBlank } from '@rtorcato/js-common/strings'
import { isEmail } from '@rtorcato/js-common/validation'

// Pattern for input validation
function validateUserInput(input: { email: string; password: string }) {
  const errors: string[] = []

  if (isBlank(input.email) || !isEmail(input.email)) {
    errors.push('Invalid email address')
  }

  if (isBlank(input.password) || input.password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
```

## Code Completion Hints

When Copilot encounters these imports, suggest these patterns:

### Import Suggestions
- `@rtorcato/js-common/arrays` → suggest `unique`, `chunk`, `groupBy`, `flatten`, `compact`
- `@rtorcato/js-common/strings` → suggest `capitalize`, `titleCase`, `kebabCase`, `camelCase`, `truncate`, `isBlank`
- `@rtorcato/js-common/validation` → suggest `isEmail`, `isUrl`, `isString`, `isDefined`
- `@rtorcato/js-common/try` → suggest `tryCatch`, `isSuccess` for error handling
- `@rtorcato/js-common/objects` → suggest `pick`, `omit`, `deepMerge`, `deepClone`
- `@rtorcato/js-common/numbers` → suggest `clamp`, `roundTo`, `sum`, `average`
- `@rtorcato/js-common/currency` → suggest `formatPrice` for money formatting

Never suggest a bare `@rtorcato/js-common` import: the root entry has no runtime
code, so a root import resolves to nothing.

### Function Chaining Patterns
```typescript
// Suggest chaining for array operations
const grouped = groupBy(
  users.filter(isActive).map((u) => pick(u, ['id', 'name', 'department'])),
  (u) => u.department
)

// Suggest error handling for async chains
const { data, error } = await tryCatch(() =>
  fetch(url)
    .then((r) => r.json())
    .then(validateData)
)
```

### TypeScript Integration
- Always preserve generic types: `unique<User>(users)`
- Suggest type guards: `if (isString(value)) { /* value is string */ }`
- Use type inference: `const grouped = groupBy(items, (item) => item.category)` // infers grouping type
