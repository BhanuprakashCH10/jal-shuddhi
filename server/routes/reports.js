const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// @route   POST /api/reports
// @desc    Submit a new waste report
router.post('/', async (req, res) => {
  try {
    const { category, location, description, userId, imageUrl } = req.body;

    // Create a new Report
    const newReport = new Report({
      userId,
      category,
      location,
      description,
      imageUrl // We will handle the real image upload later, for now, it's a string/placeholder
    });

    const report = await newReport.save();
    res.status(201).json(report);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reports
// @desc    Get all reports
router.get('/', async (req, res) => {
  try {
    // .populate('userId', 'name') -> Go to 'users' collection, find this ID, and just give me the 'name'
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name'); 
      
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/reports/:id/status
// @desc    Update report status (e.g., Pending -> Cleaned)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    report.status = status;
    await report.save();

    res.json(report); // Send back the updated report
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;