var mongoose = require('mongoose');
var enrollmentSchema = mongoose.Schema({
    number: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
}, {collection: 'address'});
module.exports = enrollmentSchema;