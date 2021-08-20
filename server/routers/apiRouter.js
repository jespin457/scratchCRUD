const express = require('express');
const path = require('path');

//middleware for api requests
const apiController = require(path.resolve(__dirname, '../controllers/apiController'));

const apiRouter = express.Router();

module.exports = apiRouter;
