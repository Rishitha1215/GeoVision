import React from 'react';
import GlassCard from './GlassCard';

const StatCard = ({ title, value, icon, tone = 'default' }) => {
  const getToneClasses = () => {
    switch (tone) {
      case 'primary': return 'text-primary-cyan';
      case 'accent': return 'text-accent-green';
      case 'warning': return 'text-warning-amber';
      case 'danger': return 'text-danger-red';
      default: return 'text-gray-300';
    }
  };

  const getBorderClasses = () => {
    switch (tone) {
      case 'primary': return 'border-primary-cyan/30 bg-primary-cyan/5';
      case 'accent': return 'border-accent-green/30 bg-accent-green/5';
      case 'warning': return 'border-warning-amber/30 bg-warning-amber/5';
      case 'danger': return 'border-danger-red/30 bg-danger-red/5';
      default: return 'border-gray-700/50 bg-gray-800/30';
    }
  };

  return (
    <GlassCard className={`flex items-center p-6 ${getBorderClasses()}`}>
      <div className={`p-3 rounded-full mr-4 bg-gray-900/50 border border-gray-700/50 ${getToneClasses()}`}>
        {icon || (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</p>
        <p className={`text-2xl font-bold mt-1 ${getToneClasses()}`}>{value}</p>
      </div>
    </GlassCard>
  );
};

export default StatCard;
