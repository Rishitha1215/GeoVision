const Evidence = require('../models/Evidence');
const { generateEvidenceId, generateReportId } = require('../utils/generateEvidenceId');
const generateHash = require('../utils/generateHash');
const calculateProofScore = require('../utils/calculateProofScore');

const uploadEvidence = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No media file provided' });

    const { title, description, latitude, longitude, address, gpsAccuracy, category, severity, visibility, locationPrivacy } = req.body;
    
    const mediaType = req.file.mimetype.startsWith('video/') ? 'video' : 'photo';
    const capturedAt = new Date();
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    const evidenceId = generateEvidenceId();
    const hash = generateHash(req.file.originalname, capturedAt.getTime(), lat, lng);
    const proofScore = calculateProofScore(lat, lng, capturedAt, hash, gpsAccuracy);

    const evidence = await Evidence.create({
      userId: req.user._id,
      title,
      description,
      mediaUrl: `/uploads/${req.file.filename}`,
      mediaType,
      originalFileName: req.file.originalname,
      fileSize: req.file.size,
      latitude: lat || null,
      longitude: lng || null,
      address,
      gpsAccuracy,
      capturedAt,
      evidenceId,
      hash,
      proofScore,
      category,
      severity,
      visibility: visibility || 'private',
      locationPrivacy: locationPrivacy || 'exact',
      status: 'Private',
      accessLog: [{ action: 'Proof Capsule Created', timestamp: capturedAt }]
    });

    res.status(201).json(evidence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyVault = async (req, res) => {
  try {
    const evidence = await Evidence.find({ userId: req.user._id }).sort('-createdAt');
    res.json(evidence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPublicEvidence = async (req, res) => {
  try {
    const evidence = await Evidence.find({ visibility: { $in: ['public', 'anonymous_public'] } })
      .populate('userId', 'name')
      .sort('-createdAt');
    res.json(evidence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvidenceById = async (req, res) => {
  try {
    const evidence = await Evidence.findById(req.params.id).populate('userId', 'name');
    if (!evidence) return res.status(404).json({ message: 'Evidence not found' });
    
    const isOwner = evidence.userId._id.toString() === req.user?._id.toString();
    const isAdmin = req.user?.role === 'admin';
    const isPublic = ['public', 'anonymous_public'].includes(evidence.visibility);
    const isAuthority = evidence.visibility === 'authority_only' && isAdmin;

    if (isOwner || isAdmin || isPublic || isAuthority) {
      res.json(evidence);
    } else {
      res.status(403).json({ message: 'Not authorized to access this evidence' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVisibility = async (req, res) => {
  try {
    const { visibility, isBlurred, isAnonymous } = req.body;
    const evidence = await Evidence.findById(req.params.id);
    if (!evidence) return res.status(404).json({ message: 'Not found' });
    if (evidence.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });

    if (visibility !== undefined) evidence.visibility = visibility;
    if (isBlurred !== undefined) evidence.isBlurred = isBlurred;
    if (isAnonymous !== undefined) evidence.isAnonymous = isAnonymous;
    if (visibility === 'private') evidence.status = 'Private';
    if (visibility === 'authority_only') evidence.status = 'Submitted';
    
    evidence.accessLog.unshift({ action: `Visibility updated to ${visibility || evidence.visibility}`, timestamp: new Date() });
    
    const updated = await evidence.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const evidence = await Evidence.findById(req.params.id);
    if (!evidence) return res.status(404).json({ message: 'Not found' });
    
    evidence.status = status;
    evidence.accessLog.unshift({ action: `Status updated to ${status} by admin`, timestamp: new Date() });
    const updated = await evidence.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReport = async (req, res) => {
  try {
    const evidence = await Evidence.findById(req.params.id).populate('userId', 'name email');
    if (!evidence) return res.status(404).json({ message: 'Not found' });
    
    res.json({ evidence, reportId: generateReportId() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvidence = async (req, res) => {
  try {
    const evidence = await Evidence.findById(req.params.id);
    if (!evidence) return res.status(404).json({ message: 'Not found' });
    if (evidence.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await evidence.deleteOne();
    res.json({ message: 'Evidence removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadEvidence, getMyVault, getPublicEvidence, getEvidenceById,
  updateVisibility, updateStatus, getReport, deleteEvidence
};
