// 3rd party libraries
const { rateLimit } = require("express-rate-limit");

/*
 * @param {number} interval in milliseconds
 * @param {number} limit per interval
 * @returns {function} rate limiter function
 */
function rateLimiter(interval, limit) {
    return rateLimit({
        windowMs: interval != null ? interval : 60 * 1000,
        limit: limit != null ? limit : 100,
        standardHeaders: true,
        legacyHeaders: false
    });
};

module.exports = rateLimiter;