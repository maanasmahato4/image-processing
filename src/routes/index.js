// 3rd party libraries
const express = require("express");

// custom imports
const {
    RegisterUser,
    SignInUser,
    SignOutUser,
    RefreshAccessToken
} = require("../controllers/authentication.controller");

// routes
const router = express.Router();

// authentication routes
router
    .post("/auth/register", RegisterUser)
    .post("/auth/signin", SignInUser)
    .post("/auth/signout", SignOutUser)
    .post("/auth/refresh", RefreshAccessToken)



module.exports = router;