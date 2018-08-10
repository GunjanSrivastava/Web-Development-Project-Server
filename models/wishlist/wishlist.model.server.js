var mongoose = require('mongoose');
var wishlistSchema = require('./wishlist.schema.server');
var wishlistModel = mongoose.model(
    'WishlistModel',
    wishlistSchema
);

function addPropertyToWishlist(wishlist) {
    return wishlistModel.create(wishlist);
}

function removePropertyFromUserWishlist(userId, propertyId) {
    return wishlistModel.remove({property: propertyId, user: userId});
}

function removePropertyFromWishlist(propertyId) {
    return wishlistModel.remove({property: propertyId});
}

function findWishListedPropertiesForUser(userId) {
    return wishlistModel
        .find({user: userId})
        .populate('property')
        .exec();
}

module.exports = {
    addPropertyToWishlist: addPropertyToWishlist,
    removePropertyFromUserWishlist: removePropertyFromUserWishlist,
    removePropertyFromWishlist: removePropertyFromWishlist,
    findWishListedPropertiesForUser: findWishListedPropertiesForUser
};