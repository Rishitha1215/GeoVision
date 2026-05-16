const crypto = require('crypto');

const generateHash = (filename, timestamp, lat, lng) => {
  const data = `${filename}-${timestamp}-${lat}-${lng}-${Math.random().toString()}`;
  return crypto.createHash('sha256').update(data).digest('hex');
};

module.exports = generateHash;
