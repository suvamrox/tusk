var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    passport = require('passport'),
    appRoot = require('app-root-path'),
    fs = require('fs'),
    UserModel = require('../model/user.model');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = fs.readFileSync(`${appRoot}/keys/rsa.public.key`);


//for User
passport.use('userJWT', new JwtStrategy(opts, function (jwt_payload, done) {
    UserModel.findById(jwt_payload.userID, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


//for Admin
passport.use('adminJWT', new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("admin")
    UserModel.findById(jwt_payload.userID, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user && user.isAdmin == true) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

