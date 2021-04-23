
'use strict';
const appRoot = require('app-root-path'),
    fs = require('fs'),
    jwt = require('jsonwebtoken');


exports.userToke = (data, cb) => {
    fs.readFile(`${appRoot}/keys/rsa.private.key`, (errFile, privateKey) => {
        if (errFile) {
            console.log(errFile);
            cb(errFile, null);
        } else {
            jwt.sign({ userID: data._id }, privateKey, { algorithm: 'RS256', expiresIn: '1h' }, function (err, token) {
                cb(err, token);
            });
        }
    });
}