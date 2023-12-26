const fs = require("fs");
const path = require("path");

// paths
const raw_uploads_path = path.join(__dirname, "../../uploads");
const processed_uploads_path = path.join(__dirname, "../../processedUploads");

async function deleteFilesInUploadsDirectory() {
    let files = await fs.promises.readdir(raw_uploads_path);
    if (files.length >= 1) {
        let filePaths = files.map(file => path.join(raw_uploads_path, file));
        for (let file in filePaths) {
            await fs.promises.unlink(filePaths[file]);
        };
        console.log("files deleted from uploads");
    };
};

async function deleteFilesInProcessedUploadsDirectory() {
    let files = await fs.promises.readdir(processed_uploads_path);
    if (files.length >= 1) {
        let filePaths = files.map(file => path.join(processed_uploads_path, file));
        for (let file in filePaths) {
            await fs.promises.unlink(filePaths[file]);
        };
        console.log("files deleted from processed uploads");
    };
};

module.exports = {
    deleteFilesInUploadsDirectory,
    deleteFilesInProcessedUploadsDirectory
};