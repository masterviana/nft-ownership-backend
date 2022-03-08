'use strict';

const { Router } = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const pkgJSON = require('../../package.json');

module.exports = function swaggerFactory() {
  const swaggerDefinition = {
    info: {
      title: pkgJSON.name,
      version: pkgJSON.version,
      description: pkgJSON.description,
    },
    basePath: '/api/v1',
  };
  const swaggerOptions = {
    swaggerDefinition,
    apis: ['src/routes/**/index.js', 'src/routes/index.js'],
  };
  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  return Router()
    .get('/swagger.json', (request, response) => response.json(swaggerSpec))
    .use('/api-docs/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
