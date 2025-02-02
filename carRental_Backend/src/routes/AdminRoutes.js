const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Added missing bcrypt import
const Admin = require('../model/Admin');
const authMiddleware = require('../middleware/authMiddleware');

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,  // Ensure JWT_SECRET is used
      { expiresIn: '1h' }
    );

    res.json({ token, admin: { id: admin._id, username: admin.username } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify Admin Token
router.get('/verify', authMiddleware.adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
