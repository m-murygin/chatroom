'use strict';

$(function onLoad() {
  const $message = $('#message');
  const $messages = $('#messages');
  let roomId;

  fetch('/api/rooms')
    .then(Helpers.checkResponseStatus)
    .then(Helpers.getResponseJSON)
    .then(rooms => {
      if (!rooms) {
        return;
      }

      roomId = rooms[0].id;

      rooms.forEach(room => {
        const a = `<a href="#" data-room-id="${room.id}" class="room list-group-item">${room.name}</a>`;

        $('#rooms').append(a);
      });

      return getMessages();
    });

  $('#post').click(() => {
    const message = $message.val();

    fetch(`/api/rooms/${roomId}/messages`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ message }),
      })
      .then(() => {
        $message.val('');

        return getMessages();
      });
  });

  $('body').on('click', 'a.room', event => {
    roomId = $(event.target).attr('data-room-id');
    getMessages();
  });

  $('#delete').click(() => {
    fetch(`/api/rooms/${roomId}/messages`, { method: 'DELETE' })
      .then(() => $messages.val(''));
  });

  function getMessages() {
    return fetch(`/api/rooms/${roomId}/messages`)
      .then(Helpers.checkResponseStatus)
      .then(Helpers.getResponseJSON)
      .then(data => {
        if (!data) {
          return;
        }

        $('#roomName').text(`Messages for ${data.room.name}`);

        let messages = '';
        data.messages.forEach(message => {
          messages += `${message.text}\r`;
        });

        $messages.val(messages);
      });
  }
});
