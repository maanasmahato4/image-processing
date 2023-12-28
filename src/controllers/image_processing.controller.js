// custom imports
const {
    internalServerError
} = require("../shared/errors/errorFunctions");

const {
    PNG_Converter,
    JPG_Converter,
    WEBP_Converter,
    GIF_Converter
} = require("../services/image_convert.service");

async function convertToPNG(request, response) {
    try {
        const urls = await PNG_Converter({ file: request.file });
        return response.status(200).json({ success: true, urls });
    } catch (error) {
        return internalServerError(request, response, error);
    };
};

async function convertToJPG(request, response) {
    try {
        const urls = await JPG_Converter({ file: request.file });
        return response.status(200).json({ success: true, urls });
    } catch (error) {
        return internalServerError(request, response, error);
    };
};

async function convertToWEBP(request, response) {
    try {
        const urls = await WEBP_Converter({ file: request.file });
        return response.status(200).json({ success: true, urls });
    } catch (error) {
        return internalServerError(request, response, error);
    };
};

async function convertToGIF(request, response) {
    try {
        const urls = await GIF_Converter({ file: request.file });
        return response.status(200).json({ success: true, urls });
    } catch (error) {
        return internalServerError(request, response, error);
    };
};



module.exports = {
    convertToPNG,
    convertToJPG,
    convertToWEBP,
    convertToGIF
};