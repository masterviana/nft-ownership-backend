const config = require('$config')
const startMongo = require('./mongo')
const startRedis = require('./redis')
const logError = require('$core-services/logFunctionFactory').getErrorLogger();
const logDebug = require('$core-services/logFunctionFactory').getDebugLogger();


//load config of database url from individual strings
if(!config.databaseURL){
    let url = 'mongodb+srv://';
    url += process.env.DB_USER + ':';
    url += process.env.DB_PASS + '@';
    url += process.env.DB_HOST + '/';
    // url += process.env.DB_PORT + '/';
    url += process.env.DB_NAME;
    // url += '?authSource=admin';
    //url += '?replicaSet=' + process.env.REPL_SET;
    url += process.env.COMPLEMENT;
    config.databaseURL  = url;
}



let Mongo = {};
if(process.env.USE_DB  === 'true' )
{
    console.log('Use mongoDB try to connect : ',  config.databaseURL);
    Mongo = startMongo(config.databaseURL);
}

let Redis = {};
let RedisSubscribe = {};
if(process.env.USE_REDIS === 'true')
{
    console.log('Use REDIS try to connect : ', process.env.USE_REDIS );
    Redis = startRedis(config.redisUrl);
    RedisSubscribe = startRedis(config.redisUrl)
}

const Database = {
    storeMetacraft: async (data, options) => {
        return await Mongo.metacraft.create(data, options)
    },
    storeTodo: async (data, options) => {
        return await Mongo.todo.create(data, options)
    },
    findTodoAndUpdate: async (criteria, update, options) => {
        return await  Mongo.todo.findOneAndUpdate(criteria, update, options)
    },
    findTodo: async (filter, select, options) => {
        return await Mongo.todo.find(filter, select, options)
    },
    deleteTodo: async (criteria) => {
        return await Mongo.todo.deleteOne(criteria)
    },

    /** Redis connection */
    cacheData: async (key, mgs) => {
        await Redis.set(key, mgs.toString())
    },
    getCachedData: async (key) => {
        return await Redis.get(key)
    },
    subscribe: (channel, handler) => {
        const listener = function(ch, message) {
            if(ch == channel) {
                handler(ch, message);
                RedisSubscribe.removeListener('message', listener)
            }
        }

        RedisSubscribe.on("message", listener);

        RedisSubscribe.subscribe(channel);
    },
    unsubscribe: async (channel) => {
        await RedisSubscribe.unsubscribe(channel)
    },
    saveToken: async (key, data, ttl) => {
        let sTtl = ttl || config.REDIS_AUTH_TTL;
        const result = await Redis.setex(key, sTtl, data)
        return result
    },
    getToken: async (key) => {
        const token = await Redis.get(key);
        return token;
    },
   
}

module.exports = Database