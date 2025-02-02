const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../model/booking');
const User = require('../model/userModel');
const auth = require('../middleware/auth');

// Create booking
router.post("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const { pickupLocation, dropoffLocation, pickupDate, dropoffDate, carId, userId } = req.body;

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate dates
    if (new Date(pickupDate) >= new Date(dropoffDate)) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Check for overlapping bookings
    const existingBooking = await Booking.findOne({
      car: carId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          pickupDate: { $lte: new Date(dropoffDate) },
          dropoffDate: { $gte: new Date(pickupDate) }
        }
      ]
    }).maxTimeMS(5000);

    if (existingBooking) {
      return res.status(400).json({ message: "Car is not available for these dates" });
    }

    const booking = new Booking({
      user: userId,
      car: carId,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
});

// Get user's bookings
router.get('/', auth, async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const bookings = await Booking.find({ user: req.user.userId })
      .populate('car')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Cancel booking
router.put("/:id/cancel", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const booking = await Booking.findById(req.params.id).maxTimeMS(5000);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });

  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({
      message: "Error cancelling booking",
      error: error.message,
      details: "Database operation timed out. Please try again."
    });
  }
});

module.exports = router;