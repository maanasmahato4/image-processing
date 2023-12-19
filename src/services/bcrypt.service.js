// 3rd party libraries
const bcrypt = require("bcrypt");

async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    };
};

async function comparePassword(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    };
};

module.exports = {
    hashPassword,
    comparePassword
};