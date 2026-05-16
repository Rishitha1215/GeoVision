const generateEvidenceId = () => {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `GEO-${date}-${rand}`;
};

const generateReportId = () => {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `RPT-${date}-${rand}`;
};

module.exports = { generateEvidenceId, generateReportId };
