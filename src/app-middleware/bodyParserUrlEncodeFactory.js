'use strict';

const bodyParser = require('body-parser');

module.exports = function bodyParserJsonFactory() {
  return bodyParser.urlencoded({ limit: '50mb', extended: false });
};
