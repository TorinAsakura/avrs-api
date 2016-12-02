import winston from 'winston'
import expressWinston from 'express-winston'

const logger = new winston.Logger({
  exitOnError: false,
})

if (process.env.NODE_ENV === 'development') {
  logger.add(winston.transports.Console, {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    prettyPrint: true,
  })
}

if (process.env.NODE_ENV === 'production') {
  logger.add(winston.transports.Console, {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true,
    prettyPrint: true,
  })
}

export const requestLogger = expressWinston.logger({
  winstonInstance: logger,
})

export default logger
