'use strict';

const logger = require('../modules/logger.js');

function responseTime(req, res, next) {
  req.startTime = Date.now();

  req.on('end', () => {
    logger.info({
      method: req.method,
      url: req.path,
      duration: Date.now() - req.startTime,
    });
  });

  next();
}

module.exports = responseTime;
