// 3rd party libraries


// custom imports
const pool = require("../database/database");

const {
    addUser,
    userExists
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
        const savedRefreshTokenToDatabase = await pool.query('INSERT INTO REFRESH_TOKENS (REFRESH_TOKEN) VALUES ($1) RETURNING *', [refresh_token]);
        if (savedRefreshTokenToDatabase.rows[0].refresh_token !== refresh_token) {
            return internalServerError(response, "error saving refresh token to the database");
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