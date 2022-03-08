const Schema = require('mongoose').Schema

const AbstractSchema = new Schema({
    field1: Object,
    field2: Object,
    name : String,
    age : Number
},
{ collection: 'abstract', versionKey: false })

module.exports = AbstractSchema