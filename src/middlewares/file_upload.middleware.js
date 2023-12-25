// built-in modules
const path = require("path");
const fs = require("fs");

// 3rd party libraries
const multer = require("multer");

// create uploads folder if not exists
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
};

const rawFileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        const uniqueFileName = `${Date.now()}-${Math.random() * 1000000}-${file.originalname}`;
        callback(null, uniqueFileName);
    }
});

function fileFilter(req, file, callback) {
    const fileTypes = [...req.locals.fileTypes];
    const extName = path.extname(file.originalname);
    const match = fileTypes.includes(extName);
    if (!match) {
        callback(new Error("file not supported"));
    };
    callback(null, true);
};

const uploadToStorage = multer({
    storage: rawFileStorage,
    fileFilter
});

module.exports = uploadToStorage;