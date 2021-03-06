import winston  from "winston"

const { combine , timestamp , align , colorize , printf , splat , prettyPrint } = winston.format
const now = new Date()

const options = 
{
    file:
    {
        level:'silly',
        filename: `logs/${now.toLocaleDateString().replace(/\//g,"_")}_logs.log`,
        prettyprint:true,
    },
    error:
    {
        level:'error',
        filename: `logs/${now.toLocaleDateString().replace(/\//g,"_")}_error.log`,
        prettyprint:true,
    },
    console:
    {
        format: colorize({all:true}),
        level:'silly'
    }
}

export const logger = winston.createLogger({
    level: "silly",
    exitOnError:false,
    handleExceptions:true,
    format: combine( splat() , prettyPrint() , align() , timestamp({ format: "DD/MM/YYYY hh:mm:ss"}) , printf(info => `[${info.level}] : ${info.timestamp}: ${info.message}`) ),
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file),
        new winston.transports.File(options.error),
    ]
})


logger.error('test error')
logger.warn('test warning')
logger.info('test info')
logger.http('test http')
logger.verbose('test verbose')
logger.debug('test debug')
logger.silly('test silly')