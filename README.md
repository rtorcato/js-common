# js-common

[![npm version](https://badge.fury.io/js/%40rtorcato%2Fjs-common.svg)](https://badge.fury.io/js/%40rtorcato%2Fjs-common)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive set of common JavaScript and TypeScript utilities for Node.js projects.

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
npx @rtorcato/js-common --help

# Examples
npx @rtorcato/js-common date today
npx @rtorcato/js-common math sum 1 2 3 4 5
npx @rtorcato/js-common text capitalize "hello world"
npx @rtorcato/js-common security token
```

See [CLI.md](./CLI.md) for complete CLI documentation.

## Library Usage

```typescript
// Import specific modules
import { formatDate } from '@rtorcato/js-common/date';
import { validateEmail } from '@rtorcato/js-common/emails';
import { generateUUID } from '@rtorcato/js-common/uuid';

// Or import everything
import * as jsCommon from '@rtorcato/js-common';
```

## Available Modules

This library provides utilities for:

- **Arrays** - Array manipulation utilities
- **Boolean** - Boolean operations and validations
- **Colors** - Color manipulation and conversion
- **Console** - Enhanced console utilities
- **Crypto** - Cryptographic functions
- **Currency** - Currency formatting and conversion
- **Date/DateTime** - Date and time utilities
- **Emails** - Email validation and utilities
- **Events** - Event handling utilities
- **Fetch** - HTTP request utilities
- **Functions** - Function utilities and helpers
- **JSON** - JSON parsing and validation
- **Math** - Mathematical operations
- **Numbers** - Number formatting and validation
- **Promises** - Promise utilities and helpers
- **Strings** - String manipulation utilities
- **UUID** - UUID generation and validation
- **Validation** - Data validation utilities
- And many more...

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the project
pnpm run build-prod

# Lint and format
pnpm run check:fix
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.