const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/protected/dashboard
// @desc    Get some protected data for the dashboard
// @access  Private (because we are using the authMiddleware)
router.get('/dashboard', authMiddleware, (req, res) => {
  // req.user is available here because the middleware added it
  res.json({ 
    message: `Welcome user ${req.user.id}! This is protected data.`,
    user: req.user 
  });
});

module.exports = router;