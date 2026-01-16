# Strings Module

A comprehensive collection of string manipulation utilities for common text transformations.

## Features

- 🔤 **Case Conversion** - Title, camel, kebab, snake case
- ✂️ **Truncation & Padding** - Smart text formatting
- 🔀 **Random Strings** - Generate random character sequences
- 🛡️ **Sanitization** - Remove potentially dangerous content
- 🔗 **URL Slugs** - URL-friendly string conversion
- 🏷️ **HTML Handling** - Escape, unescape, and strip HTML
- 📝 **Text Analysis** - Word splitting and counting
- 🎭 **Masking** - Hide sensitive data
- 🔢 **Formatting** - Pluralization and ordinals

## Installation

```typescript
import {
  // Case conversion
  titleCase,
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  
  // Text manipulation
  truncate,
  padStart,
  padEnd,
  reverse,
  slugify,
  
  // Random & replace
  randomString,
  replaceString,
  
  // HTML handling
  sanitizeString,
  escapeHtml,
  unescapeHtml,
  stripHtml,
  
  // Text analysis
  words,
  wordCount,
  isBlank,
  
  // Formatting
  pluralize,
  ordinalize,
  mask,
  template,
} from '@rtorcato/js-common/strings'
```

## API Reference

### Case Conversion

#### `titleCase(str: string): string`

Converts a string to Title Case (capitalizes the first letter of each word).

```typescript
titleCase('hello world')       // 'Hello World'
titleCase('javaScript is fun') // 'Javascript Is Fun'
```

#### `capitalize(str: string): string`

Capitalizes the first letter of a string.

```typescript
capitalize('hello') // 'Hello'
capitalize('')      // ''
```

#### `camelCase(str: string): string`

Converts a string to camelCase.

```typescript
camelCase('hello world')  // 'helloWorld'
camelCase('hello-world')  // 'helloWorld'
camelCase('hello_world')  // 'helloWorld'
```

#### `kebabCase(str: string): string`

Converts a string to kebab-case.

```typescript
kebabCase('helloWorld')  // 'hello-world'
kebabCase('Hello World') // 'hello-world'
```

#### `snakeCase(str: string): string`

Converts a string to snake_case.

```typescript
snakeCase('helloWorld')  // 'hello_world'
snakeCase('Hello World') // 'hello_world'
```

### Text Manipulation

#### `truncate(str: string, maxLength: number): string`

Truncates a string to a maximum length, adding ellipsis if needed.

```typescript
truncate('Hello, World!', 10) // 'Hello, Wo…'
truncate('Short', 10)         // 'Short'
```

#### `padStart(str: string, targetLength: number, padString?: string): string`

Pads the start of a string to a given length.

```typescript
padStart('5', 3, '0')  // '005'
padStart('42', 5, ' ') // '   42'
```

#### `padEnd(str: string, targetLength: number, padString?: string): string`

Pads the end of a string to a given length.

```typescript
padEnd('5', 3, '0') // '500'
padEnd('hello', 10) // 'hello     '
```

#### `reverse(str: string): string`

Reverses a string.

```typescript
reverse('hello')  // 'olleh'
reverse('abc123') // '321cba'
```

#### `slugify(str: string): string`

Converts a string to a URL-friendly slug. Handles unicode and accents.

```typescript
slugify('Hello World!')    // 'hello-world'
slugify('Café & Résumé')   // 'cafe-resume'
slugify('  Multiple   Spaces  ') // 'multiple-spaces'
```

### Random & Replace

#### `randomString(length: number, chars: string): string`

Generates a random string of specified length using provided characters.

```typescript
randomString(8, 'abc123')            // e.g., 'a1b3c2a1'
randomString(16, '0123456789abcdef') // e.g., '3f8a2c1b9d0e4f7a'
```

#### `replaceString(str: string, search: string, replacement: string): string`

Replaces all occurrences of a string using regex.

```typescript
replaceString('hello world world', 'world', 'there') // 'hello there there'
```

### HTML Handling

#### `sanitizeString(str: string): string`

Sanitizes a string by removing script tags and event handlers.

```typescript
sanitizeString('<script>alert("xss")</script>Hello') // 'Hello'
sanitizeString('<div onclick="evil()">Safe</div>')   // '<div >Safe</div>'
```

#### `escapeHtml(str: string): string`

Escapes HTML special characters to prevent XSS.

```typescript
escapeHtml('<div>Hello & "World"</div>') // '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'
escapeHtml("It's <script>")              // "It&#39;s &lt;script&gt;"
```

#### `unescapeHtml(str: string): string`

Unescapes HTML entities back to their original characters.

```typescript
unescapeHtml('&lt;div&gt;')      // '<div>'
unescapeHtml('&amp;&quot;&#39;') // '&"''
```

#### `stripHtml(str: string): string`

Removes all HTML tags from a string.

```typescript
stripHtml('<p>Hello <b>World</b></p>') // 'Hello World'
stripHtml('<script>alert(1)</script>Text') // 'alert(1)Text'
```

### Text Analysis

#### `words(str: string): string[]`

Splits a string into an array of words.

```typescript
words('hello world')       // ['hello', 'world']
words('camelCaseString')   // ['camel', 'Case', 'String']
words('hello-world_test')  // ['hello', 'world', 'test']
```

#### `wordCount(str: string): number`

Counts the number of words in a string.

```typescript
wordCount('hello world')        // 2
wordCount('  one  two  three  ') // 3
wordCount('')                   // 0
```

#### `isBlank(str: string): boolean`

Checks if a string is blank (empty or only whitespace).

```typescript
isBlank('')      // true
isBlank('   ')   // true
isBlank('\t\n')  // true
isBlank('hello') // false
```

### Formatting

#### `pluralize(word: string, count: number, plural?: string): string`

Returns the plural form of a word based on count.

```typescript
pluralize('item', 1)           // 'item'
pluralize('item', 5)           // 'items'
pluralize('box', 2, 'boxes')   // 'boxes'
pluralize('child', 3, 'children') // 'children'
```

#### `ordinalize(num: number): string`

Converts a number to its ordinal form.

```typescript
ordinalize(1)   // '1st'
ordinalize(2)   // '2nd'
ordinalize(3)   // '3rd'
ordinalize(4)   // '4th'
ordinalize(11)  // '11th'
ordinalize(21)  // '21st'
```

#### `mask(str: string, start: number, end: number, char?: string): string`

Masks part of a string with a specified character.

```typescript
mask('1234567890', 0, 6)         // '******7890'
mask('1234567890', 6, 10)        // '123456****'
mask('4111111111111111', 0, 12)  // '************1111'
mask('secret', 0, 3, 'X')        // 'XXXret'
```

#### `template(str: string, data: Record<string, unknown>): string`

Simple template interpolation using `${key}` syntax.

```typescript
template('Hello, ${name}!', { name: 'World' }) // 'Hello, World!'
template('${a} + ${b} = ${c}', { a: 1, b: 2, c: 3 }) // '1 + 2 = 3'
template('Missing ${key}', {}) // 'Missing ${key}'
```

## Use Cases

### Form Input Processing

```typescript
const username = sanitizeString(input.value)
const slug = slugify(title)
const className = camelCase(componentName)
```

### Display Formatting

```typescript
const displayTitle = titleCase(article.title)
const preview = truncate(article.content, 100)
const orderNumber = padStart(order.id.toString(), 6, '0')
const itemText = `${count} ${pluralize('item', count)}`
const position = ordinalize(rank) // "1st place"
```

### Secure Display

```typescript
const cardNumber = mask(card, 0, 12) // '************1234'
const email = mask(user.email, 3, user.email.indexOf('@')) // 'joh****@example.com'
const safeHtml = escapeHtml(userInput)
```

### Code Generation

```typescript
const varName = camelCase(columnName)      // userId
const fileName = kebabCase(componentName)  // user-profile
const dbColumn = snakeCase(fieldName)      // created_at
const urlSlug = slugify(articleTitle)      // my-blog-post
```

### Text Analysis

```typescript
const count = wordCount(essay)
const tokens = words(sentence)
const isEmpty = isBlank(input)
```

### Templates

```typescript
const message = template('Hello ${name}, you have ${count} messages', {
  name: user.name,
  count: messages.length
})
```

## Notes

- All functions are pure and don't mutate input
- Empty string inputs are handled gracefully
- `sanitizeString` provides basic XSS protection but should not be relied upon as the sole security measure
- `slugify` normalizes unicode characters and removes diacritics
- `mask` is useful for hiding sensitive data like credit card numbers
