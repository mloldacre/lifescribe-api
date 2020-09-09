const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&])[\S]/;
const xss = require('xss');
const bcrypt = require('bcryptjs');

const UsersService = {

  hasUserWithUserName(knex, user_name) {
    return knex('lifescribe_users')
      .where({ user_name })
      .first()
      .then(user => !!user);
  },

  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into('lifescribe_users')
      .returning('*')
      .then(([user]) => user);

  },

  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;

  },

  hashPassword(password) {
    return bcrypt.hash(password, 11);
  },

  serializeUser(user) {
    return {
      id: user.id,
      first_name: xss(user.first_name),
      last_name: xss(user.last_name),
      email: xss(user.email),
      user_name: xss(user.user_name)
    };
  },
};

module.exports = UsersService;