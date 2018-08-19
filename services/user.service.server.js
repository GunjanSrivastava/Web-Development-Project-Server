module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.post('/api/register', createUser);
    app.post('/api/create', createUserAdmin);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.post('/api/profile', updateProfile)
    app.delete("/api/profile", deleteProfile)
    app.get("/api/user/username/:username", findUserByUsername)
    app.get("/api/user/:userId", findUserById)

    var userModel = require('../models/user/user.model.server');
    var propertyModel = require('../models/property/property.model.server');
    var wishlistModel = require('../models/wishlist/wishlist.model.server');
    var propertyService = require('./property.service.server');
    var addressModel = require('../models/address/address.model.server');
    var inviteListModel = require('../models/invite/invite.model.server');

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function (user) {
                if (user != null) {
                    req.session['currentUser'] = user;
                    req.session.cookie.maxAge = 1800000;
                    return res.send(user);
                }
                else {
                    return res.send({invalid: true})
                }
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        return userModel.findUserById(userId)
            .then(function (user) {
                return res.send(user);
            });
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function updateProfile(req, res) {
        var user = req.body;
        return userModel
            .updateUser(user)
            .then(response => res.send(response)
            );
    }

    function deleteProfile(req, res) {
        var user = req.body;
        if (user.role === "Owner") {
            return propertyModel.findPropertiesForOwner(user._id)
                .then((properties) => {
                    for (var index in properties) {
                        (function (property) {
                            propertyModel
                                .deleteProperty(property._id)
                                .then(() => addressModel.deleteAddress(property.address._id))
                                .then(() => wishlistModel.deletePropertyFromWishlist(property._id))
                                .then(() => inviteListModel.deletePropertyFromInvitation(property._id))
                                .then((response) => console.log("done"))
                        })(properties[index])
                    }
                }).then(() => userModel.deleteProfile(user._id))
                .then((response) => {
                    res.send(response);
                })
        }
        else if (user.role === "Tenant") {
            return wishlistModel.deleteFromWishListByUserId(user._id)
                .then(() => inviteListModel.deleteFromInvitationByUserId(user._id))
                .then(() => userModel.deleteProfile(user._id))
                .then((response) => {
                    res.send(response);
                });
        }
        else {
            userModel.deleteProfile(user._id)
                .then((response) => {
                    res.send(response);
                });
        }
    }

    function profile(req, res) {
        var user = req.session['currentUser'];
        if (user != null) {
            userModel.findByUserName(user.username)
                .then(function (user) {
                    if (user == null) {
                        req.session.destroy();
                        return res.send({invalid: true});
                    }
                    else {
                        return res.send(user);
                    }
                })
        }
        else {
            return res.send({invalid: true})
        }
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function createUserAdmin(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                res.send(user);
            })
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        return userModel.findByUserName(username)
            .then(function (user) {
                if (user != null) {
                    return res.send(user);
                }
                else {
                    return res.send({invalid: true})
                }
            });
    }


    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }
}