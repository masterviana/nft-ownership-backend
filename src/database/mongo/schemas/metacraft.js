const Schema = require('mongoose').Schema

const MetacraftSchema = new Schema({
    username : String,
    wallet: String,
    items : String
    
},
{ collection: 'metacraft', versionKey: false })

MetacraftSchema.set('timestamps', true);

module.exports = MetacraftSchema