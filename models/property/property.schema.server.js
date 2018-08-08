var mongoose = require('mongoose');
var Address = require('./address.schema.server');

var propertySchema = mongoose.Schema({
    name: String,
    type: String,
    availabilityType: String,
    university: String,
    address: Address,
    description: String,
    rooms: Number,
    size: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {collection: 'property'});
module.exports = propertySchema;