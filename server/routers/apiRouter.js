const express = require('express');
const path = require('path');

//middleware for api requests
const apiController = require(path.resolve(__dirname, '../controllers/apiController'));

const apiRouter = express.Router();

apiRouter.post('/signup', apiController.signupUser, (req, res) => {
  return res.status(200).set('Content-Type', 'application/json').json(res.locals.registered);
});

apiRouter.get('/signin', apiController.signinUser, (req, res) => {
  return res.status(200).set('Content-Type', 'application/json').json(res.locals.signinRes);
});

apiRouter.get('/getNotes/:user_id', apiController.getUserNotes, (req, res) => {
  return res.status(200).set('Content-Type', 'application/json').json(res.locals.retrievedNotes);
});

apiRouter.post('/postNote', apiController.postUserNote, (req, res) => {
  return res.status(200).set('Content-Type', 'application/json').json(res.locals.postedNote);
});

module.exports = apiRouter;
