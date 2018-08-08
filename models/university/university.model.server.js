var mongoose = require('mongoose');
var universitySchema = require('./university.schema.server');
var universityModel = mongoose.model('UniversityModel', universitySchema);

function findAllUniversities() {
    return universityModel.find();
}

var api = {
    findAllUniversities: findAllUniversities
};

module.exports = api;