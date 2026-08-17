# Security Policy

## Supported Versions

We actively support the following versions of `@rtorcato/js-common`:

| Version | Supported          |
| ------- | ------------------ |
| 3.x.x   | :white_check_mark: |
| < 3.0   | :x:                |

Only the latest major gets fixes. 3.0 moved every helper to exactly one module and
renamed `sanitizeString` to `stripScriptish` — see [MODULE-BOUNDARIES.md](MODULE-BOUNDARIES.md)
and the [migration guide](https://rtorcato.github.io/js-common/docs/guides/migration).

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

- ✅ **Minimal Runtime Dependencies**: Library utilities depend on a small, audited set (`pino`, `short-uuid`, `uuid`, `zod`). The CLI-only packages (`@inquirer/prompts`, `chalk`, `chalk-animation`, `commander`, `figlet`, `gradient-string`) are `optionalDependencies` used by the `js-common` binary, not by any importable subpath — there is no `./cli` export.
- ✅ **Type Safety**: Full TypeScript support prevents many runtime errors
- ✅ **Secure Defaults**: `generateSecureToken` uses `randomBytes` from `node:crypto`. The `Math.random`-based helpers in `random` are never an acceptable substitute for it.
- ✅ **Automated Updates**: Dependabot keeps dependencies current
- ✅ **CI Security**: GitHub Actions with security scanning

### Known Security Considerations

1. **`stripScriptish` is not a sanitizer**: it strips `<script>` blocks and inline
   `on*` handlers, and nothing else. A blocklist over two shapes leaves everything it
   does not name — `<a href="javascript:...">` survives it untouched. Treat it as
   defence in depth: escape untrusted values with `html.escapeHtml`, or run a real
   sanitizer such as DOMPurify when markup has to survive. It was renamed from
   `sanitizeString` in 3.0 precisely because the old name promised a guarantee it
   never delivered; `src/security/index.test.ts` asserts the bypasses so they stay visible.
2. **Crypto Module**: Uses Node.js built-in crypto - ensure Node.js is up-to-date
3. **Environment Variables**: Never commit secrets to version control
4. **Input Validation**: Always validate user input before processing
5. **CLI Tool**: Be cautious when running CLI commands with user input

### Security Resources

- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [NPM Security Guidelines](https://docs.npmjs.com/security)
- [TypeScript Security](https://www.typescriptlang.org/docs/handbook/security.html)

Thank you for helping keep `@rtorcato/js-common` secure!