const AppError = require("./../utils/appError")

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}. `
    return  new AppError(message, 400)
}

const handleDuplicateFieldDB = err => {
  const value = err.keyValue.title
  console.log(value)
  const message = `Duplicate field value: ${value}. Please use another value`
  return new AppError(message, 404)
}

const handleValidationErrorDB = (err) => {
  const errorMessages = Object.values(err.errors).map(el => el.message)
  console.log(errorMessages)
  const message = `Invalid input data. ${errorMessages.join(". ")}`
  return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
}

const sendErrorProd = (err, res) => {
  //  Operational error, trusted error: send message to client
  if (err.isOperational) {
     res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went really wrong!",
    });
  }
}

module.exports = (err, req, res, next) => {
  // err from || 500
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // res.status(err.statusCode).json({
  //   status: err.statusCode,
  //   message: err
  // })
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = {...err}
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if(err.code === 11000) error = handleDuplicateFieldDB(error)
    if (err.name === "ValidationError") error = handleValidationErrorDB(error)

    sendErrorProd(error, res);
  }
};
