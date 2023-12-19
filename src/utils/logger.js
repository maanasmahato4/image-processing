// 3rd party libraries
const winston = require("winston");
const { printf, combine, timestamp, label, errors } = winston.format;


// underdevelopment log format
const devLogFormat = printf(({ level, message, timestamp, stack }) => {
    if (stack) {
        return `${timestamp} ${level}: ${message}\n${stack}`;
    } else {
        return `${timestamp} ${level}: ${message}`;
    }
});

// underdevelopment logger
const underDevelopmentLogger = winston.createLogger({
    level: "info",
    format: combine(
        label({ label: "underdevelopment" }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        devLogFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ dirname: "logs", filename: 'devLog.log' })
    ]
});


// production log format
const prodLogFormat = printf(({ level, message, timestamp }) => {
    return `${level} ${timestamp}: ${message}`;
});

// production logger
const productionLogger = winston.createLogger({
    level: "info",
    format: combine(
        label({ label: "production" }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        prodLogFormat
    ),
    transports: [
        new winston.transports.File({ dirname: "logs", filename: 'logs.log' })
    ]
});

let logger = null;
if (process.env.NODE_ENV == "development") {
    logger = underDevelopmentLogger;
} else {
    logger = productionLogger;
};

module.exports = {
    underDevelopmentLogger,
    productionLogger,
    logger
};