// custom files imports
const {
    INTERNAL_SERVER_EXCEPTION,
    CONFLICT_EXCEPTION,
    NOT_FOUND_EXCEPTION,
    INVALID_EXCEPTION,
    BAD_REQUEST_EXCEPTION
} = require("../constants/exceptions.constants");

const {
    logger
} = require("../../utils/logger");


function internalServerError(request, response, error) {
    logger.error(`${req.method} ${request.url}`, error);
    return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: error.message });
};

function conflictError(request, response, error) {
    logger.error(`${req.method} ${request.url}`, error);
    return response.status(409).json({ error: CONFLICT_EXCEPTION, message: error.message });
};

function notFoundError(request, response, error) {
    logger.error(`${req.method} ${request.url}`, error);
    return response.status(404).json({ error: NOT_FOUND_EXCEPTION, message: error.message });
};

function invalidError(request, response, error) {
    logger.error(`${req.method} ${request.url}`, error);
    return response.status(422).json({ error: INVALID_EXCEPTION, message: error.message });
};

function badRequestError(request, response, error) {
    logger.error(`${req.method} ${request.url}`, error);
    return response.status(400).json({ error: BAD_REQUEST_EXCEPTION, message: error.message });
};

module.exports = {
    internalServerError,
    conflictError,
    notFoundError,
    invalidError,
    badRequestError
};