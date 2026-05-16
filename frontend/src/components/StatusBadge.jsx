import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'captured':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'submitted':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'under_review':
        return 'bg-warning-amber/10 text-warning-amber border-warning-amber/30';
      case 'resolved':
        return 'bg-accent-green/10 text-accent-green border-accent-green/30';
      case 'closed':
        return 'bg-gray-800 text-gray-400 border-gray-600';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-600';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'captured': return 'Captured';
      case 'submitted': return 'Submitted';
      case 'under_review': return 'Under Review';
      case 'resolved': return 'Resolved';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle()} ${className}`}>
      {getLabel()}
    </span>
  );
};

export default StatusBadge;
