const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Listing = require('../models/Listing');
const auth = require('../middleware/auth');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Get all listings with filters
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, condition, status = 'active' } = req.query;
    
    let query = { status };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    if (condition) {
      query.condition = condition;
    }
    
    const listings = await Listing.find(query)
      .populate('seller', 'name email phone location')
      .sort({ createdAt: -1 });
    
    res.json(listings);
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ message: 'Server error fetching listings' });
  }
});

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('seller', 'name email phone location');
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Increment views
    listing.views += 1;
    await listing.save();
    
    res.json(listing);
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ message: 'Server error fetching listing' });
  }
});

// Create listing
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, category, condition, location } = req.body;
    
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    
    const listing = new Listing({
      title,
      description,
      price: Number(price),
      category,
      condition,
      location,
      images,
      seller: req.userId,
    });
    
    await listing.save();
    await listing.populate('seller', 'name email phone location');
    
    res.status(201).json(listing);
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Server error creating listing' });
  }
});

// Update listing
router.put('/:id', auth, upload.array('images', 5), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Check if user is the seller
    if (listing.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }
    
    const { title, description, price, category, condition, location, status } = req.body;
    
    if (title) listing.title = title;
    if (description) listing.description = description;
    if (price) listing.price = Number(price);
    if (category) listing.category = category;
    if (condition) listing.condition = condition;
    if (location) listing.location = location;
    if (status) listing.status = status;
    
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      listing.images = [...listing.images, ...newImages];
    }
    
    await listing.save();
    await listing.populate('seller', 'name email phone location');
    
    res.json(listing);
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ message: 'Server error updating listing' });
  }
});

// Delete listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Check if user is the seller
    if (listing.seller.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }
    
    await Listing.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ message: 'Server error deleting listing' });
  }
});

// Get user's listings
router.get('/user/my-listings', auth, async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.userId })
      .populate('seller', 'name email phone location')
      .sort({ createdAt: -1 });
    
    res.json(listings);
  } catch (error) {
    console.error('Get user listings error:', error);
    res.status(500).json({ message: 'Server error fetching user listings' });
  }
});

module.exports = router;
