require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./src/model/Admin'); // Path to Admin model

dotenv.config(); // Load environment variables

async function createAdmin() {
  try {
    // Check if the admin user already exists
    const adminExists = await Admin.findOne({ username: 'Admin' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the password manually before saving
    const hashedPassword = await bcrypt.hash('admin', 10); 

    // Create new admin user
    const admin = new Admin({
      username: 'Admin',
      password: hashedPassword,
    });

    // Save the admin user to the database
    await admin.save();
    console.log('Admin user created successfully!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // Close MongoDB connection
    mongoose.connection.close();
  }
}

// Connect to MongoDB using the URL from .env file
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(createAdmin)
.catch((err) => console.error('Error connecting to MongoDB:', err));
