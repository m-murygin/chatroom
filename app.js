'use strict';

const express = require('express');

const log = require('./modules/logger.js');
const rooms = require('./data/room.json');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');
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

app.get('/admin/rooms/add', (req, res) => {
  res.render('add_room', { title: 'add room' });
});

app.post('/admin/rooms/add', (req, res) => {
  log.info(req);
  res.send('nothing');
});

app.listen(8080, () => {
  log.info('Example app listening on port 8080!');
});
