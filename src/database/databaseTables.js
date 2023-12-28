// create tables if not exists in the database

// 3rd party libraries
const pool = require("../database/database");

async function createImagesTables(){
    return await pool.query('CREATE TABLE IF NOT EXISTS IMAGES (ID SERIAL PRIMARY KEY, ORIGINAL_FILE_URL TEXT, PROCESSED_FILE_URL TEXT)');   
};

module.exports = {
    createImagesTables
};