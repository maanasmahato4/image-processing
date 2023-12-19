// 3rd party libraries


// custom imports

const {
    addUser,
    userExists,
    verifyUser,
    saveRefreshToken,
    deleteRefreshToken
} = require("../services/auth.service");

const {
    generateAccessToken, generateRefereshToken
} = require("../services/jwt.service");

const {
    internalServerError,
    conflictError,
    notFoundError
} = require("../shared/errors/errorFunctions");

async function RegisterUser(request, response) {
    try {
        const { email, password } = request.body;
        const exists = userExists({ email });
        if (exists) {
            return conflictError(request, response, { message: "user already exists" });
        };
        const userSaved = await addUser({ email, password });
        if (userSaved.email !== email) {
            return internalServerError(request, response, { message: "error saving user to the database" })
        };
        const [access_token, refresh_token] = await Promise.all([generateAccessToken(userSaved), generateRefereshToken(userSaved)]);
        if (!access_token || !refresh_token) {
            return internalServerError(request, response, { message: "error generating user tokens" });
        };
        const savedToken = await saveRefreshToken(refresh_token);
        if (!savedToken.refresh_token) {
            return internalServerError(request, response, { message: "refresh token not saved" });
        };
        await response.cookie("jwt", savedToken.refresh_token, { httpOnly: true, secrue: false, maxAge: 24 * 60 * 60 * 1000 });
        return access_token;
    } catch (error) {
        return internalServerError(request, response, error);
    };
};

async function SignInUser(request, response) {
    try {
        const { email, password } = request.body;
        const userVerified = await verifyUser({ email, password });
        const [access_token, refresh_token] = await Promise.all([generateAccessToken(userVerified), generateRefereshToken(userVerified)]);
        if (!access_token || !refresh_token) {
            return internalServerError(request, response, { message: "error generating user tokens" });
        };
        const savedToken = await saveRefreshToken(refresh_token);
        if (!savedToken.refresh_token) {
            return internalServerError(request, response, { message: "refresh token not saved" });
        };
        await response.cookie("jwt", savedToken.refresh_token, { httpOnly: true, secrue: false, maxAge: 24 * 60 * 60 * 1000 });
        return access_token;
    } catch (error) {
        return await internalServerError(request, response, error);
    };
};

async function SignOutUser(request, response) {
    try {
        const cookies = request.cookies;
        if (cookies?.jwt) {
            return notFoundError(request, response, { message: "jwt not found" });
        };
        await deleteRefreshToken(cookies?.jwt);
        await response.clearCookie("jwt");
    } catch (error) {
        return await internalServerError(request, response, error);
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