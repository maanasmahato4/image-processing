// built-in modules
const path = require("path");

// 3rd party libraries
const multer = require("multer");


function rawFileStorage(){
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "./uploads");
        },
        filename: (req, file, callback) => {
            const uniqueFileName = `${new Date.now()}-${Math.random() * 1000000}-${file.filename}`;
            callback(null, uniqueFileName);
        }
    })
}

function fileFilter(req, file, callback){
    const fileTypes = req.locals.fileTypes;
    const extName = path.extname(file.originalname);
    const match = fileTypes.test(extName);
    if(!match){
        callback(new Error("file not supported"));
    };
    callback(null, true);
};

function uploadToStorage(){
    return multer({
        storage: rawFileStorage,
        fileFilter: fileFilter
    });
};

module.exports = uploadToStorage;