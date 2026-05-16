import React from 'react';

const LoadingSkeleton = ({ count = 1, type = 'card' }) => {
  const skeletons = Array(count).fill(0);

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {skeletions.map((_, i) => (
          <div key={i} className="h-16 bg-gray-800/50 rounded-lg shimmer-effect border border-gray-700/30"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((_, i) => (
        <div key={i} className="glass-card flex flex-col gap-4">
          <div className="h-48 bg-gray-800/50 rounded-lg shimmer-effect w-full"></div>
          <div className="h-6 bg-gray-800/50 rounded w-3/4 shimmer-effect"></div>
          <div className="h-4 bg-gray-800/50 rounded w-1/2 shimmer-effect"></div>
          <div className="mt-4 flex gap-2">
            <div className="h-6 bg-gray-800/50 rounded-full w-16 shimmer-effect"></div>
            <div className="h-6 bg-gray-800/50 rounded-full w-20 shimmer-effect"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
