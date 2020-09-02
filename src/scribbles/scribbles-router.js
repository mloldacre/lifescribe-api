const path = require('path');
const express = require('express');
const ScribbleService = require('./scribbles-service');

const scribbleRouter = express.Router();
const jsonParser = express.json();


scribbleRouter
  .route('/')
  .get((req, res, next) => {
    ScribbleService.getAllScribbles(req.app.get('db'))
      .then(scribbles => {
        res.json(ScribbleService.serializeScribbles(scribbles));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { scribble_type, scribble_content } = req.body;
    const newScribble = { scribble_type, scribble_content };

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

scribbleRouter
  .route('/:scribble_id')
  .all((req, res, next) => {
    ScribbleService.getById(
      req.app.get('db'),
      req.params.scribe_id
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
  .get((req, res, next) => {
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
  });

module.exports = scribbleRouter;