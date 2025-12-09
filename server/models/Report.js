const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links the report to the user who submitted it
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String, // We will store the URL of the uploaded image
  },
  status: {
    type: String,
    default: 'Pending', // Pending -> In Progress -> Cleaned
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', ReportSchema);