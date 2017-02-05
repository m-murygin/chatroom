'use strict';

const router = require('express').Router();
const _ = require('lodash');
const uuidV4 = require('uuid/v4');

const rooms = require('../data/rooms.json');

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

router.route('/rooms/edit/:id')
  .all((req, res, next) => {
    const room = _.find(rooms, { id: req.params.id });

    if (!room) {
      res.sendStatus(404);
      return;
    }

    res.locals.room = room;
    next();
  })
  .get((req, res) => {
    res.render('edit_room', {
      title: 'Edit Room',
    });
  })
  .post((req, res) => {
    const newName = req.body.name;

    res.locals.room.name = newName;

    res.redirect(`${req.baseUrl}/rooms`);
  });

router.get('/rooms/delete/:id', (req, res) => {
  _.remove(rooms, { id: req.params.id });

  res.redirect(`${req.baseUrl}/rooms`);
});

module.exports = router;
