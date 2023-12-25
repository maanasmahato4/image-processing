// 3rd party libraries
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// custom files imports
const corsOptions = require("./config/cors.config");
const errorHandler = require("./utils/errorHandler");
const databaseConnection = require("./database/database.connection");
const { createUsersTable, createRefreshTokenTable, createImagesTables } = require("./database/databaseTables");

// expressjs initialization
const app = express();

// database connection
databaseConnection();
createRefreshTokenTable();
createUsersTable();
createImagesTables();


// middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/uploads", express.static("./uploads"));
app.use("/processed_uploads", express.static("./processedUploads"));
app.use("/api", require("./routes/index"));

// error handler
app.use(errorHandler);

// listening to the server
app.listen(3000, () => {
    console.log(`server running at http://localhost:3000`);
});