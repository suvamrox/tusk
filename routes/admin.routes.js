const express = require('express'),
    router = express.Router(),
    AdminController = require('../controllers/admin.controller'),
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

router.get('/user', passport.authenticate('adminJWT', { session: false }), AdminController.getUser);

router.patch('/user', passport.authenticate('adminJWT', { session: false }), AdminController.editUser);

router.delete('/user/:id', passport.authenticate('adminJWT', { session: false }), AdminController.deleteUser);

router.get('/products', AdminController.getProducts);

router.patch('/product', passport.authenticate('adminJWT', { session: false }), AdminController.updateProduct);

router.delete('/product/:id', passport.authenticate('adminJWT', { session: false }), AdminController.deleteProduct);


module.exports = router;