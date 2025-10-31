const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart empty' });

    const products = cart.items.map(i => ({
      productId: i.productId._id,
      name: i.productId.name,
      price: i.productId.price,
      quantity: i.quantity
    }));

    const total = products.reduce((s,p) => s + p.price * p.quantity, 0);

    const order = await Order.create({ userId: req.user.id, products, total });

    // reduce stock
    for (const it of cart.items) {
      const prod = await Product.findById(it.productId._id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - it.quantity);
        await prod.save();
      }
    }

    // clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
