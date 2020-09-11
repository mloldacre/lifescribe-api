/* eslint-disable eqeqeq */
const express = require('express');
const AuthService = require('./auth-service');
const ScribeService = require('.././scribes/scribes-service');
const path = require('path');

const authRouter = express.Router();
const jsonBodyParser = express.json();


authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { user_name, password } = req.body;
    const loginUser = { user_name, password };

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    AuthService.getUserWithUserName(
      req.app.get('db'),
      loginUser.user_name
    )
      .then(dbUser => {
        if (!dbUser)
          return res.status(400).json({
            error: 'Incorrect username or password',
          });
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            if (!compareMatch)
              return res.status(400).json({
                error: 'Incorrect username or password',
              });
            const sub = dbUser.user_name;
            const payload = { user_id: dbUser.id };
            
            ScribeService.getByDate(req.app.get('db'), dbUser.id)
              .then(scribe => {
                if (!scribe) {
                  const newScribe = { user_id: dbUser.id };
                  ScribeService.insertScribe(req.app.get('db'), newScribe)
                    .then(scribe => {
                      res.status(201)
                        .location(path.posix.join(req.originalUrl, `/${scribe.id}`))
                        .json(ScribeService.serializeScribe(scribe));
                    })
                    .catch(next);
                }
              });
            res.send({
              authToken: AuthService.createJwt(sub, payload),
            });
          });
      })
      .catch(next);
  });

module.exports = authRouter;
