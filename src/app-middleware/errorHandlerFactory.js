'use strict';

const logFunctionFactory = require('$core-services/logFunctionFactory');

const errorTypes = {
  badRequest: Symbol.for('bad request'),
  loginFailed: Symbol.for('login failed'),
  notFound: Symbol.for('not found'),
};

module.exports = function errorHandlerFactory() {
  const writeError = logFunctionFactory.getErrorLogger();

  return (err, req, res, next) => {
    writeError(err);
    if (res.headersSent) {
      next(err);
    } else if (err.status === 400 || (err.errorType === errorTypes.badRequest)) {
      res.status(400)
        .json({ message: err.message });
    } else if (err.status === 401 || (err.errorType === errorTypes.loginFailed)) {
      res.status(401)
        .json({ message: 'Unauthorized API access!' });
    } else if (err.status === 404 || (err.errorType === errorTypes.notFound)) {
      res.status(404)
        .json({ message: err.message });
    } else {
      next(err);
    }
  };
};
