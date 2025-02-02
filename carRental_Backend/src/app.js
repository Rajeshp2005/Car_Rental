const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');
require('dotenv').config();

const app = express();

app.get('/', (req, res)=> {    
  res.send('Welcome to Car Rental API');  
});
// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database connection helper
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Initialize DB connection
connectDB();

// Import routes
const carRoutes = require('./routes/carRoute');
const userRoutes = require('./routes/userAuth');
const bookingRoutes = require('./routes/booking');

// Use routes
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings',bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});