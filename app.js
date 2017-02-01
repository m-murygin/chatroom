'use strict';

const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/hello', (req, res) => {
  res.end('hello world');
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
