const UserModel = require('../model/user.model');
const crypto = require('crypto');
const ProductModel = require('../model/product.model');


exports.findAdmin = (cb) => {
    UserModel.findOne({
        isAdmin: true
    }).exec((err, doc) => {
        cb(err, doc);
    });
}

exports.findUsers = (cb) => {
    UserModel.find({ isAdmin: false }, { password: 0 }).exec((err, doc) => cb(err, doc))
}

exports.findUserByEmail = (email, cb) => {
    UserModel.findOne({
        email: email,
        isAdmin: false
    }).exec((err, doc) => cb(err, doc))
}


exports.createUser = (data, cb) => {
    new UserModel(data).save((err, doc) => cb(err, doc));
}

exports.updateUserById = (data, cb) => {
    UserModel.findByIdAndUpdate(data._id, {
        $set: {
            ...(data.name && {
                name: data.name,
            }),
            ...(data.email && {
                email: data.email
            })
        }
    }).exec((err, doc) => cb(err, doc));
}

exports.deleteUserById = (id, cb) => {
    UserModel.findByIdAndDelete(id).exec((err, doc) => {
        if (err) {
            cb(err, null)
        } else if (doc) {
            ProductModel.deleteMany({
                user: doc._id
            }).exec((err, doc) => {
                if (err) console.log(err);
                else console.log(doc);
            });
            cb(null, doc)
        } else {
            cb(null, null)
        }
    })
}


exports.createProduct = (data, cb) => {
    new ProductModel(data).save((err, doc) => cb(err, doc));
}

exports.findProductWithOwner = (cb) => {
    ProductModel.find().populate({ path: 'user', select: 'name' }).exec((err, doc) => cb(err, doc));
}

exports.deleteProductById = (id, cb) => {
    ProductModel.findByIdAndDelete(id).exec((err, doc) => cb(err, doc));
}

exports.updateProductById = (data, cb) => {
    ProductModel.findByIdAndUpdate(data._id, {
        $set: {
            ...(data.name && {
                name: data.name,
            }),
            ...(data.price && {
                price: data.price
            }),
            ...(data.displayStatus && {
                displayStatus: data.displayStatus
            }),
            ...(data.userId && {
                user: data.userId
            })
        }
    }).exec((err, doc) => cb(err, doc));
}

exports.getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

