// 3rd party libraries
const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
    try {
        const access_token = jwt.sign(
            // user credentials to be stored in the token
            {
                username: user.email.split('@')[0],
                email: user.email
            },
            // access token secret
            process.env.ACCESS_TOKEN_SECRET,
            // access_token expirey time
            {
                expiresIn: '1d'
            }
        );

        return access_token;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    };
};

function generateRefreshToken(user) {
    try {
        const refresh_token = jwt.sign(
            // users creds to be stored in the token
            {
                username: user.email.split('@')[0],
                email: user.email
            },
            // refresh_token secret
            process.env.REFRESH_TOKEN_SECRET,
            // refresh_token expirey time
            {
                expiresIn: '1d'
            }
        );
        return refresh_token;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    };
};

async function verifyAccessToken(access_token) {
    return jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            throw new Error(err);
        };
        return decoded; // returns the user credentials
    });
};

async function verifyRefreshToken(refresh_token) {
    return jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err){
            throw new Error(err);
        };
        return decoded; // return  the user credentials
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};