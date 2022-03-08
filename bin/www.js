#!/usr/bin/env node

'use strict';

/* eslint-disable global-require */
function initialize() {
  function getLogFunctionFactory(config) {
    const debug = require('debug');
    debug.enable(config.debug);

    return require('$core-services/logFunctionFactory');
  }

  function monitorAndLog(server, port, config) {
    const logFunctionFactory = getLogFunctionFactory(config);
    const onError = require('./onError');
    server.on('error', onError);

    const logStart = require('./logStart');
    logStart(config.appName, port, config.nodeEnv, logFunctionFactory);
  }

  const app = require('../src/app');
  const config = require('$config');
  const port = parseInt(config.desiredPort, 10);
  const server = app.listen(port);

  monitorAndLog(server, port, config);
}

initialize();
