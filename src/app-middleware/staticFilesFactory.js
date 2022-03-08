'use strict';

const express = require('express');
const path = require('path');
const { Router } = require('express');


module.exports = function staticFilesFactory() {
  return [
    // express.static(path.join(__dirname, '../../iframe')),
     express.static(path.join(__dirname, '../../webapp'))
  ]
};
