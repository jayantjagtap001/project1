const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');  // Only import Cart once
const Product = require('../models/Product');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Place an order
router.post('/add-to-cart', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
      const cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
      await cart.save();
      res.status(201).send('Product added to cart');
    } catch (err) {
      res.status(500).send('Error adding product to cart');
    }
});

router.post('/', verifyToken, async (req, res) => {
  const { shippingAddress } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = [];
    let totalPrice = 0;

    for (const item of cart.products) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: 'Product out of stock or unavailable' });
      }

      product.stock -= item.quantity;
      await product.save();

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalPrice += product.price * item.quantity;
    }

    const order = new Order({
      userId: req.user.id,
      products: orderItems,
      totalPrice,
      shippingAddress,
    });

    await order.save();
    await cart.remove(); // Clear the cart after the order

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
