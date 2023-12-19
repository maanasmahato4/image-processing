// 3rd party libraries
const winston = require("winston");
const { printf, combine, timestamp, label, errors } = winston.format;


// underdevelopment log format
const devLogFormat = printf(({ level, message, timestamp, stack }) => {
    if (stack) {
        return `${timestamp} ${level}: ${message}\n${stack}`;
    };
});

// underdevelopment logger
function underDevelopmentLogger(fileName) {
    return winston.createLogger({
        level: "info",
        format: combine(
            label({ label: "underdevelopment" }),
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            errors({ stack: true }),
            devLogFormat
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ dirname: "logs", filename: fileName })
        ]
    });
};


// production log format
const prodLogFormat = printf(({ level, message, timestamp }) => {
    return `${level} ${message}: ${timestamp}`;
});

// production logger
function productionLogger(fileName) {
    return winston.createLogger({
        level: "info",
        format: combine(
            label({ label: "production" }),
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            prodLogFormat
        ),
        transports: [
            new winston.transports.File({ dirname: "logs", filename: fileName })
        ]
    });
};

function logger() {
    if (process.env.NODE_ENV = "development") {
        return underDevelopmentLogger;
    } else {
        return productionLogger;
    };
};

module.exports = {
    underDevelopmentLogger,
    productionLogger,
    logger
};