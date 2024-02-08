require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");


const app = express();
app.use(bodyParser.json());

// Development logging
app.use(morgan("dev"));


// Server
module.exports = app;