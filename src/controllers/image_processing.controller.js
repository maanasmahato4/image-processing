// custom imports
const {
    internalServerError, badRequestError,
} = require("../shared/errors/errorFunctions");

const {
    PNG_Converter,
    JPG_Converter,
    WEBP_Converter,
    GIF_Converter,
    deleteFromDatabase,
    downloadImage
} = require("../services/image_convert.service");

async function convertToPNG(request, response) {
    try {
        const urls = await PNG_Converter({ uid: request.user?.id, file: request.file });
        return response.status(200).json({ success: true, urls });
    } catch (error) {
        return internalServerError(request, response, error);
    };
};

async function convertToJPG(request, response) {
    try {
        const urls = await JPG_Converter({ uid: request.user?.id, file: request.file });
        return response.status(200).json({ success: true, urls });
    } catch (error) {
        return internalServerError(request, response, error);
    };
};

async function convertToWEBP(request, response) {
    try {
        const urls = await WEBP_Converter({ uid: request.user?.id, file: request.file });
        return response.status(200).json({ success: true, urls });
    } catch (error) {
        return internalServerError(request, response, error);
    };
};

async function convertToGIF(request, response) {
    try {
        const urls = await GIF_Converter({ uid: request.user?.id, file: request.file });
        return response.status(200).json({ success: true, urls });
    } catch (error) {
        return internalServerError(request, response, error);
    };
};

async function deleteImage(request, response) {
    try {
        const collection = request.body;
        const deleted = await deleteFromDatabase(collection);
        if (!deleted) {
            return badRequestError(request, response, "image was not deleted");
        };
        return response.sendStatus(200);
    } catch (error) {
        return internalServerError(request, response, error);
    }
}

async function downloadFile(request, response) {
    try {
        const [publicId] = request.params;
        console.log(publicId);
        const url = await downloadImage(publicId);
        response.redirect(url);
    } catch (error) {
        return internalServerError(request, response, error);
    }
}

module.exports = {
    convertToPNG,
    convertToJPG,
    convertToWEBP,
    convertToGIF,
    deleteImage,
    downloadFile
};