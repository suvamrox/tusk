const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'users',
    timestamps: true,
});

module.exports = mongoose.model('users', UsersSchema);
