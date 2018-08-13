var mongoose = require('mongoose');
var inviteSchema = require('./invite.schema.server');
var inviteModel = mongoose.model(
    'InvitationModel',
    inviteSchema
);

function addToInvitation(invite) {
    return inviteModel.create(invite);
}


function updateInvitationStatus(credentials, status) {
    return inviteModel.findOne(credentials).update({status: status});
}

function removeFromInvitation(userId, propertyId) {
    return inviteModel.remove({property: propertyId, user: userId});
}

function deletePropertyFromInvitation(propertyId) {
    return inviteModel.remove({property: propertyId});
}

function deleteFromInvitationByUserId(userId) {
    return inviteModel.remove({user: userId});
}

function findInvitationByPropertyId(propId){
    return inviteModel.find({property: propId})
        .populate('user')
        .exec();
}

function findInvitationByCredentials(credentials) {
    return inviteModel.findOne(credentials);
}


module.exports = {
    addToInvitation: addToInvitation,
    updateInvitationStatus: updateInvitationStatus,
    deletePropertyFromInvitation: deletePropertyFromInvitation,
    removeFromInvitation: removeFromInvitation,
    deleteFromInvitationByUserId: deleteFromInvitationByUserId,
    findInvitationByPropertyId: findInvitationByPropertyId,
    findInvitationByCredentials: findInvitationByCredentials
};