// custom files imports
const {
    INTERNAL_SERVER_EXCEPTION,
    CONFLICT_EXCEPTION,
    NOT_FOUND_EXCEPTION,
    INVALID_EXCEPTION,
    BAD_REQUEST_EXCEPTION
} = require("../constants/exceptions.constants");


function internalServerError(response, message) {
    return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message });
};

function conflictError(response, message) {
    return response.status(409).json({ error: CONFLICT_EXCEPTION, message });
};

function notFoundError(response, message) {
    return response.status(404).json({ error: NOT_FOUND_EXCEPTION, message });
};

function invalidError(response, message) {
    return response.status(422).json({ error: INVALID_EXCEPTION, message });
};

function badRequestError(response, message){
    return response.status(400).json({error: BAD_REQUEST_EXCEPTION, message });
};

module.exports = {
    internalServerError,
    conflictError,
    notFoundError,
    invalidError,
    badRequestError
};