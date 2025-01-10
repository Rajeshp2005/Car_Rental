const express = require("express");
const cors = require("cors");
const User = require("./model/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const connectDB = require("./dbConnection/database");
const Feedback = require("./model/feedbackModel");

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "*", // Your frontend URL
  })
);

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CarRental API!" });
});

// Sign up route
app.post("/api/signup", async (req, res) => {
  try {
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const { name, email, password } = req.body;

    // Check if user already exists with timeout
    const existingUser = await User.findOne({ email: email })
      .maxTimeMS(5000)
      .exec();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user with timeout using Promise.race
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
app.post("/api/signin", async (req, res) => {
  try {
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const { email, password } = req.body;

    // Find user with timeout
    const user = await User.findOne({ email: email }).maxTimeMS(5000).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Return user data (excluding password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({ message: "Login successful", user: userData });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Error during login",
      error: error.message,
      details: "Database operation timed out. Please try again.",
    });
  }
});
// Get all users route
app.get("/api/users", async (req, res) => {
  try {
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    // Fetch all users with timeout
    const users = await User.find().select('-password').maxTimeMS(5000).exec();
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
      details: "Database operation timed out. Please try again.",
    });
  }
});

// Feedback route
app.post("/api/feedback", async (req, res) => {
  try {
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const {  message, rating } = req.body;

    // Create new feedback
    const feedback = new Feedback({
      
      message,
      rating,
    });

    // Save feedback with timeout using Promise.race
    const savePromise = feedback.save();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Save operation timed out")), 5000);
    });

    await Promise.race([savePromise, timeoutPromise]);
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({
      message: "Error submitting feedback",
      error: error.message,
      details: "Database operation timed out. Please try again.",
    });
  }
});

// Get all feedbacks route
app.get("/api/feedbacks", async (req, res) => {
  try {
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    // Fetch all feedbacks with timeout
    const feedbacks = await Feedback.find().populate('user', 'name email').maxTimeMS(5000).exec();
    res.json(feedbacks);
  } catch (error) {
    console.error("Get feedbacks error:", error);
    res.status(500).json({
      message: "Error fetching feedbacks",
      error: error.message,
      details: "Database operation timed out. Please try again.",
    });
  }
});
    // Save feedback with timeout
    //show feedbacks from database
// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Add car route
app.post("/api/cars", async (req, res) => {
  try {
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const { make, model, year, price } = req.body;

    // Create new car
    const car = new Car({
      make,
      model,
      year,
      price,
    });

    // Save car with timeout using Promise.race
    const savePromise = car.save();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Save operation timed out")), 5000);
    });

    await Promise.race([savePromise, timeoutPromise]);
    res.status(201).json({ message: "Car added successfully" });
  } catch (error) {
    console.error("Add car error:", error);
    res.status(500).json({
      message: "Error adding car",
      error: error.message,
      details: "Database operation timed out. Please try again.",
    });
  }
});

// Get all cars route
app.get("/api/cars", async (req, res) => {
  try {
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "Database connection error" });
    }

    // Fetch all cars with timeout
    const cars = await Car.find().maxTimeMS(5000).exec();
    res.json(cars);
  } catch (error) {
    console.error("Get cars error:", error);
    res.status(500).json({
      message: "Error fetching cars",
      error: error.message,
      details: "Database operation timed out. Please try again.",
    });
  }
});