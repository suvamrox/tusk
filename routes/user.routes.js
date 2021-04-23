const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/user.controller'),
    { userValidationRules, validate, productValidationRules } = require('../config/validator'),
    passport = require('passport');


router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,Authorization,Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


router.post('/login', userValidationRules(), validate, UserController.login);

router.post('/register', userValidationRules(), validate, UserController.register);

router.put('/product', passport.authenticate('userJWT', { session: false }), productValidationRules(), validate, UserController.setProduct);


module.exports = router;