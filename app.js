'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const uuidV4 = require('uuid/v4');

const log = require('./modules/logger.js');
const rooms = require('./data/room.json');
const _ = require('lodash');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

// add static files middleware
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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
  const room = {
    name: req.body.name,
    id: uuidV4(),
  };

  rooms.push(room);

  res.redirect('/admin/rooms');
});

app.get('/admin/rooms/edit/:id', (req, res) => {
  const room = _.find(rooms, { id: req.params.id });

  if (!room) {
    return res.sendStatus(404);
  }

  res.render('edit_room', {
    room,
    title: 'Edit Room',
  });
});

app.post('/admin/rooms/edit/:id', (req, res) => {
  const room = _.find(rooms, { id: req.params.id });

  if (!room) {
    return res.sendStatus(404);
  }

  const newName = req.body.name;

  room.name = newName;

  res.redirect('/admin/rooms');
});

app.get('/admin/rooms/delete/:id', (req, res) => {
  _.remove(rooms, { id: req.params.id });

  res.redirect('/admin/rooms');
});


app.listen(8080, () => {
  log.info('Example app listening on port 8080!');
});
