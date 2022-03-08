const Schema = require('mongoose').Schema

const DumpThingsSchema = new Schema({
    appID : String,
    title: String,
    description : String,
    author: String,
    state : String,
    tags : []
    
},
{ collection: 'dumpThings', versionKey: false })

DumpThingsSchema.set('timestamps', true);

module.exports = DumpThingsSchema