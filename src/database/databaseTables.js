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
    return;    
};

async function createProcessedImagesTable(){
    return;
};

module.exports = {
    createUsersTable,
    createRefreshTokenTable,
    createImagesTables,
    createProcessedImagesTable
};