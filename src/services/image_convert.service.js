// built-in modules
const path = require("path");
const fs = require("fs");

// 3rd party libraries
const sharp = require("sharp");

// custom imports
const pool = require("../database/database");
const {
    uploadToCloudinary,
    deleteFromCloudinary
} = require("./cloudinary.service");

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

async function saveToDatabase(uid, org_public_id, pro_public_id, original_image_secure_url, processed_image_secure_url) {
    return await pool.query('INSERT INTO IMAGES (UID, ORG_PUBLIC_ID, PRO_PUBLIC_ID, ORIGINAL_FILE_URL, PROCESSED_FILE_URL) VALUES ($1, $2, $3, $4, $5) RETURNING *', [uid, org_public_id, pro_public_id, original_image_secure_url, processed_image_secure_url]);
};

async function deleteFromDatabase(collection) {
    try {
        const { id, uid, org_public_id, pro_public_id, original_image_secure_url, processed_image_secure_url } = collection;
        const delete_original_image = await deleteFromCloudinary(org_public_id);
        const delete_processed_image = await deleteFromCloudinary(pro_public_id);
        const [deleted_org, deleted_pro] = await Promise.all([delete_original_image, delete_processed_image]);
        if (!deleted_org || !deleted_pro) {
            throw new Error("error deleting images from cloudinary");
        };
        const deletedFromDatabase = await pool.query('DELETE FROM IMAGES WHERE ID=$1', [id]);
        if (!deletedFromDatabase) {
            throw new Error("error deleting collection from the database");
        };
    } catch (error) {
        throw new Error(error);
    };
};

async function PNG_Converter({ uid, file }) {
    try {
        const image = sharp(file.path).png();
        const file_name = `${file.originalname.split('.')[0]}.${image.options.formatOut}`;
        await image.toFile(path.join(dir_path, file_name));

        const processed_image_path = path.join(dir_path, file_name);
        const saveOriginalImage = await uploadToCloudinary({
            file_path: file.path,
            folder: "original_images"
        });
        const saveProcessedImage = await uploadToCloudinary({
            file_path: processed_image_path,
            folder: "processed_images/webp_files"
        });
        const [original_image, processed_image] = await Promise.all([saveOriginalImage, saveProcessedImage]);
        if (!original_image || !processed_image) {
            throw new Error("error uploading image in the cloudinary");
        }
        const savedInDatabase = await saveToDatabase(uid, original_image.public_id, processed_image.public_id, original_image.secure_url, processed_image.secure_url);
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

        const processed_image_path = path.join(dir_path, file_name);
        const saveOriginalImage = await uploadToCloudinary({
            file_path: file.path,
            folder: "original_images"
        });
        const saveProcessedImage = await uploadToCloudinary({
            file_path: processed_image_path,
            folder: "processed_images/webp_files"
        });
        const [original_image, processed_image] = await Promise.all([saveOriginalImage, saveProcessedImage]);
        if (!original_image || !processed_image) {
            throw new Error("error uploading image in the cloudinary");
        }
        const savedInDatabase = await saveToDatabase(uid, original_image.public_id, processed_image.public_id, original_image.secure_url, processed_image.secure_url);
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

        const processed_image_path = path.join(dir_path, file_name);
        const saveOriginalImage = await uploadToCloudinary({
            file_path: file.path,
            folder: "original_images"
        });
        const saveProcessedImage = await uploadToCloudinary({
            file_path: processed_image_path,
            folder: "processed_images/webp_files"
        });
        const [original_image, processed_image] = await Promise.all([saveOriginalImage, saveProcessedImage]);
        if (!original_image || !processed_image) {
            throw new Error("error uploading image in the cloudinary");
        }
        const savedInDatabase = await saveToDatabase(uid, original_image.public_id, processed_image.public_id, original_image.secure_url, processed_image.secure_url);
        if (savedInDatabase.rows < 1) {
            throw new Error("error saving to database");
        };
        return savedInDatabase.rows[0];
    } catch (error) {
        throw new Error(error);
    };
};

async function GIF_Converter({ uid, file }) {
    try {
        const image = sharp(file.path, { animated: true }).gif();
        const file_name = `${file.originalname.split('.')[0]}.${image.options.formatOut}`;
        await image.toFile(path.join(dir_path, file_name));

        const processed_image_path = path.join(dir_path, file_name);
        const saveOriginalImage = await uploadToCloudinary({
            file_path: file.path,
            folder: "original_images"
        });
        const saveProcessedImage = await uploadToCloudinary({
            file_path: processed_image_path,
            folder: "processed_images/webp_files"
        });
        const [original_image, processed_image] = await Promise.all([saveOriginalImage, saveProcessedImage]);
        if (!original_image || !processed_image) {
            throw new Error("error uploading image in the cloudinary");
        }
        const savedInDatabase = await saveToDatabase(uid, original_image.public_id, processed_image.public_id, original_image.secure_url, processed_image.secure_url);
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
    GIF_Converter,
    deleteFromDatabase
};