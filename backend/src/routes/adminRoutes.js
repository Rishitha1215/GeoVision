const express = require('express');
const router = express.Router();
const { getAdminEvidence, getAdminStats } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/evidence', protect, admin, getAdminEvidence);
router.get('/stats', protect, admin, getAdminStats);

module.exports = router;
