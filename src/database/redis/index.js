const log = require('$core-services/logFunctionFactory').getLogger()
const redis = require('async-redis')

module.exports = function(redisUrl) {
    let redisClient = redis.createClient(redisUrl)

    redisClient.on('connect', () => log.debug('REDIS connection established'))

    redisClient.on('end', () => log.warn('REDIS connection closed'))

    redisClient.on('error', (err) => log.error('REDIS connection error ', err.message))

    return redisClient
}