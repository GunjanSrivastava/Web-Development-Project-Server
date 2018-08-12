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

function deletePropertyFromWishlist(propertyId) {
    return wishlistModel.remove({property: propertyId});
}

function deleteFromWishListByUserId(userId) {
    return wishlistModel.remove({user: userId});
}

function findWishListedPropertiesForUser(userId) {
    return wishlistModel
        .find({user: userId})
        .populate({
            path: 'property',
            model: 'PropertyModel',
            populate: {
                path: 'address',
                model: 'AddressModel'
            }
        })
        .exec();
}

module.exports = {
    addPropertyToWishlist: addPropertyToWishlist,
    deletePropertyFromWishlist: deletePropertyFromWishlist,
    removePropertyFromUserWishlist: removePropertyFromUserWishlist,
    findWishListedPropertiesForUser: findWishListedPropertiesForUser,
    deleteFromWishListByUserId: deleteFromWishListByUserId
};