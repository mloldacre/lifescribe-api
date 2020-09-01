const path = require('path');
const express = require('express');
const ScribeService = require('./scribes-service');

const scribeRouter = express.Router();
const jsonParser = express.json();

const serializeScribe = scribe => ({
  id: scribe.id,
  date_created: scribe.date_created,
  user_id: scribe.user_id
});

scribeRouter
  .route('/')
  .get((req, res, next) => {
    ScribeService.getAllScribes(req.app.get('db'))
      .then(scribes => {
        res.json(scribes.map(serializeScribe));
      })
      .catch(next);
  });
  
module.exports = scribeRouter;