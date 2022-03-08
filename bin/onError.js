'use strict';

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  /* eslint-disable no-console */
  switch (error.code) {
    case 'EACCES':
      console.error('Port requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

module.exports = onError;
