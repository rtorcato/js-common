import pino from 'pino'
import { isDev } from '../env'

export const logger = isDev()
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
