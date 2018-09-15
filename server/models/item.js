var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    artist: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    stock: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item
