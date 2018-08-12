module.exports = function (app) {

    app.post('/api/owner/property', createProperty);
    app.get('/api/owner/property/:userId', findPropertiesForOwner);
    app.get('/api/property/university/:universityId', findPropertiesForUniversity);
    app.get('/api/property/:propertyId', findPropertyById);
    app.delete("/api/property/:propertyId", deleteProperty);
    app.put("/api/property", updateProperty);

    //
    // app.post('/api/course/:courseId/property', createProperty);
    // app.get('/api/course/:courseId/property', findPropertysForCourse);
    // app.post('/api/owner/property/:propertyId', enrollOwnerInProperty);
    // app.delete('/api/owner/property/:propertyId', unEnrollOwnerInProperty);
    // app.get("/api/property/:propertyId", getPropertyById)
    // app.delete("/api/property/:propertyId", removeProperty);
    // app.put("/api/property/:propertyId", updateProperty);
    // app.get("/api/property", getAllPropertys);


    const propertyModel = require('../models/property/property.model.server');
    const addressModel = require('../models/address/address.model.server');
    var wishlistModel = require('../models/wishlist/wishlist.model.server');
    var inviteModel = require('../models/invite/invite.model.server');

    function findPropertiesForOwner(req, res) {
        const currentUser = req.session.currentUser;
        var ownerId = currentUser._id;
        const userId =  req.params.userId;
        if(userId!=='self'){
            ownerId = userId;
        }
        propertyModel
            .findPropertiesForOwner(ownerId)
            .then(function (enrollments) {
                res.json(enrollments);
            });
    }

    function findPropertyById(req, res) {
        var propId = req.params.propertyId;
        return propertyModel.findPropertyById(propId)
            .then(function (property) {
                return res.send(property);
            });
    }

    function findPropertiesForUniversity(req, res) {
        const universityId = req.params.universityId;
        propertyModel
            .findPropertiesForUniversity(universityId)
            .then(function (properties) {
                res.json(properties);
            });
    }

    function deleteProperty(req, res) {
        var propId = req.params.propertyId;
        return propertyModel.findPropertyById(propId)
            .then((property) => addressModel.deleteAddress(property.address._id))
            .then(() => wishlistModel.deletePropertyFromWishlist(propId))
            .then(() => inviteModel.deletePropertyFromInvitation(propId))
            .then(() => propertyModel.deleteProperty(propId))
            .then((response) => res.send(response));
    }


    //
    // function enrollOwnerInProperty(req, res) {
    //     const propertyId = req.params.propertyId;
    //     const currentUser = req.session.currentUser;
    //     const ownerId = currentUser._id;
    //     const enrollment = {
    //         owner: ownerId,
    //         property: propertyId
    //     };
    //
    //     propertyModel
    //         .decrementPropertySeats(propertyId)
    //         .then(function () {
    //             return enrollmentModel
    //                 .enrollOwnerInProperty(enrollment)
    //         })
    //         .then(function (enrollment) {
    //             res.json(enrollment);
    //         });
    // }
    //
    // function unEnrollOwnerInProperty(req, res) {
    //     const propertyId = req.params.propertyId;
    //     const currentUser = req.session.currentUser;
    //     const ownerId = currentUser._id;
    //
    //     propertyModel
    //         .incrementPropertySeats(propertyId)
    //         .then(function () {
    //             return enrollmentModel
    //                 .unEnrollOwnerInProperty(ownerId, propertyId)
    //         })
    //         .then(function (enrollment) {
    //             res.json(enrollment);
    //         });
    // }
    //
    // function getPropertyById(req, res) {
    //     var propertyId = req.params.propertyId;
    //     return propertyModel
    //         .findPropertyById(propertyId)
    //         .then(property => res.send(property)
    // )
    //     ;
    // }
    //
    // function removeProperty(req, res) {
    //     var propertyId = req.params.propertyId;
    //     propertyModel
    //         .deleteProperty(propertyId)
    //         .then(() => enrollmentModel.removeProperty(propertyId)
    // )
    // .
    //     then(response => res.send(response)
    // )
    //     ;
    // }
    //
    function updateProperty(req, res) {
        var property = req.body;
        propertyModel.updateProperty(property)
            .then(response => res.send(response))
    }
    //
    // function findPropertysForOwner(req, res) {
    //     const courseId = req.params['courseId'];
    //     propertyModel
    //         .findPropertysForCourse(courseId)
    //         .then(function (propertys) {
    //             res.json(propertys);
    //         })
    // }

    function createProperty(req, res) {
        //     addressModel.createAddress(prop.address)
        //         .then((address) => {
        //         prop.address = address._id
        //     const currentUser = req.session.currentUser;
        //     const ownerId = currentUser._id;
        //     const property = Object.assign({
        //         owner: ownerId
        //     }, prop);
        // }
        //     propertyModel
        //         .createProperty(property)
        //         .then(function (property) {
        //             res.json(property);
        //         })
        var prop = req.body;
        addressModel.createAddress(prop.address)
            .then(function (address) {
                prop.address = address._id
            })
            .then(function (address) {
                const currentUser = req.session.currentUser;
                const ownerId = currentUser._id;
                const property = Object.assign({
                    owner: ownerId
                }, prop);
                return propertyModel.createProperty(property);
            })
            .then(function (property) {
                res.json(property);
            });


    }

    // function getAllPropertys(req, res) {
    //     propertyModel
    //         .findAllPropertys()
    //         .then(propertys => (
    //         res.send(propertys)
    //     )
    // );
    // }
};