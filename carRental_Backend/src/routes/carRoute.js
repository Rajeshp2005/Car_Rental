const express = require('express');
const router = express.Router();
const Car = require('../model/carModel');
const multer = require('multer');
const path = require('path');

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create new car
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const carData = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : ''
    };
    
    const car = new Car(carData);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get popular cars
router.get('/popular', async (req, res) => {
  try {
    const popularCars = await Car.find({
      isAvailable: true,
      rating: { $gte: 4 }  // Cars with rating 4 or above
    })
    .sort({ 
      bookingCount: -1,    // Sort by number of bookings
      rating: -1           // Then by rating
    })
    .limit(6);            // Limit to 6 popular cars
    
    res.json(popularCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single car
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update car
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const carData = {
      ...req.body
    };
    
    if (req.file) {
      carData.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const car = await Car.findByIdAndUpdate(
      req.params.id, 
      carData,
      { new: true }
    );
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete car
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;