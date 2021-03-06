module.exports = function (app) {

    app.post('/api/tenant/property/:propertyId', addPropertyToWishlist);
    app.delete('/api/tenant/:userId/property/:propertyId', removePropertyFromUserWishlist);
    app.get('/api/tenant/property/:userId', findWishListedPropertiesForUser);
    app.post('/api/tenant/:tenantId/property/:propertyId', addTenantPropertyToWishlist);


    const wishlistModel = require('../models/wishlist/wishlist.model.server');

    function findWishListedPropertiesForUser(req, res) {
        const currentUser = req.session.currentUser;
        var tenantId = currentUser._id;
        var userId = req.params.userId;
        if(userId!='self'){
            tenantId = userId;
        }
        wishlistModel
            .findWishListedPropertiesForUser(tenantId)
            .then(function (properties) {
                res.json(properties);
            });
    }

    function addTenantPropertyToWishlist(req, res) {
        const propertyId = req.params.propertyId;
        const tenantId = req.params.tenantId;
        const wishlist = {
            user: tenantId,
            property: propertyId
        };

        wishlistModel
            .addPropertyToWishlist(wishlist)
            .then(function (wishlist) {
                res.json(wishlist);
            });
    }

    function addPropertyToWishlist(req, res) {
        const propertyId = req.params.propertyId;
        const currentUser = req.session.currentUser;
        const tenantId = currentUser._id;
        const wishlist = {
            user: tenantId,
            property: propertyId
        };

        wishlistModel
            .addPropertyToWishlist(wishlist)
            .then(function (wishlist) {
                res.json(wishlist);
            });
    }

    function removePropertyFromUserWishlist(req, res) {
        const propertyId = req.params.propertyId;
        const currentUser = req.session.currentUser;
        var tenantId = currentUser._id;
        var userId = req.params.userId;
        if(userId!='self'){
            tenantId = userId;
        }
        wishlistModel
            .removePropertyFromUserWishlist(tenantId, propertyId)
            .then(function (wishlist) {
                res.json(wishlist);
            });
    }
};