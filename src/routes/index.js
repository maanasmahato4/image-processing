// 3rd party libraries
const express = require("express");

// custom imports
const {
    convertToPNG,
    convertToJPG,
    convertToWEBP,
    convertToGIF
} = require("../controllers/image_processing.controller");

const allowedMimeTypes = require("../middlewares/allowed_mimetypes.middlware");
const uploadToStorage = require("../middlewares/file_upload.middleware");


// routes
const router = express.Router();

// authentication routes

router
    .post("/convert/png", allowedMimeTypes(['.png', '.jpg', '.jpeg', '.webp']), uploadToStorage.single('image'), convertToPNG)
    .post("/convert/jpg", allowedMimeTypes(['.png', '.jpg', '.jpeg', '.webp']), uploadToStorage.single('image'), convertToJPG)
    .post("/convert/webp", allowedMimeTypes(['.png', '.jpg', '.jpeg', '.webp']), uploadToStorage.single('image'), convertToWEBP)
    .post("/convert/gif", allowedMimeTypes(['.png', '.jpg', '.jpeg', '.webp']), uploadToStorage.single('image'), convertToGIF);


module.exports = router;