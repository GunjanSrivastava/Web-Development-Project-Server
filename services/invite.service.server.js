module.exports = function (app) {
    app.post('/api/invite/property/:propertyId', addToInvitation);
    app.put('/api/invite/', updateInvitationStatus);
    app.delete('/api/invite/property/:propertyId', removeFromInvitation);
    app.get('/api/invite/property/:propertyId', findInvitationByPropertyId);
    app.get('/api/invite/tenant/property/:propertyId', findInvitationByCredentials);


    const invitationModel = require('../models/invitation/invitation.model.server');

    function findInvitationByCredentials(req, res) {
        const currentUser = req.session.currentUser;
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

    function addToInvitation(req, res) {
        const propertyId = req.params.propertyId;
        const currentUser = req.session.currentUser;
        const tenantId = currentUser._id;
        const invitation = {
            user: tenantId,
            property: propertyId,
            status: "Pending"
        };

        invitationModel
            .addToInvitation(invitaion)
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