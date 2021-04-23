const UserModel = require('../model/user.model'),
    Helper = require('../config/helper.function');

exports.getUser = (req, res) => {
    Helper.findUsers((err, doc) => {
        if (err) {
            res.status(500).send({
                'message': err
            });
        } else {
            res.status(200).send({
                users: doc
            });
        }
    })
}

exports.editUser = (req, res) => {
    Helper.updateUserById(req.body, (err, doc) => {
        if (err) {
            res.status(500).send({
                'message': err
            });
        } else {
            res.status(200).send({
                'message': 'User profile updated successfully'
            })
        }
    })
}


exports.deleteUser = (req, res) => {
    Helper.deleteUserById(req.params.id, (err, doc) => {
        if (err) {
            res.status(500).send({
                'message': err
            });
        } else if (doc) {
            res.status(200).send({
                'message': 'User profile delete successfully'
            })
        } else {
            res.status(404).send({
                'message': 'User profile not  found'
            })
        }
    })
}

exports.getProducts = (req, res) => {
    Helper.findProductWithOwner((err, doc) => {
        if (err) {
            res.status(500).send({
                'message': err
            });
        } else {
            res.status(200).send({
                products: doc
            })
        }
    })
}


exports.updateProduct = (req, res) => {
    Helper.updateProductById(req.body, (err, doc) => {
        if (err) {
            res.status(500).send({
                'message': err
            });
        } else if (doc) {
            res.status(200).send({
                'message': 'Product Update success'
            })
        } else {
            res.status(404).send({
                'message': 'Product not  found'
            })
        }
    })
}

exports.deleteProduct = (req, res) => {
    Helper.deleteProductById(req.params.id, (err, doc) => {
        if (err) {
            res.status(500).send({
                'message': err
            });
        } else if (doc) {
            res.status(200).send({
                'message': 'Product deleted success'
            })
        } else {
            res.status(404).send({
                'message': 'Product not  found'
            })
        }
    })
}