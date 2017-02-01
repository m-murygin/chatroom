'use strict';

const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/admin/rooms', (req, res) => {
  res.render('rooms');
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
