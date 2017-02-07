'use strict';

const router = require('express').Router();
const _ = require('lodash');
const uuidV4 = require('uuid/v4');

const rooms = require('../data/rooms.json');
const messages = require('../data/messages.json');

router.get('/rooms/', (req, res) => {
  res.json(rooms);
});

router
  .route('/rooms/:roomId/messages')
  .get((req, res) => {
    const roomId = req.params.roomId;
    const room = _.find(rooms, { id: roomId });
    const roomMessages = _.filter(messages, { roomId });

    res.json({
      room,
      messages: roomMessages,
    });
  })
  .post((req, res) => {
    const roomId = req.params.roomId;

    const newMessage = {
      roomId,
      text: req.body.message,
      id: uuidV4(),
    };

    messages.push(newMessage);

    res.sendStatus(200);
  })
  .delete((req, res) => {
    const roomId = req.params.roomId;

    _.remove(messages, { roomId });

    res.sendStatus(200);
  });

module.exports = router;
