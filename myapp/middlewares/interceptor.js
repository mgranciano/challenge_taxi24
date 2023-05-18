const uuid = require('uuid');
const httpContext = require('express-http-context');
const logger = require('./logger');

//${require('util').inspect(res)
const interceptor = (req, res, next) => {
  httpContext.set("reqId", uuid.v4());
  logger.info(
    `${req.method} ${req.originalUrl} ${res.statusCode} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)}`
  );
  next();
};

module.exports = {
  interceptor,
};
