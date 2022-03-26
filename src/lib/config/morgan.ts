import morgan from "morgan"
import { logger } from "./winston"

export const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            // Configure Morgan to use our custom logger with the http severity
            write: (message:string) => logger.info(message),
        },
    }
)
