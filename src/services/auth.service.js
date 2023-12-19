// 3rd party libraries


// custom file imports
const pool = require("../database/database");
const {
    hashPassword,
    comparePassword
} = require("./bcrypt.service");

async function addUser(user) {
    let newUser = { ...user };
    try {
        newUser.password = hashPassword(user.password);
        const savedUser = await pool.query('INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES ($1, $2, $3) RETURNING *', [newUser.email.split('@')[0], newUser.email, newUser.password]);
        if (!savedUser.rows[0]) {
            throw new Error('user was not saved in the database');
        };
        return savedUser.rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    };
};

async function userExists(user) {
    try {
        const userExists = await pool.query('SELECT EMAIL FROM USERS WHERE EMAIL=$1', [user.email]);
        if (userExists.rows[0].email === user.email) {
            return userExists.rows[0];
        } else {
            return false;
        };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    };
};

async function verifyUser(user) {
    try {
        const existingUser = await userExists(user);
        if (!existingUser) {
            throw new Error("user does not exist");
        }
        const verifyPassword = await comparePassword(user.password, existingUser.password);
        if (!verifyPassword) {
            throw new Error("wrong credentials");
        }
        return existingUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    };
};

async function saveRefreshToken(refresh_token) {
    try {
        const savedRefreshTokenToDatabase = await pool.query('INSERT INTO REFRESH_TOKENS (REFRESH_TOKEN) VALUES ($1) RETURNING *', [refresh_token]);
        if (savedRefreshTokenToDatabase.rows[0].refresh_token !== refresh_token) {
            throw new Error("refresh token could not be saved in the database");
        };
        return savedRefreshTokenToDatabase.rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    };
};

async function deleteRefreshToken(refresh_token) {
    try {
        const tokenDeleted = await pool.query('DELETE FROM REFRESH_TOKENS WHERE REFRESH_TOKEN=$1', [refresh_token]);
        if (!tokenDeleted) {
            throw new Error("token was not removed");
        }
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    };
};

module.exports = {
    addUser,
    userExists,
    saveRefreshToken,
    verifyUser,
    deleteRefreshToken
};