const cloudinary = require("../config/cloudinary.config");

async function uploadToCloudinary({ file_path, folder }) {
    try {
        return await cloudinary.uploader.upload(file_path, { folder });
    } catch (error) {
        throw new Error(error);
    };
};

async function deleteFromCloudinary(public_id){
    try {
        return await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        throw new Error(error);
    };
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
};