var mongoose = require('mongoose');
var propertySchema = require('./property.schema.server');
var propertyModel = mongoose.model('PropertyModel', propertySchema);

function findPropertyByCredentials(credentials) {
    return propertyModel.findOne(credentials);
}

function findPropertiesForOwner(ownerId) {
    return propertyModel
        .find({owner: ownerId})
        .populate('address')
        .exec();
}

function findPropertiesForUniversity(universityId) {
    return propertyModel
        .find({university: universityId})
        .populate('address')
        .exec();
}


function createProperty(property) {
    return propertyModel.create(property);
}

function findAllPropertys() {
    return propertyModel.find().populate('address').exec();
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

function findPropertyById(propId) {
    return propertyModel.findById(propId).populate('address').populate('university').exec();
}

function deleteProperty(propertyId) {
    return propertyModel.remove({_id: propertyId})
}

function deletePropertyByUserId(userId) {
    return propertyModel.remove({owner: userId})
}

var api = {
    createProperty: createProperty,
    findAllPropertys: findAllPropertys,
    findPropertyByCredentials: findPropertyByCredentials,
    updateProperty: updateProperty,
    findByPropertyName: findByPropertyName,
    deleteProperty: deleteProperty,
    findPropertiesForOwner: findPropertiesForOwner,
    findPropertiesForUniversity: findPropertiesForUniversity,
    findPropertyById: findPropertyById,
    deletePropertyByUserId: deletePropertyByUserId
};

module.exports = api;