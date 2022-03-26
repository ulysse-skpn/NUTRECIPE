import winston  from "winston"

const { combine , timestamp , align , colorize , printf , splat } = winston.format
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
        level:'info',
        json: false,
        colorize:({all:true})
    }
}

const myFormat = printf( ({ level , message , timestamp }) => {
    return `${timestamp} [${level}] : ${message}`
})

export const logger = winston.createLogger({
    level: "silly",
    exitOnError:false,
    handleExceptions:true,
    format: combine( splat() , align() , timestamp({ format: "DD/MM/YYYY hh:mm:ss"}) , myFormat ),
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file),
        new winston.transports.File(options.error),
    ]
})

// if( process.env.NODE_ENV !== "production" )
// {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }));
// }


logger.error('test error')
logger.warn('test warning')
logger.info('test info')
logger.http('test http')
logger.verbose('test verbose')
logger.debug('test debug')
logger.silly('test silly')