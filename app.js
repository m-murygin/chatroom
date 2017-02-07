'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const log = require('./modules/logger.js');

const reponseTime = require('./middlewares/reponse-time.js');
const homeRouter = require('./routes/home.js');
const adminRouter = require('./routes/admin.js');
const apiRouter = require('./routes/api.js');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', 'views');

// add static files middleware
app.use(express.static('public'));

app.use(reponseTime);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  log.info(`Chat room app listening on port ${PORT}!`);
});
