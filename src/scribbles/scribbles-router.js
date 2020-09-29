const path = require('path');
const express = require('express');
const ScribbleService = require('./scribbles-service');
const { requireAuth } = require('../middleware/jwt-auth');

const scribbleRouter = express.Router();
const jsonBodyParser = express.json();


scribbleRouter
  .route('/')
  .get((req, res, next) => { // GETS list of all scribbles, used for testing purpose
    ScribbleService.getAllScribbles(req.app.get('db'))
      .then(scribbles => {
        res.json(ScribbleService.serializeScribbles(scribbles));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => { //POST a scribble by getting the type, content, scribe ID, and user ID it belongs too
    const { scribble_type, scribble_content, scribe_id, user_id } = req.body;
    const newScribble = { scribble_type, scribble_content, scribe_id, user_id };

    for (const [key, value] of Object.entries(newScribble))
      // eslint-disable-next-line eqeqeq
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    ScribbleService.insertScribble(req.app.get('db'), newScribble)
      .then(scribble => {
        res.status(201)
          .location(path.posix.join(req.originalUrl, `/${scribble.id}`))
          .json(ScribbleService.serializeScribble(scribble));
      })
      .catch(next);
  });

// GETS scribbles for the scribe based on ID, used to look up previous scribes
// and scribbles
scribbleRouter
  .route('/for_scribe/:scribe_id')
  .all(requireAuth)
  .all((req, res, next) => {
    ScribbleService.getScribblesForScribe(
      req.app.get('db'),
      req.params.scribe_id    )
      .then(scribbles => {
        if (!scribbles) {
          return res.status(404).json({
            error: { message: 'Scribbles don\'t exist' }
          });
        }
        res.scribbles = scribbles;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(res.scribbles.map(scribble => ScribbleService.serializeScribble(scribble)));
  });

// Used to interact with individual scribbles (basic CRUD operations)
scribbleRouter
  .route('/:scribble_id')
  .all(requireAuth)
  .all((req, res, next) => {
    ScribbleService.getById(
      req.app.get('db'),
      req.params.scribble_id
    )
      .then(scribble => {
        if (!scribble) {
          return res.status(404).json({
            error: { message: 'Scribble doesn\'t exist' }
          });
        }
        res.scribble = scribble;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(ScribbleService.serializeScribble(res.scribble));
  })
  .delete((req, res, next) => {
    ScribbleService.deleteScribble(
      req.app.get('db'),
      req.params.scribble_id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { scribble_content } = req.body;
    const scribbleToUpdate = { scribble_content };

    const numberOfValues = Object.values(scribbleToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: 'Request body must contain \'content\''
        }
      });
    }

    scribbleToUpdate.time_created = new Date();

    ScribbleService.updateScribble(
      req.app.get('db'),
      req.params.scribble_id,
      scribbleToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = scribbleRouter;