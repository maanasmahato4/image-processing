// imports
const { INTERNAL_SERVER_EXCEPTION } = require("../shared/constants/exceptions.constants");

function errorHandler(error, request, response, next) {
    try {
        console.log(error);
        return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: error.message });
    } catch (error) {
        console.log(error);
    };
};

module.exports = errorHandler;