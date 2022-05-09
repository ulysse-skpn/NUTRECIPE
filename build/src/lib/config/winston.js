"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, align, colorize, printf, splat, prettyPrint } = winston_1.default.format;
const now = new Date();
const options = {
    file: {
        level: 'silly',
        filename: `logs/${now.toLocaleDateString().replace(/\//g, "_")}_logs.log`,
        prettyprint: true,
    },
    error: {
        level: 'error',
        filename: `logs/${now.toLocaleDateString().replace(/\//g, "_")}_error.log`,
        prettyprint: true,
    },
    console: {
        format: colorize({ all: true }),
        level: 'silly'
    }
};
exports.logger = winston_1.default.createLogger({
    level: "silly",
    exitOnError: false,
    handleExceptions: true,
    format: combine(splat(), prettyPrint(), align(), timestamp({ format: "DD/MM/YYYY hh:mm:ss" }), printf(info => `[${info.level}] : ${info.timestamp}: ${info.message}`)),
    transports: [
        new winston_1.default.transports.Console(options.console),
        new winston_1.default.transports.File(options.file),
        new winston_1.default.transports.File(options.error),
    ]
});
exports.logger.error('test error');
exports.logger.warn('test warning');
exports.logger.info('test info');
exports.logger.http('test http');
exports.logger.verbose('test verbose');
exports.logger.debug('test debug');
exports.logger.silly('test silly');
//# sourceMappingURL=winston.js.map