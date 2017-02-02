'use strict';

const express = require('express');
const rooms = require('./data/room.json');

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/admin/rooms', (req, res) => {
  res.render('rooms', {
    rooms,
    title: 'Admin Rooms',
  });
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
