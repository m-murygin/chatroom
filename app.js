'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');

const log = require('./modules/logger.js');
const homeRouter = require('./routes/home.js');
const adminRouter = require('./routes/admin.js');
const apiRouter = require('./routes/api.js');
const authRouter = require('./routes/auth.js');
require('./modules/passport-init.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static('public'));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressSession({
  secret: 'i2orX2Cv',
  cookie: {
    maxAge: 60000,
  },
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    next();
    return;
  }
  res.redirect('/login');
});

app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  log.info(`Chat room app listening on port ${PORT}!`);
});
