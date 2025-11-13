const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get menu items for a restaurant
router.get('/:restaurantId', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ 
      restaurant: req.params.restaurantId,
      isAvailable: true 
    }).populate('restaurant', 'name');
    
    res.json(menuItems);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single menu item
router.get('/item/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('restaurant', 'name');
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(menuItem);
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new menu item (for seeding/admin)
router.post('/', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
