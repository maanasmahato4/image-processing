// 3rd party libraries
const express = require("express");

// custom imports
const {
    RegisterUser,
    SignInUser,
    SignOutUser,
    RefreshAccessToken
} = require("../controllers/authentication.controller");

const {
    convertToPNG,
    convertToJPG,
    convertToWEBP,
    convertToGIF
} = require("../controllers/image_processing.controller");

const verifyJWT = require("../middlewares/verify_jwt.middleware");

const allowedMimeTypes = require("../middlewares/allowed_mimetypes.middlware");
const uploadToStorage = require("../middlewares/file_upload.middleware");


// routes
const router = express.Router();

// authentication routes
router
    .post("/auth/register", RegisterUser)
    .post("/auth/signin", SignInUser)
    .post("/auth/signout", verifyJWT, SignOutUser)
    .post("/auth/refresh", RefreshAccessToken);

router
    .post("/image/png", allowedMimeTypes(['.png', '.jpg', '.jpeg', '.webp']), uploadToStorage.single('image'), convertToPNG)
    .post("/image/jpg", allowedMimeTypes(['.png', '.jpg', '.jpeg', '.webp']), uploadToStorage.single('image'), convertToJPG)
    .post("/image/webp", allowedMimeTypes(['.png', '.jpg', '.jpeg', '.webp']), uploadToStorage.single('image'), convertToWEBP)
    .post("/image/gif", allowedMimeTypes(['.png', '.jpg', '.jpeg', '.webp']), uploadToStorage.single('image'), convertToGIF)


module.exports = router;