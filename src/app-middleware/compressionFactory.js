'use strict';

const compression = require('compression');

module.exports = function compressionFactory() {
  return compression();
};
