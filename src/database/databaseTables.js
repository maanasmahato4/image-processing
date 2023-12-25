// create tables if not exists in the database

// 3rd party libraries
const pool = require("../database/database");

async function createUsersTable() {
    return await pool.query('CREATE TABLE IF NOT EXISTS USERS (ID SERIAL PRIMARY KEY, USERNAME VARCHAR(255), EMAIL VARCHAR(255), PASSWORD TEXT)');
};

async function createRefreshTokenTable() {
    return await pool.query('CREATE TABLE IF NOT EXISTS REFRESH_TOKENS (ID SERIAL PRIMARY KEY, UID INT, REFRESH_TOKEN TEXT)');
};

async function createImagesTables(){
    return await pool.query('CREATE TABLE IF NOT EXISTS IMAGES (ID SERIAL PRIMARY KEY, UID INT, ORIGINAL_FILE_URL TEXT, PROCESSED_FILE_URL TEXT)');   
};

module.exports = {
    createUsersTable,
    createRefreshTokenTable,
    createImagesTables,
};