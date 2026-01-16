# TypeScript Patterns for @rtorcato/js-common

This file provides GitHub Copilot with specific TypeScript patterns used throughout the js-common library for better code completion and suggestions.

## Generic Function Patterns

### Array Manipulation Functions
```typescript
// Pattern: Generic array transformation
export function transform<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn)
}

// Pattern: Array filtering with type guards
export function filterBy<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate)
}

// Pattern: Array grouping with computed keys
export function groupBy<T, K extends string | number>(
  arr: T[], 
  key: keyof T | ((item: T) => K)
): Record<K, T[]> {
  // Implementation details...
}
```

### Object Manipulation Patterns
```typescript
// Pattern: Object key picking with type safety
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  // Implementation...
}

// Pattern: Object merging with deep type inference
export function merge<T extends Record<string, any>, U extends Record<string, any>>(
  obj1: T,
  obj2: U
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

// Pattern: Schema validation with type inference
export function validate<T>(value: unknown, schema: Schema<T>): value is T {
  // Implementation...
}
```

### Async Utility Patterns
```typescript
// Pattern: Safe async execution with error handling
export async function attempt<T>(
  fn: () => Promise<T>
): Promise<{ success: true; data: T } | { success: false; error: Error }> {
  try {
    const data = await fn()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as Error }
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
// Pattern: String case transformations
export function transform<T extends string>(
  str: T,
  transformer: (s: string) => string
): string {
  return transformer(str)
}

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
import { groupBy, pick, filterBy } from '@rtorcato/js-common'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  active: boolean
}

// Copilot should suggest this pattern for user data processing
function processUsers(users: User[]) {
  return filterBy(users, user => user.active)
    .map(user => pick(user, ['id', 'name', 'email']))
    .reduce(groupBy, user => user.role)
}
```

### Error Handling Pipeline
```typescript
import { attempt, trycatch } from '@rtorcato/js-common/try'

// Pattern for API calls with error handling
async function fetchUserData(userId: string) {
  const result = await attempt(async () => {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return response.json()
  })
  
  if (result.success) {
    return result.data
  } else {
    console.error('Failed to fetch user:', result.error.message)
    return null
  }
}
```

### Validation Chain
```typescript
import { isEmail, isEmpty, isLength } from '@rtorcato/js-common/validation'

// Pattern for input validation
function validateUserInput(input: { email: string; password: string }) {
  const errors: string[] = []
  
  if (isEmpty(input.email) || !isEmail(input.email)) {
    errors.push('Invalid email address')
  }
  
  if (isEmpty(input.password) || !isLength(input.password, 8)) {
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
- `@rtorcato/js-common/arrays` → suggest `unique`, `chunk`, `groupBy`, `flatten`
- `@rtorcato/js-common/strings` → suggest `capitalize`, `kebabCase`, `camelCase`, `truncate`
- `@rtorcato/js-common/validation` → suggest `isEmail`, `isUrl`, `isEmpty`, `isLength`
- `@rtorcato/js-common/try` → suggest `attempt`, `trycatch` for error handling
- `@rtorcato/js-common/objects` → suggest `pick`, `omit`, `merge`, `deepClone`

### Function Chaining Patterns
```typescript
// Suggest chaining for array operations
const result = users
  .filter(isActive)
  .map(u => pick(u, ['id', 'name']))
  .reduce(groupBy('department'))

// Suggest error handling for async chains
const data = await attempt(() =>
  fetch(url)
    .then(r => r.json())
    .then(validateData)
)
```

### TypeScript Integration
- Always preserve generic types: `unique<User>(users)`
- Suggest type guards: `if (isString(value)) { /* value is string */ }`
- Use type inference: `const grouped = groupBy(items, 'category')` // infers grouping type