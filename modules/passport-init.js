'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const _ = require('lodash');
const log = require('./logger.js');

const users = require('../data/users.json');

function validatePassword(inputPassword, storedPassword) {
  return inputPassword === storedPassword;
}

passport.use(new LocalStrategy((username, password, done) => {
  log.debug('start local strategy');
  const user = _.find(users, { name: username });

  if (!user) {
    return done(null, false, { message: 'Incorrect username' });
  }

  if (!validatePassword(user.password, password)) {
    return done(null, false, { message: 'Incorrect password' });
  }

  done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = _.find(users, { id });

  done(null, user);
});
