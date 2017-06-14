import winston from 'winston'
import rotateFile from 'winston-daily-rotate-file'

let wlogger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({ level: 'debug' }),
        new(rotateFile)({
            name: 'info-file',
            filename: 'logs/info',
            level: 'info'
        }),
        new(rotateFile)({
            name: 'error-file',
            filename: 'logs/error',
            level: 'error'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' })
    ],
    exitOnError: false
})

export default wlogger
