'use strict';

const router = require('express').Router();
const _ = require('lodash');
const uuidV4 = require('uuid/v4');

const rooms = require('../data/rooms.json');
const messages = require('../data/messages.json');

router.get('/rooms/', (req, res) => {
  res.json(rooms);
});

router.post('/rooms/:roomId/messages', (req, res) => {
  const roomId = req.params.roomId;

  const newMessage = {
    roomId,
    text: req.body.message,
    id: uuidV4(),
  };

  messages.push(newMessage);

  res.sendStatus(200);
});

router.get('/rooms/:roomId/messages', (req, res) => {
  const roomId = req.params.roomId;
  const room = _.find(rooms, { id: roomId });
  const roomMessages = _.filter(messages, { roomId });

  res.json({
    room,
    messages: roomMessages,
  });
});

module.exports = router;
