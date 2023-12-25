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

// directory path for saving processed images
const dir_path = path.join(__dirname, "../../processedUploads");
if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path, { recursive: true });
};

async function saveToDatabase(uid, file, file_name) {
    return await pool.query('INSERT INTO IMAGES (UID, ORIGINAL_FILE_URL, PROCESSED_FILE_URL) VALUES ($1, $2, $3) RETURNING *', [uid, `${process.env.BASE_RAW_FILE_URL}/${file.path}`, `${process.env.BASE_PROCESSED_FILE_URL}/${file_name}`]);
};

async function PNG_Converter({ uid, file }) {
    try {
        const image = sharp(file.path).png();
        const file_name = `${file.originalname.split('.')[0]}.${image.options.formatOut}`;
        await image.toFile(path.join(dir_path, file_name));
        const savedInDatabase = await saveToDatabase(uid, file, file_name);
        if (savedInDatabase.rows < 1) {
            throw new Error("error saving to database");
        };
        return savedInDatabase.rows[0];
    } catch (error) {
        throw new Error(error);
    };
};

async function JPG_Converter({ uid, file }) {
    try {
        const image = sharp(file.path).jpeg();
        const file_name = `${file.originalname.split('.')[0]}.${image.options.formatOut}`;
        await image.toFile(path.join(dir_path, file_name));
        const savedInDatabase = await saveToDatabase(uid, file, file_name);
        if (savedInDatabase.rows < 1) {
            throw new Error("error saving to database");
        };
        return savedInDatabase.rows[0];
    } catch (error) {
        throw new Error(error);
    };
};

async function WEBP_Converter({ uid, file }) {
    try {
        const image = sharp(file.path).webp();
        const file_name = `${file.originalname.split('.')[0]}.${image.options.formatOut}`;
        await image.toFile(path.join(dir_path, file_name));
        const savedInDatabase = await saveToDatabase(uid, file, file_name);
        if (savedInDatabase.rows < 1) {
            throw new Error("error saving to database");
        };
        return savedInDatabase.rows[0];
    } catch (error) {
        throw new Error(error);
    };
};

async function GIF_Converter({uid, file}) {
    try {
        const image = sharp(file.path, {animated: true}).gif();
        const file_name = `${file.originalname.split('.')[0]}.${image.options.formatOut}`;
        await image.toFile(path.join(dir_path, file_name));
        const savedInDatabase = await saveToDatabase(uid, file, file_name);
        if (savedInDatabase.rows < 1) {
            throw new Error("error saving to database");
        };
        return savedInDatabase.rows[0];
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