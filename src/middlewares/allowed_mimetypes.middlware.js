function allowedMimeTypes(mimetypes){
    return (request, response, next) => {
        if(!request.locals){
            request.locals = {};
        };
        request.locals.fileTypes = mimetypes;
        next();
    };
};


module.exports = allowedMimeTypes;