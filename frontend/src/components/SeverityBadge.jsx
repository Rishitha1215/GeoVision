import React from 'react';

const SeverityBadge = ({ severity, className = '' }) => {
  let badgeClass = `px-2.5 py-0.5 text-xs font-semibold rounded-full border ${className} `;
  
  if (severity === 'Critical') {
    badgeClass += "bg-danger-red/10 text-danger-red border-danger-red/30 animate-pulse-red";
  } else if (severity === 'High') {
    badgeClass += "bg-orange-500/10 text-orange-400 border-orange-500/30";
  } else if (severity === 'Medium') {
    badgeClass += "bg-warning-amber/10 text-warning-amber border-warning-amber/30";
  } else {
    badgeClass += "bg-accent-green/10 text-accent-green border-accent-green/30";
  }

  return (
    <span className={badgeClass}>{severity}</span>
  );
};

export default SeverityBadge;
