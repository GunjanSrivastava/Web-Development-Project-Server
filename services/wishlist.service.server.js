module.exports = function (app) {

    app.post('/api/tenant/property/:propertyId', addPropertyToWishlist);
    app.delete('/api/tenant/property/:propertyId', removePropertyFromUserWishlist);
    app.get('/api/tenant/property', findWishListedPropertiesForUser);


    const wishlistModel = require('../models/wishlist/wishlist.model.server');

    function findWishListedPropertiesForUser(req, res) {
        const currentUser = req.session.currentUser;
        const tenantId = currentUser._id;
        wishlistModel
            .findWishListedPropertiesForUser(tenantId)
            .then(function (properties) {
                res.json(properties);
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
        const tenantId = currentUser._id;
        wishlistModel
            .removePropertyFromUserWishlist(tenantId, propertyId)
            .then(function (wishlist) {
                res.json(wishlist);
            });
    }
};