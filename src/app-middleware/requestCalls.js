'use strict';

const { Router } = require('express');
const logDebug = require('$core-services/logFunctionFactory').getDebugLogger()

function requestCallLogHandler(request, response, next) {
  let body = request.method  == 'GET' ? request.query : request.body;
  if(process.env.LOGGER_LEVEL.toLocaleLowerCase() == 'debug'){
    logDebug('[CALL_ROUTE] [',request.originalUrl,'] ', ' METHOD [', request.method , '] BODY ', body);
  }
   next();
}

function AddCorsRules ( req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

module.exports = function requestCallLog() {
  return Router()
    .use(AddCorsRules)
    .use(requestCallLogHandler);
};
