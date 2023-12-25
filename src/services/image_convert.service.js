// built-in modules
const path = require("path");
const fs = require("fs");

// 3rd party libraries
const sharp = require("sharp");

// custom imports
const pool = require("../database/database");

// create folder if not exists
const outPutDir = path.join(__dirname, "../../processedUploads");
if (!fs.existsSync(outPutDir)) {
    fs.mkdirSync(outPutDir);
};

async function PNG_Converter({ uid, file }) {
    try {
        const dir_path = path.join(__dirname, "../../processedUploads");
        if (!fs.existsSync(dir_path)) {
            await fs.promises.mkdir(dir_path, { recursive: true });
        }
        const image = sharp(file.path).png();
        const file_name = `${file.originalname.split('.')[0]}.${image.options.formatOut}`;
        await image.toFile(path.join(dir_path, file_name));
        const savedToDatabase = await pool.query('INSERT INTO IMAGES (UID, ORIGINAL_FILE_URL, PROCESSED_FILE_URL) VALUES ($1, $2, $3) RETURNING *', [uid, `${process.env.BASE_RAW_FILE_URL}/${file.path}`, `${process.env.BASE_PROCESSED_FILE_URL}/${file_name}`]);
        if(savedToDatabase.rows < 1){
            throw new Error("error saving to database");
        };
        return savedToDatabase.rows[0];
    } catch (error) {
        throw new Error(error);
    };
};

async function JPG_Converter(file) {
    try {

    } catch (error) {
        throw new Error(error);
    };
};

async function WEBP_Converter(file) {
    try {

    } catch (error) {
        throw new Error(error);
    };
};

async function GIF_Converter(file) {
    try {

    } catch (error) {
        throw new Error(error);
    };
};

module.exports = {
    PNG_Converter,
    JPG_Converter,
    WEBP_Converter,
    GIF_Converter
};