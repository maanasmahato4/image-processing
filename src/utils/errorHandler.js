// imports
const { logger } = require("../utils/logger");

async function errorHandler(error, request, response, next) {
    try {
        console.log(error);
        await logger(`${logger.method} ${logger.url}`, error);
    } catch (error) {
        console.log(error);
    }
};

module.exports = errorHandler;