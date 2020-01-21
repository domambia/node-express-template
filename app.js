const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// MIDDLEWARE
// Include Data on req.body
app.use(express.json());

// All ROUTES

// NOT EXISTING ROUTES ERROR HANDLER
app.all("*", (req, res, next) => {
    const statusCode = 404;
    const message = `Can't find the ${req.originalUrl} on this application`;
    next(new AppError(message, statusCode));
});

module.exports = app;