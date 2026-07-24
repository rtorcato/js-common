import { createRequire } from 'node:module'
import pino from 'pino'
import { isDev } from '../env'

// pino-pretty is an optionalDependency — present for the nice dev experience, but a
// consumer that installed with --no-optional (or where the optional install failed)
// won't have it. Probe for it so the logger falls back to JSON instead of throwing
// `Cannot find module 'pino-pretty'` at construction.
function hasPinoPretty(): boolean {
	try {
		createRequire(import.meta.url).resolve('pino-pretty')
		return true
	} catch {
		return false
	}
}

/**
 * Pre-configured Pino logger — pretty-printed with colors in development (when
 * `pino-pretty` is installed), plain JSON at `info` level in production.
 */
export const logger =
	isDev() && hasPinoPretty()
		? pino({
				level: 'debug',
				transport: {
					target: 'pino-pretty',
					options: {
						colorize: true,
						ignore: 'pid,hostname,time',
						levelFirst: false,
						//   levelFirst: false, // Ensures level is not printed twice
						//   messageKey: 'msg',
						singleLine: true, // Prevents "USERLVL" style formatting
						//   messageFormat: `{level} {msg}`,

						//   customPrettifiers: {
						//     time: (timestamp) => `🕰 ${timestamp}`,
						//   },
						customColors: 'err:red,info:blue',
						//   customPrettifiers: {
						//     time: (timestamp) => `🕰 ${timestamp}`,
						//   },
						translateTime: 'HH:MM:ss',
					},
				},
			})
		: pino({ level: 'info' })
