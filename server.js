var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session')
var mongoose = require('mongoose')
mongoose.connect('mongodb://heroku_h04z40gp:6lrgld577p7sth6da75ggitsio@ds119692.mlab.com:19692/heroku_h04z40gp')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

var userService = require('./services/user.service.server');
var propertyService = require('./services/property.service.server');
var universityService = require('./services/university.service.server');
var wishlistService = require('./services/wishlist.service.server');
var inviteService = require('./services/invite.service.server');

userService(app);
propertyService(app);
universityService(app);
wishlistService(app);
inviteService(app);
app.listen(process.env.PORT || 4000);
