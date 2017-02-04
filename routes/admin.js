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

router
  .route('/rooms/add')
  .get((req, res) => {
    res.render('add_room', { title: 'add room' });
  })
  .post((req, res) => {
    const room = {
      name: req.body.name,
      id: uuidV4(),
    };

    rooms.push(room);

    res.redirect(`${req.baseUrl}/rooms`);
  });

router.get('/rooms/edit/:id', (req, res) => {
  const room = _.find(rooms, { id: req.params.id });

  if (!room) {
    res.sendStatus(404);
    return;
  }

  res.render('edit_room', {
    room,
    title: 'Edit Room',
  });
});

router.post('/rooms/edit/:id', (req, res) => {
  const room = _.find(rooms, { id: req.params.id });

  if (!room) {
    res.sendStatus(404);
    return;
  }

  const newName = req.body.name;

  room.name = newName;

  res.redirect(`${req.baseUrl}/rooms`);
});

router.get('/rooms/delete/:id', (req, res) => {
  _.remove(rooms, { id: req.params.id });

  res.redirect(`${req.baseUrl}/rooms`);
});

module.exports = router;
