const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');


const AuthService = {
  getUserWithUserName(db, user_name) {
    return db('lifescribe_users')
      .where({ user_name })
      .first();
  },

  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },

  createJwt(subject, payload) {
    return jwt.sign(payload, config.API_TOKEN, {
      subject,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256',
    });
  },

  verifyJwt(token) {
    return jwt.verify(token, config.API_TOKEN, {
      algorithms: ['HS256'],
    });
  },

};

module.exports = AuthService;