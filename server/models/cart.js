const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new Schema({
  userId : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  listItem: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  quantity: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
},{
  timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart