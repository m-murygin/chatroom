'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const log = require('./modules/logger.js');
const adminRoutes = require('./routes/admin.js');
const reponseTime = require('./middlewares/reponse-time.js');

app.set('view engine', 'pug');
app.set('views', 'views');

// add static files middleware
app.use(express.static('public'));

app.use(reponseTime);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.listen(8080, () => {
  log.info('Example app listening on port 8080!');
});
