'use strict';

var session = require('express-session')
const { Router } = require('express');
const routes = require('$routes');
const path = require('path');

let router = Router();

const oneDay = 1000 * 60 * 60 * 24;

router.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


module.exports = function sessionFactory() {
    return router;  
  };
