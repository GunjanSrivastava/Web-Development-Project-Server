var mongoose = require('mongoose');
var addressSchema = require('./address.schema.server');
var addressModel = mongoose.model('AddressModel', addressSchema);

function createAddress(address) {
    return addressModel.create(address);
}

function findAllAddresss() {
    return addressModel.find();
}

function updateAddress(address) {
    return addressModel.update({
        _id: address._id
    }, {
        $set: address
    })
}

function deleteAddress(addressId) {
    return addressModel.remove({_id: addressId})
}

var api = {
    createAddress: createAddress,
    findAllAddresss: findAllAddresss,
    deleteAddress: deleteAddress,
    updateAddress: updateAddress
};

module.exports = api;