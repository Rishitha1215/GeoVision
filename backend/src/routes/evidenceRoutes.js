const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {
  uploadEvidence, getMyVault, getPublicEvidence, getEvidenceById,
  updateVisibility, updateStatus, getReport, deleteEvidence
} = require('../controllers/evidenceController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB

router.get('/public', getPublicEvidence);
router.post('/upload', protect, upload.single('media'), uploadEvidence);
router.get('/my-vault', protect, getMyVault);
router.get('/:id', protect, getEvidenceById);
router.put('/:id/visibility', protect, updateVisibility);
router.put('/:id/status', protect, admin, updateStatus);
router.get('/:id/report', protect, getReport);
router.delete('/:id', protect, deleteEvidence);

module.exports = router;
