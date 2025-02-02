const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    // required: true
  },
  features: [{
    type: String
  }],
  availability: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['SUV', 'Sedan', 'Sports', 'Luxury'],
    required: true
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual'],
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  review: {
    type: String,
  },
  bookingCount: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);