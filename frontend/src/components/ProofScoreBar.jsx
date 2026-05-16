import React from 'react';

const ProofScoreBar = ({ score, compact = false }) => {
  let colorClass = "bg-danger-red";
  let bgClass = "bg-danger-red/20";
  
  if (score >= 80) {
    colorClass = "bg-accent-green";
    bgClass = "bg-accent-green/20";
  } else if (score >= 60) {
    colorClass = "bg-warning-amber";
    bgClass = "bg-warning-amber/20";
  } else if (score >= 40) {
    colorClass = "bg-orange-500";
    bgClass = "bg-orange-500/20";
  }

  return (
    <div className={`flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm font-medium'}`}>
      <div className={`flex-1 ${bgClass} rounded-full overflow-hidden ${compact ? 'h-1.5' : 'h-2.5'}`}>
        <div 
          className={`h-full ${colorClass} shimmer-effect rounded-full`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <span className={`font-mono-hash whitespace-nowrap ${colorClass.replace('bg-', 'text-')}`}>
        {score} / 100
      </span>
    </div>
  );
};

export default ProofScoreBar;
