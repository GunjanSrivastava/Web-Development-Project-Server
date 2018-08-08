var mongoose = require('mongoose');
var propertySchema = require('./property.schema.server');
var propertyModel = mongoose.model('PropertyModel', propertySchema);

function findPropertyByCredentials(credentials) {
    return propertyModel.findOne(credentials, {propertyname: 1});
}


function createProperty(property) {
    return propertyModel.create(property);
}

function findAllPropertys() {
    return propertyModel.find();
}

function updateProperty(property) {
    return propertyModel.update({
        _id: property._id
    }, {
        $set: property
    })
}

function findByPropertyName(propertyname) {
    return propertyModel.findOne({propertyname: propertyname})
}

function deleteProfile(propertyId) {
    return propertyModel.remove({_id: propertyId})
}

var api = {
    createProperty: createProperty,
    findAllPropertys: findAllPropertys,
    findPropertyByCredentials: findPropertyByCredentials,
    updateProperty: updateProperty,
    findByPropertyName: findByPropertyName,
    deleteProfile: deleteProfile
};

module.exports = api;