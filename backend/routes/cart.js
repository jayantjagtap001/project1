// backend/routes/cart.js
const express = require('express');
const Cart = require('../models/Cart');  // Backend model
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Get the cart for the user
router.get('/', verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);  // Send the cart data to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
