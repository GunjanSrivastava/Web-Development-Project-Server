module.exports = function (app) {
    app.post('/api/invite/property', addToInvitation);
    app.put('/api/invite/update', updateInvitationStatus);
    app.delete('/api/invite/property/:propertyId', removeFromInvitation);
    app.get('/api/invite/property/:propertyId', findInvitationByPropertyId);
    app.get('/api/invite/tenant/property/:propertyId', findInvitationByCredentials);
    app.get('/api/invite', findAllInvites);


    const invitationModel = require('../models/invite/invite.model.server');

    function findInvitationByCredentials(req, res) {
        const currentUser = req.session.currentUser;
        const propertyId = req.params.propertyId;
        const tenantId = currentUser._id;
        const invitation = {
            user: tenantId,
            property: propertyId }
        invitationModel
            .findInvitationByCredentials(invitation)
            .then(function (invite) {
                if(invite!=null) {
                    res.json(invite);
                }
                else {
                    return res.send({invalid: true})
                }
            });
    }

    function findAllInvites(req, res){
        invitationModel.findAllInvites().then(function (invitation) {
            res.json(invitation);
        });
    }

    function addToInvitation(req, res) {
        const invitation = req.body
        invitationModel
            .addToInvitation(invitation)
            .then(function (invitation) {
                res.json(invitation);
            });
    }

    function findInvitationByPropertyId(req, res) {
        const propertyId = req.params.propertyId;
        invitationModel.findInvitationByPropertyId(propertyId)
            .then(function (invitation) {
                res.json(invitation);
            });
    }


    function updateInvitationStatus(req, res){
        const credentials = req.body
        const status = credentials.status
        delete credentials.status
        invitationModel.updateInvitationStatus(credentials, status)
            .then(function (invitation) {
                res.json(invitation);
            });
    }

    function removeFromInvitation(req, res) {
        const propertyId = req.params.propertyId;
        const currentUser = req.session.currentUser;
        const tenantId = currentUser._id;
        invitationModel
            .removeFromInvitation(tenantId, propertyId)
            .then(function (invitation) {
                res.json(invitation);
            });
    }
};