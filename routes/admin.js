'use strict';

const router = require('express').Router();
const _ = require('lodash');
const uuidV4 = require('uuid/v4');

const rooms = require('../data/room.json');

router.get('/rooms', (req, res) => {
  res.render('rooms', {
    rooms,
    title: 'Admin Rooms',
  });
});

router.get('/rooms/add', (req, res) => {
  res.render('add_room', { title: 'add room' });
});

router.post('/rooms/add', (req, res) => {
  const room = {
    name: req.body.name,
    id: uuidV4(),
  };

  rooms.push(room);

  res.redirect('/admin/rooms');
});

router.get('/rooms/edit/:id', (req, res) => {
  const room = _.find(rooms, { id: req.params.id });

  if (!room) {
    return res.sendStatus(404);
  }

  res.render('edit_room', {
    room,
    title: 'Edit Room',
  });
});

router.post('/rooms/edit/:id', (req, res) => {
  const room = _.find(rooms, { id: req.params.id });

  if (!room) {
    return res.sendStatus(404);
  }

  const newName = req.body.name;

  room.name = newName;

  res.redirect('/admin/rooms');
});

router.get('/rooms/delete/:id', (req, res) => {
  _.remove(rooms, { id: req.params.id });

  res.redirect('/admin/rooms');
});

module.exports = router;
