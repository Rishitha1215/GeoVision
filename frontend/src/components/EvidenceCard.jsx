import React from 'react';
import { Link } from 'react-router-dom';
import SeverityBadge from './SeverityBadge';
import ProofScoreBar from './ProofScoreBar';
import MediaPreview from './MediaPreview';
import VisibilityBadge from './VisibilityBadge';

const EvidenceCard = ({ evidence }) => {
  return (
    <div className="glass-card hover:border-gray-600 transition-colors flex flex-col h-full overflow-hidden p-0 relative group">
      <div className="relative">
        <MediaPreview 
          mediaUrl={evidence.mediaUrl} 
          mediaType={evidence.mediaType} 
          className="w-full h-48 rounded-t-xl" 
        />
        <div className="absolute top-3 left-3">
          <SeverityBadge severity={evidence.severity} />
        </div>
        <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded border border-gray-700 text-xs font-bold text-gray-200">
          {new Date(evidence.capturedAt).toLocaleDateString()}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-1 flex justify-between items-start gap-2">
          <p className="text-xs font-mono-hash text-primary-cyan truncate">{evidence.evidenceId}</p>
        </div>
        
        <h3 className="font-bold text-lg text-white line-clamp-1 mb-3 group-hover:text-primary-cyan transition-colors">
          {evidence.title}
        </h3>
        
        <div className="text-sm text-gray-400 mb-5 flex-grow space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            <span className="truncate">{evidence.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            <VisibilityBadge visibility={evidence.visibility} />
          </div>
          {evidence.address && (
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="line-clamp-2 text-xs leading-relaxed">{evidence.address}</span>
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-700/50">
          <div className="mb-4">
            <ProofScoreBar score={evidence.proofScore} compact={true} />
          </div>
          <Link to={`/evidence/${evidence._id}`} className="btn-secondary w-full text-center block py-2 text-sm">
            Open Control Panel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EvidenceCard;
