const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
