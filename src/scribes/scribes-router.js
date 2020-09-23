const path = require('path');
const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const ScribeService = require('./scribes-service');

const scribeRouter = express.Router();
const jsonParser = express.json();


scribeRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    ScribeService.getScribesByUserId(
      req.app.get('db'),
      req.user.id)
      .then(scribes => {
        res.json(ScribeService.serializeScribes(scribes));
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
          .json(ScribeService.serializeScribe(scribe));
      })
      .catch(next);
  });
  
scribeRouter
  .route('/scribbles/')
  .all(requireAuth)
  .get((req, res, next) => {
    ScribeService.getScribeScribbles(
      req.app.get('db'),
      req.user.id
    )
      .then(scribbles => {
        res.json(scribbles.map(ScribeService.serializeScribeScribble));
      })
      .catch(next);
  });

scribeRouter
  .route('/currentScribe')
  .all(requireAuth)
  .get((req, res, next) => {
    ScribeService.getCurrentScribe(
      req.app.get('db'),
      req.user.id
    )
      .then(scribe => {
        res.json(ScribeService.serializeScribe(scribe));
      })
      .catch(next);
  });



module.exports = scribeRouter;