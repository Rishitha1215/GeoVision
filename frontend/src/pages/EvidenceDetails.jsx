import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvidenceById, updateVisibility, deleteEvidence } from '../api';
import MediaPreview from '../components/MediaPreview';
import SeverityBadge from '../components/SeverityBadge';
import ProofScoreBar from '../components/ProofScoreBar';
import AccessLogTimeline from '../components/AccessLogTimeline';
import GlassCard from '../components/GlassCard';
import PageHeader from '../components/PageHeader';

const EvidenceDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evidence, setEvidence] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvidence = async () => {
    try {
      const res = await getEvidenceById(id);
      setEvidence(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to load evidence or not authorized');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, [id]);

  const handleVisibilityChange = async (updates) => {
    try {
      await updateVisibility(id, updates);
      fetchEvidence();
    } catch (error) {
      console.error(error);
      alert('Update failed');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to permanently delete this evidence? This action cannot be undone.')) {
      try {
        await deleteEvidence(id);
        navigate('/vault');
      } catch (error) {
        console.error(error);
        alert('Delete failed');
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <svg className="animate-spin h-10 w-10 text-primary-cyan mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-gray-400 font-mono tracking-widest text-sm uppercase">Loading Evidence Data...</p>
    </div>
  );

  if (!evidence) return null;

  const isOwner = user && evidence.userId?._id === user._id;

  return (
    <div className="max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono-hash text-2xl md:text-3xl font-bold text-primary-cyan">{evidence.evidenceId}</span>
            <span className="bg-accent-green/20 border border-accent-green/50 text-accent-green px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Geo-Verified
            </span>
            {evidence.isBlurred && <span className="bg-gray-800 border border-gray-600 text-gray-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Blur Enabled</span>}
          </div>
          <p className="text-gray-400 font-medium">{evidence.title}</p>
        </div>
        
        {isOwner && (
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => navigate(`/report/${id}`)} className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 border border-gray-700 hover:border-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Generate Report
            </button>
            <button onClick={handleDelete} className="bg-danger-red/10 hover:bg-danger-red/20 text-danger-red px-5 py-2.5 rounded-lg font-bold text-sm transition-colors border border-danger-red/30 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <GlassCard className="p-0 overflow-hidden border-gray-700/50 shadow-2xl relative group">
            <div className="absolute inset-0 border-2 border-primary-cyan/0 group-hover:border-primary-cyan/50 rounded-xl transition-all pointer-events-none z-10"></div>
            <MediaPreview mediaUrl={evidence.mediaUrl} mediaType={evidence.mediaType} className="w-full h-[400px] object-cover bg-black" />
          </GlassCard>

          <GlassCard className="border-t-4 border-t-primary-cyan">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Cryptographic Proof
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Integrity Score</p>
                  <span className="text-primary-cyan font-mono font-bold">{evidence.proofScore}/100</span>
                </div>
                <ProofScoreBar score={evidence.proofScore} />
              </div>
              
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">SHA-256 Immutable Hash</p>
                <div className="flex items-center gap-2 bg-gray-900/80 border border-gray-700 rounded-lg p-1 pr-2">
                  <code className="text-primary-cyan p-2 block truncate w-full text-xs font-mono">{evidence.hash}</code>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(evidence.hash); alert('Hash copied to clipboard'); }}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded-md transition-colors shrink-0 flex items-center justify-center"
                    title="Copy Hash"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>

          {isOwner && (
            <GlassCard>
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Evidence Control
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  onClick={() => handleVisibilityChange({ visibility: 'private' })} 
                  className={`bg-gray-900 border ${evidence.visibility === 'private' ? 'border-primary-cyan text-primary-cyan' : 'border-gray-700 text-gray-300 hover:border-gray-500'} p-3 rounded-xl text-sm font-bold transition-all text-left flex items-center justify-between`}
                >
                  <span>Private (GeoVault)</span>
                  {evidence.visibility === 'private' && <span className="w-2 h-2 rounded-full bg-primary-cyan"></span>}
                </button>
                <button 
                  onClick={() => handleVisibilityChange({ visibility: 'authority_only' })} 
                  className={`bg-gray-900 border ${evidence.visibility === 'authority_only' ? 'border-warning-yellow text-warning-yellow' : 'border-gray-700 text-gray-300 hover:border-gray-500'} p-3 rounded-xl text-sm font-bold transition-all text-left flex items-center justify-between`}
                >
                  <span>Authority Only</span>
                  {evidence.visibility === 'authority_only' && <span className="w-2 h-2 rounded-full bg-warning-yellow"></span>}
                </button>
                <button 
                  onClick={() => handleVisibilityChange({ visibility: 'public' })} 
                  className={`bg-gray-900 border ${evidence.visibility === 'public' && !evidence.isAnonymous ? 'border-accent-green text-accent-green' : 'border-gray-700 text-gray-300 hover:border-gray-500'} p-3 rounded-xl text-sm font-bold transition-all text-left flex items-center justify-between`}
                >
                  <span>Publish Publicly</span>
                  {evidence.visibility === 'public' && !evidence.isAnonymous && <span className="w-2 h-2 rounded-full bg-accent-green"></span>}
                </button>
                <button 
                  onClick={() => handleVisibilityChange({ visibility: 'anonymous_public', isAnonymous: true })} 
                  className={`bg-gray-900 border ${evidence.visibility === 'anonymous_public' || evidence.isAnonymous ? 'border-accent-green text-accent-green' : 'border-gray-700 text-gray-300 hover:border-gray-500'} p-3 rounded-xl text-sm font-bold transition-all text-left flex items-center justify-between`}
                >
                  <span>Anonymous Report</span>
                  {(evidence.visibility === 'anonymous_public' || evidence.isAnonymous) && <span className="w-2 h-2 rounded-full bg-accent-green"></span>}
                </button>
                
                <div className="col-span-1 sm:col-span-2 mt-2 pt-4 border-t border-gray-800">
                  <button 
                    onClick={() => handleVisibilityChange({ isBlurred: !evidence.isBlurred })} 
                    className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 p-3 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2"
                  >
                    {evidence.isBlurred ? (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> Unblur Media</>
                    ) : (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> Apply Blur Filter</>
                    )}
                  </button>
                </div>
              </div>
            </GlassCard>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <GlassCard className="border-t-4 border-t-gray-500">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Evidence Record
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</p>
                  <p className="text-gray-200 text-sm font-medium">{evidence.category}</p>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Severity</p>
                  <SeverityBadge severity={evidence.severity} />
                </div>
              </div>

              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Description</p>
                <p className="text-gray-300 text-sm">{evidence.description || 'No additional notes provided.'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Time Captured</p>
                  <p className="text-gray-200 text-sm font-mono">{new Date(evidence.capturedAt).toLocaleString()}</p>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">File Status</p>
                  <p className="text-gray-200 text-sm capitalize">{evidence.status}</p>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b border-gray-800 pb-2">Geospatial Data</p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Latitude</p>
                    <p className="text-primary-cyan font-mono text-sm">{evidence.latitude?.toFixed(6) || 'N/A'}°</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Longitude</p>
                    <p className="text-primary-cyan font-mono text-sm">{evidence.longitude?.toFixed(6) || 'N/A'}°</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Accuracy</p>
                    <p className="text-gray-300 text-sm">{evidence.gpsAccuracy ? `±${evidence.gpsAccuracy.toFixed(1)}m` : 'N/A'}</p>
                  </div>
                  <div className="col-span-2 mt-1">
                    <p className="text-[10px] text-gray-500 uppercase">Location Reference</p>
                    <p className="text-gray-300 text-sm">{evidence.address || 'Unspecified location'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Source File</p>
                  <p className="text-gray-300 text-sm truncate max-w-[200px]">{evidence.originalFileName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Size</p>
                  <p className="text-gray-300 text-sm font-mono">{(evidence.fileSize / (1024*1024)).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="border-t-4 border-t-accent-green">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Audit Trail
            </h3>
            <div className="bg-gray-900/30 rounded-xl p-2 border border-gray-800/50">
              <AccessLogTimeline logs={evidence.accessLog} />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default EvidenceDetails;
