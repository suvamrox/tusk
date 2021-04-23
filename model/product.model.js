const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: Number,
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    displayStatus: {
        type: Boolean, default: true
    }
}, {
    collection: 'product',
    timestamps: true,
});

module.exports = mongoose.model('product', ProductSchema);
