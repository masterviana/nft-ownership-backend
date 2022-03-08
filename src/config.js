'use strict';

const cfg = require('12factor-config');

const env = {
  allowedHeaders: {
    env: 'ALLOWED_HEADERS',
    type: 'string',
  },
  allowedOrigins: {
    env: 'ALLOWED_ORIGINS',
    type: 'string',
  },
  appName: {
    env: 'APP_NAME',
    type: 'string',
    required: true,
  },
  debug: {
    env: 'DEBUG',
    type: 'string',
    required: true,
  },
  desiredPort: {
    env: 'PORT',
    type: 'integer',
    required: true,
  },
  redisUrl: {
    env: 'REDIS_URL',
    type: 'string',
    required: false
  },
  enableCORS: {
    env: 'ENABLE_CORS',
    type: 'boolean',
  },
  nodeEnv: {
    env: 'NODE_ENV',
    type: 'enum',
    values: ['development', 'production'],
    default: 'development',
  },

  domain_env: {
    env: 'DOMAIN_ENV',
    type: 'string',
    required: true,
  },

  acceptedLanguages: {
    env: 'ACCEPTED_LANGS',
    type: 'string',
    required: false,
  },
 
  run_discord_bot: {
    env: 'RUN_DISCORD_BOT',
    type: 'boolean',
    required: false,
  },

}

const loggerEnv = {
  loggerAMQPBroker: {
    env: 'LOGGER_AMQP_BROKER',
    type: 'string',
    required: true
  },
  loggerRemote: {
    env: 'LOGGER_REMOTE',
    type: 'boolean',
    default: false
  },
  loggerLevel: {
    env: 'LOGGER_LEVEL',
    type: 'enum',
    values: ['debug', 'info', 'warn', 'error'],
    default: 'debug'
  }
}

const serviceEnv = {
  blockchainConnectorURL: {
    env: 'BLOCKCHAIN_CONNECTOR_URL',
    type: 'string',
    default: 'http://localhost:3000/api'
  }
}

Object.assign(env, Object.assign(loggerEnv, serviceEnv))

const config = cfg(env);

module.exports = config;
