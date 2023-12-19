// create tables if not exists in the database

// 3rd party libraries
const pool = require("../database/database");

async function createUsersTable(){
    return await pool.query('CREATE TABLE IF NOT EXISTS USERS (USERNAME VARCHAR(255), EMAIL VARCHAR(255), PASSWORD TEXT)');
};

module.exports = {
    createUsersTable
};