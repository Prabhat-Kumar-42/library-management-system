require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  unknownEndpoint,
  mongoError,
  jwtError,
  errorHandler,
} = require("./middlewares/errorHandlers.middleware");

//Routes

// Error Handler
app.use(unknownEndpoint);
app.use(mongoError);
app.use(jwtError);
app.use(errorHandler);

module.exports = {
  app,
};
