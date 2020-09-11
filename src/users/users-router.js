const express = require('express');
const UsersService = require('./users-service');
const path = require('path');
const { requireAuth } = require('../middleware/jwt-auth');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { first_name, last_name, email, password, user_name } = req.body;

    for (const field of [
      'first_name',
      'last_name',
      'email',
      'user_name',
      'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    const passwordError = UsersService.validatePassword(password);

    if (passwordError)
      return res.status(400).json({ error: passwordError });

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      user_name
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: 'Username already taken' });
        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              first_name,
              last_name,
              email,
              password: hashedPassword,
              user_name
            };

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              });
          });

      }).catch(next);
  });

usersRouter
  .route('/:user_id')
  .all(requireAuth)
  .all((req, res, next) => {
    UsersService.getById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: { message: 'user doesn\'t exist' }
          });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { first_name, last_name, user_name, email, password } = req.body;
    const updatedUserProfile = { first_name, last_name, user_name, email, password };

    const numberOfValues = Object.values(updatedUserProfile).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: 'Request body must contain \'content\''
        }
      });
    }

    updatedUserProfile.date_modified = new Date();

    UsersService.updateUser(
      req.app.get('db'),
      req.params.user_id,
      updatedUserProfile
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);

  });

module.exports = usersRouter;