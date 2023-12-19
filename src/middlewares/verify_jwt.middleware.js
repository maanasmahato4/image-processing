const jwt = require("jsonwebtoken");

const {
    internalServerError, notFoundError, badRequestError
} = require("../shared/errors/errorFunctions");

async function verifyUser(request, response, next) {
    try {
        const authorizationHeader = request.headers.authorization || request.headers.Authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return await notFoundError(request, response, "access_token not found");
        };
        const access_token = authorizationHeader.split(' ')[1];
        jwt.verify(
            access_token,
            (err, decoded) => {
                if (err) {
                    return badRequestError(request, response, err);
                };
                request.user = decoded;
                next();
            }
        );
    } catch (error) {
        return await internalServerError(request, response, error);
    };
};

module.exports = verifyUser;