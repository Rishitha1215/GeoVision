const calculateProofScore = (lat, lng, capturedAt, hash, gpsAccuracy) => {
  let score = 50;
  if (lat && lng) score += 20;
  if (capturedAt) score += 10;
  if (hash) score += 10;
  if (gpsAccuracy && gpsAccuracy <= 30) score += 10;
  return Math.min(score, 100);
};

module.exports = calculateProofScore;
