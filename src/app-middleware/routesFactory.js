'use strict';

const { Router } = require('express');
const routes = require('$routes');
const path = require('path');

let router = Router();
router.use('/api/v1', routes)
router.use('*', async (req, res) =>{
   	res.sendFile( path.join(__dirname, '../../webapp/index.html') );
   })

module.exports = function routesFactory() {
  return router;  
};
