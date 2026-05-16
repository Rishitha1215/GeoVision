import React from 'react';

const AccessLogTimeline = ({ logs }) => {
  if (!logs || logs.length === 0) return <p className="text-gray-500 italic p-4 bg-gray-800/30 rounded-lg">No access logs available.</p>;

  return (
    <div className="relative border-l border-primary-cyan/30 ml-4 space-y-6 py-2">
      {logs.map((log, i) => (
        <div key={i} className="relative pl-6">
          <div className="absolute w-3 h-3 bg-primary-cyan rounded-full -left-[6.5px] top-1 shadow-[0_0_8px_var(--primary-cyan)]"></div>
          <p className="font-semibold text-gray-200">{log.action}</p>
          <p className="text-xs text-gray-500 mt-1 font-mono-hash">{new Date(log.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AccessLogTimeline;
