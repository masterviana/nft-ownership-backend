'use strict';


const config = require('$config');

const LoggerID = process.pid + config.appName
const Logger = require('remotelog-local').createLogger(LoggerID)

if(config.loggerRemote) {
  Logger.startRemote()
}

Logger.setLevel(config.loggerLevel)

/* eslint-disable no-console */
const Factory = {
  getLogger: () => { return Logger },
  
  getErrorLogger: () => { return Logger.error },
  
  getWarnLogger: () => { return Logger.warn },
  
  getInfoLogger: () => { return Logger.info },
  
  getDebugLogger: () => { return Logger.debug }
};


module.exports = Factory;
