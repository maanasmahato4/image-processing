const pool = require("./database");

async function databaseConnectionCheck(){
    try {
        const clientConnection = await pool.connect();
        const currentTime = await clientConnection.query('SELECT NOW() AS CURRENT_TIME');
        clientConnection.release();
        console.log(`${currentTime.rows[0].current_time}: database connected`);
        return true;
    } catch (error) {
        console.log(error.message);
    };
};

module.exports = databaseConnectionCheck;