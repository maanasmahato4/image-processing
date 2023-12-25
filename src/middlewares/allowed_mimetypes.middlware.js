function allowedMimeTypes(mimetypes){
    return (request, response, next) => {
        request.locals.fileTypes = mimetypes;
        next();
    };
};


module.exports = allowedMimeTypes;