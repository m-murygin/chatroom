'use strict';

const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      colorize: true,
      prettyPrint: true,
      depth: 4,
    }),
  ],
});

module.exports = logger;
