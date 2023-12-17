// 3rd party libraries
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet  = require("helmet");

// custom files imports
const corsOptions = require("./config/cors.config");
const errorHandler = require("./utils/errorHandler.middleware");

// expressjs initialization
const app = express();


// middlewares
app.use(cors(corsOptions));
app.use(helmet());

// routes

// error handler
app.use(errorHandler);

// listening to the server
app.listen(3000, () => {
    console.log(`server running at http://localhost:3000`);
});