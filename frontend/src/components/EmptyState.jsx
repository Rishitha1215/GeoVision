import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ icon, title, description, actionText, actionLink, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-gray-700/50 rounded-xl bg-gray-800/10">
      <div className="text-gray-500 mb-4">
        {icon || (
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md mb-6">{description}</p>
      
      {actionText && (
        actionLink ? (
          <Link to={actionLink} className="btn-primary">
            {actionText}
          </Link>
        ) : (
          <button onClick={onClick} className="btn-primary">
            {actionText}
          </button>
        )
      )}
    </div>
  );
};

export default EmptyState;
