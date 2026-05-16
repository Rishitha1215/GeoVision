import React from 'react';

const VisibilityBadge = ({ visibility, className = '' }) => {
  const getBadgeStyle = () => {
    switch (visibility) {
      case 'private':
        return 'bg-gray-800 text-gray-300 border-gray-600';
      case 'authority_only':
        return 'bg-warning-amber/10 text-warning-amber border-warning-amber/30';
      case 'public':
        return 'bg-accent-green/10 text-accent-green border-accent-green/30';
      case 'anonymous_public':
        return 'bg-primary-cyan/10 text-primary-cyan border-primary-cyan/30';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  const getLabel = () => {
    switch (visibility) {
      case 'private': return 'Private';
      case 'authority_only': return 'Authority Shared';
      case 'public': return 'Public';
      case 'anonymous_public': return 'Anonymous Public';
      default: return visibility;
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle()} ${className}`}>
      {getLabel()}
    </span>
  );
};

export default VisibilityBadge;
