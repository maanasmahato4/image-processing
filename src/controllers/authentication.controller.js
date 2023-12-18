// 3rd party libraries


// custom imports

const {
    addUser,
    userExists,
    saveRefreshToken
} = require("../services/auth.service");

const {
    generateAccessToken, generateRefereshToken
} = require("../services/jwt.service");

const {
    internalServerError,
    conflictError
} = require("../shared/errors/errorFunctions");

async function RegisterUser(request, response) {
    try {
        const { email, password } = request.body;
        const exists = userExists({ email });
        if (exists) {
            return conflictError(response, "user already exists");
        };
        const userSaved = await addUser({ email, password });
        if (userSaved.email !== email) {
            return internalServerError(response, "error saving user to the database")
        };
        const [access_token, refresh_token] = await Promise.all([generateAccessToken(userSaved), generateRefereshToken(userSaved)]);
        if (!access_token || !refresh_token) {
            return internalServerError(response, "error generating user tokens");
        };
        const savedToken = await saveRefreshToken(refresh_token);
        if (!savedToken.refresh_token) {
            return internalServerError(response, "refresh token not saved");
        };
        return access_token;
    } catch (error) {
        return internalServerError(response, error.message);
    };
};

async function SignInUser(request, response) {
    try {

    } catch (error) {

    };
};

async function SignOutUser(request, response) {
    try {

    } catch (error) {

    };
};

async function RefreshAccessToken(request, response) {
    try {

    } catch (error) {

    };
};

module.exports = {
    RegisterUser,
    SignInUser,
    SignOutUser,
    RefreshAccessToken
};