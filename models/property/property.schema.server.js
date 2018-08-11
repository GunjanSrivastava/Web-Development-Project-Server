var mongoose = require('mongoose');
var Address = require('./address.schema.server');

var propertySchema = mongoose.Schema({
    name: String,
    type: String,
    availabilityType: String,
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UniversityModel'
    },
    address: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'AddressModel'
    },
    description: String,
    rooms: Number,
    size: Number,
    photoId: [{
        type: String
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    price: Number
}, {collection: 'property'});
module.exports = propertySchema;