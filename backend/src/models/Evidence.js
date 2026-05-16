const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  action: String,
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const evidenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ['photo', 'video'], required: true },
  originalFileName: { type: String },
  fileSize: { type: Number },
  latitude: { type: Number },
  longitude: { type: Number },
  address: { type: String },
  gpsAccuracy: { type: Number },
  capturedAt: { type: Date },
  evidenceId: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  proofScore: { type: Number, required: true },
  category: { type: String, enum: ['Road Accident', 'Road Damage', 'Fire', 'Flood', 'Unsafe Area', 'Field Inspection', 'Garbage Issue', 'Traffic Issue', 'Personal Safety', 'Other'], default: 'Other' },
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Low' },
  visibility: { type: String, enum: ['private', 'draft', 'authority_only', 'public', 'anonymous_public'], default: 'private' },
  locationPrivacy: { type: String, enum: ['exact', 'approximate', 'hidden', 'authority_only_exact'], default: 'exact' },
  status: { type: String, enum: ['Captured', 'Private', 'Submitted', 'Under Review', 'Resolved', 'Closed'], default: 'Private' },
  isBlurred: { type: Boolean, default: false },
  isAnonymous: { type: Boolean, default: false },
  accessLog: [accessLogSchema]
}, { timestamps: true });

module.exports = mongoose.model('Evidence', evidenceSchema);
