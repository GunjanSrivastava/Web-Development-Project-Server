var mongoose = require('mongoose');

var universitySchema = mongoose.Schema({
    Institution_Name: String,
    Institution_Address: String,
    Institution_City: String,
    Institution_State: String
}, {collection: 'university'});
module.exports = universitySchema;