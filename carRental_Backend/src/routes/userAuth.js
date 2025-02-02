
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const mongoose = require('mongoose');

// Sign up route
router.post("/signup", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email })
      .maxTimeMS(5000)
      .exec();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savePromise = user.save();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Save operation timed out")), 5000);
    });

    await Promise.race([savePromise, timeoutPromise]);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
      details: "Database operation timed out. Please try again.",
    });
  }
});

// Sign in route
router.post("/signin", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).maxTimeMS(5000).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({ 
      message: "Login successful", 
      user: userData,
      token: token 
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
});

// Get all users route
router.get("/users", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const users = await User.find().select('-password').maxTimeMS(5000).exec();
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

module.exports = router;