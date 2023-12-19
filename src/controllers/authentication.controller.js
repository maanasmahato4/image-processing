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
    generateAccessToken, generateRefreshToken, verifyRefreshToken
} = require("../services/jwt.service");

const {
    internalServerError,
    conflictError,
    notFoundError
} = require("../shared/errors/errorFunctions");

async function RegisterUser(request, response) {
    try {
        const { email, password } = request.body;
        const exists = await userExists({ email });
        if (exists) {
            return await conflictError(request, response, { message: "user already exists" });
        };
        const userSaved = await addUser({ email, password });
        if (userSaved.email !== email) {
            return await internalServerError(request, response, { message: "error saving user to the database" })
        };
        const [access_token, refresh_token] = await Promise.all([generateAccessToken(userSaved), generateRefreshToken(userSaved)]);
        if (!access_token || !refresh_token) {
            return await internalServerError(request, response, { message: "error generating user tokens" });
        };
        const savedToken = await saveRefreshToken({ uid: userSaved.id, refresh_token });
        if (!savedToken.refresh_token) {
            return await internalServerError(request, response, { message: "refresh token not saved" });
        };
        await response.cookie("jwt", savedToken.refresh_token, { httpOnly: true, secrue: false, maxAge: 24 * 60 * 60 * 1000 });
        return await response.status(200).json({ status: "success", access_token });
    } catch (error) {
        return internalServerError(request, response, error);
    };
};

async function SignInUser(request, response) {
    try {
        const { email, password } = request.body;
        const userVerified = await verifyUser({ email, password });
        const [access_token, refresh_token] = await Promise.all([generateAccessToken(userVerified), generateRefreshToken(userVerified)]);
        if (!access_token || !refresh_token) {
            return internalServerError(request, response, { message: "error generating user tokens" });
        };
        const savedToken = await saveRefreshToken({uid: userVerified.id, refresh_token});
        if (!savedToken.refresh_token) {
            return await internalServerError(request, response, { message: "refresh token not saved" });
        };
        await response.cookie("jwt", savedToken.refresh_token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 });
        return response.status(200).json({status: "success", access_token});
    } catch (error) {
        return await internalServerError(request, response, error);
    };
};

async function SignOutUser(request, response) {
    try {
        const cookies = request.cookies;
        if (!cookies?.jwt) {
            return notFoundError(request, response, { message: "jwt not found" });
        };
        await deleteRefreshToken(cookies?.jwt);
        await response.clearCookie("jwt");
        return await response.status(200).json({status: "success"});
    } catch (error) {
        return await internalServerError(request, response, error);
    };
};

async function RefreshAccessToken(request, response) {
    try {
        const cookies = request.cookies;
        if (!cookies?.jwt) {
            return await notFoundError(request, response, { message: "jwt not found" });
        };
        const user = await verifyRefreshToken(cookies?.jwt);
        if (!user.email) {
            return await internalServerError(request, response, { message: "user email not recieved after decoding the refresh token" });
        };
        const access_token = generateAccessToken(user);
        if (!access_token) {
            return await internalServerError(request, response, { message: "access_token was not created" });
        };
        return response.status(200).json({status: "succes", access_token});
    } catch (error) {
        return await internalServerError(request, response, error);
    };
};

module.exports = {
    RegisterUser,
    SignInUser,
    SignOutUser,
    RefreshAccessToken
};