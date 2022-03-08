'use strict';

const cors = require('cors');

function parseValues(originalValues) {
  let parsedValues = originalValues;
  if (originalValues.includes(',')) {
    parsedValues = originalValues.split(',');
  }
  return parsedValues;
}

module.exports = function corsFactory(config) {
  let corsOpts = {};
  if (config.enableCORS) {
    const origin = parseValues(config.allowedOrigins);
    const allowedHeaders = parseValues(config.allowedHeaders);
    corsOpts = ({
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      preflightContinue: true,
      allowedHeaders,
      origin,
    });
  }
  return cors(corsOpts);
};
