const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
  },
  password: {
      type: String,
      required: true
  },
 
  createdAt: {
      type: Date,
      default: Date.now
  }
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;