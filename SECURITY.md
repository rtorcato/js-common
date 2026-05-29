# Security Policy

## Supported Versions

We actively support the following versions of `@rtorcato/js-common`:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly:

### How to Report

1. **Email**: Send details to security@rtorcato.com (if available)
2. **GitHub**: Create a private security advisory via GitHub Security tab
3. **Issue**: For non-critical issues, create a regular GitHub issue

### What to Include

- **Description**: Clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps to reproduce the issue  
- **Impact**: Potential impact and affected versions
- **Suggested Fix**: If you have ideas for remediation

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 5 business days
- **Resolution**: Depends on severity and complexity

### Security Best Practices

This library follows security best practices:

- ✅ **Minimal Runtime Dependencies**: Library utilities depend on a small, audited set (`date-fns`, `luxon`, `pino`, `uuid`, `short-uuid`, `zod`). CLI-only packages (`chalk`, `commander`, `inquirer`, `figlet`, …) are isolated to the `cli` subpath.
- ✅ **Type Safety**: Full TypeScript support prevents many runtime errors
- ✅ **Secure Defaults**: Crypto functions use strong algorithms (SHA-256, etc.)
- ✅ **Input Validation**: Validation utilities help prevent injection attacks
- ✅ **Automated Updates**: Dependabot keeps dependencies current
- ✅ **CI Security**: GitHub Actions with security scanning

### Known Security Considerations

1. **Crypto Module**: Uses Node.js built-in crypto - ensure Node.js is up-to-date
2. **Environment Variables**: Never commit secrets to version control
3. **Input Validation**: Always validate user input before processing
4. **CLI Tool**: Be cautious when running CLI commands with user input

### Security Resources

- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [NPM Security Guidelines](https://docs.npmjs.com/security)
- [TypeScript Security](https://www.typescriptlang.org/docs/handbook/security.html)

Thank you for helping keep `@rtorcato/js-common` secure!