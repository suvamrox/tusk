
const Helper = require('../config/helper.function'),
    JWT = require('../config/JWT');

exports.login = (req, res) => {
    if (req.body.isAdmin && req.body.isAdmin == true) {
        Helper.findAdmin((err, doc) => {
            if (err) {
                res.status(500).send({
                    'message': err
                });
            } else if (doc) {
                if ((doc.password == Helper.getHashedPassword(req.body.password)) && (doc.email == req.body.email)) {
                    JWT.userToke(doc, (err, token) => {
                        if (err) {
                            res.status(500).send({
                                'message': "error"
                            });
                        } else {
                            res.status(200).send({
                                'message': 'Admin login successful',
                                token
                            });
                        }
                    })
                } else {
                    res.status(401).send({
                        'message': 'username or password is incorrect'
                    });
                }
            } else {
                res.status(401).send({
                    'message': 'username or password is incorrect'
                });
            }
        });
    } else {
        Helper.findUserByEmail(req.body.email, (err, doc) => {
            if (err) {
                res.status(500).send({
                    'message': err
                });
            } else if (doc) {
                console.log(doc)
                if (doc.password == Helper.getHashedPassword(req.body.password)) {
                    JWT.userToke(doc, (err, token) => {
                        if (err) {
                            res.status(500).send({
                                'message': err
                            });
                        } else {
                            res.status(200).send({
                                'message': 'User login successful',
                                token
                            });
                        }
                    })
                } else {
                    res.status(401).send({
                        'message': 'username or password is incorrect'
                    });
                }
            } else {
                res.status(401).send({
                    'message': 'username or password is incorrect'
                });
            }
        })
    }
}


exports.register = (req, res) => {
    if (req.body.isAdmin && req.body.isAdmin == true) {
        Helper.findAdmin((err, doc) => {
            if (err) {
                res.status(500).send({
                    'message': err
                });
            } else if (!doc) {
                Helper.createUser({
                    name: req.body.name,
                    email: req.body.email,
                    password: Helper.getHashedPassword(req.body.password),
                    isAdmin: true
                }, (err, doc) => {
                    console.log(doc)
                    if (err) {
                        res.status(500).send({
                            'message': err
                        });
                    } else {
                        res.status(200).send({
                            'message': 'Admin account is created!'
                        });
                    }
                })
            } else {
                res.status(500).send({
                    'message': 'only one admin is allow'
                });
            }
        })
    } else {
        Helper.findUserByEmail(req.body.email, (err, doc) => {
            if (err) {
                res.status(500).send({
                    'message': err
                });
            } else if (!doc) {
                Helper.createUser({
                    name: req.body.name,
                    email: req.body.email,
                    password: Helper.getHashedPassword(req.body.password),
                    isAdmin: false
                }, (err, doc) => {
                    if (err) {
                        res.status(500).send({
                            'message': err
                        });
                    } else {
                        res.status(200).send({
                            'message': 'User account is created!'
                        });
                    }
                })
            } else {
                res.status(200).send({
                    'message': 'User already registered.'
                });
            }
        })
    }
}

exports.setProduct = (req, res) => {
    Helper.createProduct({
        name: req.body.name,
        price: req.body.price,
        user: req.user._id
    }, (err, doc) => {
        if (err) {
            res.status(500).send({
                'message': err
            });
        } else {
            res.status(200).send({
                'message': 'product is created!'
            });
        }
    })
}


exports.getProducts = (req, res) => {

}