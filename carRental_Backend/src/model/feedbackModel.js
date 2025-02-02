const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the feedback schema
const feedbackSchema = new Schema({
  
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;