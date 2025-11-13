const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  cuisine: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  deliveryTime: {
    type: String,
    required: true
  },
  minOrder: {
    type: Number,
    default: 0
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
