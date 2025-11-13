const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { restaurant, items, totalAmount, deliveryAddress, paymentMethod, notes } = req.body;

    const order = new Order({
      user: req.userId,
      restaurant,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      notes
    });

    await order.save();
    await order.populate('restaurant', 'name');
    await order.populate('items.menuItem', 'name price');

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/user', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('restaurant', 'name image')
      .populate('items.menuItem', 'name price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name image address')
      .populate('items.menuItem', 'name price image')
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.user._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('restaurant', 'name');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
