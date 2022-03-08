'use strict';

function logStart(name, port, environment, logFunctionFactory) {
  /* eslint-disable global-require */
  const writeInfo = logFunctionFactory.getInfoLogger('server');

  writeInfo(`Starting ${name} on port ${port}, environment is ${environment}`);
}

module.exports = logStart;
