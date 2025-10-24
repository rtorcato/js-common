# CLI Usage

The `@rtorcato/js-common` package includes a command-line interface that provides access to many of the utility functions directly from the terminal.

## Installation

After installing the package globally, you can use the CLI:

```bash
npm install -g @rtorcato/js-common
js-common --help
```

Or use it locally in your project:

```bash
npx @rtorcato/js-common --help
```

## Available Commands

### Date & Time Utilities

```bash
# Get today's date (YYYY-MM-DD)
js-common date today

# Get current timestamp
js-common date now
js-common date now --iso     # ISO format
js-common date now --time    # Time only (HH:MM:SS)

# Calculate days between dates
js-common date between 2025-01-01 2025-12-31
```

### Mathematical Operations

```bash
# Sum numbers
js-common math sum 1 2 3 4 5

# Calculate average
js-common math avg 10 20 30 40 50

# Generate random number
js-common math random --min 1 --max 100

# Round number to decimal places
js-common math round 3.14159 --decimals 2

# Clamp number between min/max
js-common math clamp 150 0 100
```

### Text Formatting

```bash
# Capitalize first letter
js-common text capitalize "hello world"

# Convert to title case
js-common text title "hello world from javascript"

# Pad with leading zeros
js-common text pad 5 --length 3
```

### File Operations

```bash
# Check if file exists (exit code 0 = exists, 1 = doesn't exist)
js-common file exists package.json

# Get file extension
js-common file ext myfile.txt
```

### Security Utilities

```bash
# Check password strength (exit code 0 = strong, 1 = weak)
js-common security password "MyStr0ng!Pass"

# Generate secure random token
js-common security token --length 32
```

### Validation

```bash
# Validate URL (exit code 0 = valid, 1 = invalid)
js-common validate url "https://example.com"
```

### System Information

```bash
# Get process ID
js-common system pid

# Get process uptime in seconds
js-common system uptime

# Check if running in CI environment
js-common system ci

# Get Node.js major version
js-common system node-version
```

## Exit Codes

Many validation commands use exit codes to indicate success/failure:
- `0`: Success/Valid/True
- `1`: Failure/Invalid/False

This makes them useful in shell scripts:

```bash
if js-common validate url "https://example.com"; then
    echo "Valid URL"
else
    echo "Invalid URL"
fi
```

## Examples in Scripts

```bash
#!/bin/bash

# Generate a secure token for API keys
API_KEY=$(js-common security token --length 16)
echo "Generated API Key: $API_KEY"

# Calculate project statistics
TOTAL_FILES=$(find . -name "*.js" | wc -l)
echo "Total JS files: $TOTAL_FILES"

# Check if today is a specific date
TODAY=$(js-common date today)
if [ "$TODAY" = "2025-01-01" ]; then
    echo "Happy New Year!"
fi
```