const log = require('$core-services/logFunctionFactory').getLogger()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const MongoModels = {}

function loadModels() {
    var path_ = path.resolve('./src/database/mongo/schemas');

	fs.readdirSync(path_).forEach(async (file) => {
        const extension = file.slice(file.length - 3 , file.length )
        // console.log('loading routes : ', file  )
        if( extension != '.js' ) return
        try
        {
            let filename = path.basename(file, '.js')
            let schema = require(path.resolve(path_, file))
            MongoModels[filename] = mongoose.model(filename, schema)
        }
        catch (err)
        {
            log.error('Error loading route', file, ' error,', err);
        }
	})
}

module.exports = function(url) {
    try {
        mongoose.connect(url, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            connectTimeoutMS: 10000 ,
            retryWrites: false
        })

        mongoose.connection.on('connected', () => log.info('Connection to database established'));
        loadModels()
        return MongoModels
    }
    catch(error) {
        log.error('[DATABASE] ', error)
    }
}