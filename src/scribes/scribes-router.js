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
  })
  .post(jsonParser, (req, res, next) => {
    const { user_id } = req.body;
    const newScribe = { user_id };

    for (const [key, value] of Object.entries(newScribe))
      // eslint-disable-next-line eqeqeq
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });


    ScribeService.insertScribe(req.app.get('db'), newScribe)
      .then(scribe => {
        res.status(201)
          .location(path.posix.join(req.originalUrl, `/${scribe.id}`))
          .json(serializeScribe(scribe));
      })
      .catch(next);
  });

scribeRouter
  .route('/:scribe_id')
  .all((req, res, next) => {
    ScribeService.getById(
      req.app.get('db'),
      req.params.scribe_id
    )
      .then(scribe => {
        if (!scribe) {
          return res.status(404).json({
            error: { message: 'Scribe doesn\'t exist'}
          });
        }
        res.scribe = scribe;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeScribe(res.scribe));
  });

module.exports = scribeRouter;