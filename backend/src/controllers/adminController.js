const Evidence = require('../models/Evidence');

const getAdminEvidence = async (req, res) => {
  try {
    const { category, severity, status, visibility } = req.query;
    let query = {};
    if (category) query.category = category;
    if (severity) query.severity = severity;
    if (status) query.status = status;
    if (visibility) query.visibility = visibility;

    const evidence = await Evidence.find(query).populate('userId', 'name email').sort('-createdAt');
    res.json(evidence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdminStats = async (req, res) => {
  try {
    const total = await Evidence.countDocuments();
    const criticalCount = await Evidence.countDocuments({ severity: 'Critical' });
    const underReviewCount = await Evidence.countDocuments({ status: 'Under Review' });
    const resolvedCount = await Evidence.countDocuments({ status: 'Resolved' });
    
    const recent = await Evidence.find().populate('userId', 'name').sort('-createdAt').limit(5);
    
    res.json({ total, criticalCount, underReviewCount, resolvedCount, recent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdminEvidence, getAdminStats };
