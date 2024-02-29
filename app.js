require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const wikiRouter = require("./routes/wikiRoute");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");

const app = express();
app.use(bodyParser.json());

// Development logging
app.use(morgan("dev"));

// Routes
app.use("/api/v1/wiki", wikiRouter);
app.use("/api/v1/user", userRouter);

// Handling unhandled routes
// For all http methods
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);


// Server
module.exports = app;