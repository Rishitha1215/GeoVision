import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvidenceById } from '../api';
import SeverityBadge from '../components/SeverityBadge';
import ProofScoreBar from '../components/ProofScoreBar';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import GlassCard from '../components/GlassCard';

const Report = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evidence, setEvidence] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const res = await getEvidenceById(id);
        setEvidence(res.data);
      } catch (error) {
        console.error(error);
        alert('Failed to load evidence report');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, [id, navigate]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-800 animate-pulse"></div>
        <div className="w-16 h-16 rounded-full border-t-4 border-primary-cyan animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
      </div>
      <p className="text-primary-cyan font-mono tracking-widest text-sm uppercase mt-6">Generating Document</p>
      <p className="text-gray-500 text-xs mt-2">Compiling verified incident report...</p>
    </div>
  );

  if (!evidence) return null;

  return (
    <div className="max-w-4xl mx-auto pb-24 printable-report">
      {/* Action Bar (Hidden in print) */}
      <div className="flex justify-between items-center mb-8 no-print">
        <button onClick={() => navigate(-1)} className="btn-ghost flex items-center gap-2 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Dashboard
        </button>
        <button onClick={() => window.print()} className="btn-primary shadow-[0_0_15px_rgba(0,212,255,0.2)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Export Official PDF
        </button>
      </div>

      <GlassCard className="!p-8 md:!p-12 relative overflow-hidden print:!border-none print:!shadow-none print:!bg-white">
        {/* Background Watermark */}
        <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none no-print">
          <svg className="w-96 h-96 text-primary-cyan" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
        </div>

        {/* Header */}
        <div className="border-b border-gray-700/50 pb-6 mb-8 print:border-gray-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-8 h-8 text-primary-cyan print:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.965 11.965 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <h1 className="text-3xl font-heading font-bold text-white print:text-black tracking-wide uppercase">ProofCam Report</h1>
              </div>
              <p className="text-primary-cyan font-mono tracking-widest text-xs uppercase print:text-gray-600">Official Incident Documentation</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Generated On</p>
              <p className="font-mono text-white text-sm bg-gray-900 px-3 py-1.5 rounded border border-gray-800 print:bg-gray-100 print:text-black print:border-gray-300">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Main Info */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-3 text-white print:text-black">{evidence.title}</h2>
          <p className="text-gray-400 mb-6 leading-relaxed print:text-gray-800">{evidence.description || 'No detailed description provided by the operator.'}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/50 p-5 rounded-xl border border-gray-800 print:bg-gray-100 print:border-gray-300">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category</p>
              <p className="font-medium text-gray-200 print:text-black">{evidence.category}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Severity Level</p>
              <SeverityBadge severity={evidence.severity} className="text-xs" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Current Status</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700 print:bg-white print:text-black print:border-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-warning-amber"></span>
                {evidence.status.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Reporting Entity</p>
              <p className="font-mono text-sm text-gray-200 truncate print:text-black">{evidence.visibility === 'anonymous_public' ? 'ANON-OP' : (evidence.userId?.name || 'SYS-USER')}</p>
            </div>
          </div>
        </div>

        {/* Media & Map Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3 border-b border-gray-800 pb-2 print:border-gray-300">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Captured Visual</p>
            </div>
            <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center overflow-hidden border border-gray-800 relative group print:border-gray-300">
              {evidence.mediaType === 'video' ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                   <img src="https://via.placeholder.com/600x400/111827/00d4ff?text=Video+Capsule" alt="Video Placeholder" className="w-full h-full object-cover opacity-50" />
                   <div className="absolute w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                     <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                   </div>
                </div>
              ) : (
                 <img src={evidence.mediaUrl} alt="Evidence" className="w-full h-full object-contain" />
              )}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3 border-b border-gray-800 pb-2 print:border-gray-300">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Verified Coordinates</p>
            </div>
             {evidence.latitude && evidence.longitude && evidence.locationPrivacy !== 'hidden' ? (
               <div className="bg-gray-900 aspect-video rounded-lg overflow-hidden border border-gray-800 relative z-0 print:border-gray-300">
                 <MapContainer center={[evidence.latitude, evidence.longitude]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false} dragging={false}>
                   <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                   <Marker position={[evidence.latitude, evidence.longitude]} />
                 </MapContainer>
               </div>
             ) : (
               <div className="bg-gray-900/50 aspect-video rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-700 text-gray-500 print:border-gray-300">
                 <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                 <span className="text-sm font-mono">Location Masked</span>
               </div>
             )}
             {evidence.address && <p className="text-sm mt-3 text-gray-300 print:text-black line-clamp-2">{evidence.address}</p>}
             {(evidence.latitude && evidence.longitude) && (
               <p className="text-xs font-mono text-primary-cyan mt-1 print:text-gray-600">
                 {evidence.latitude.toFixed(6)}, {evidence.longitude.toFixed(6)} 
                 {evidence.gpsAccuracy && <span className="text-gray-500 ml-2">ACC: ±{evidence.gpsAccuracy.toFixed(1)}m</span>}
               </p>
             )}
          </div>
        </div>

        {/* Cryptographic Verification */}
        <div className="border border-primary-cyan/20 rounded-xl p-6 bg-primary-cyan/5 relative overflow-hidden print:border-gray-300 print:bg-white print:border-2">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-cyan print:hidden"></div>
          
          <div className="flex items-center gap-2 mb-6 border-b border-primary-cyan/20 pb-3 print:border-gray-300">
            <svg className="w-5 h-5 text-primary-cyan print:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.965 11.965 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <p className="text-sm font-bold text-primary-cyan print:text-black uppercase tracking-wider">Cryptographic Attestation</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Evidence Record ID</p>
              <p className="font-mono text-sm text-gray-300 bg-gray-900/80 border border-gray-800 p-2.5 rounded print:bg-gray-100 print:text-black print:border-gray-300">{evidence.evidenceId}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Sealed Timestamp (UTC)</p>
              <p className="font-mono text-sm text-gray-300 bg-gray-900/80 border border-gray-800 p-2.5 rounded print:bg-gray-100 print:text-black print:border-gray-300">{new Date(evidence.capturedAt).toISOString()}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <svg className="w-3 h-3 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
              SHA-256 Block Signature
            </p>
            <p className="font-mono text-xs break-all bg-gray-900 border border-accent-green/30 text-accent-green p-3.5 rounded shadow-[0_0_10px_rgba(0,255,136,0.1)] print:bg-gray-100 print:border-gray-300 print:text-black print:shadow-none">
              {evidence.hash}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-primary-cyan/20 pt-5 print:border-gray-300">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm font-bold text-white print:text-black">Algorithmic Proof Score</p>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">Automated reliability & integrity index</p>
            </div>
            <div className="w-full sm:w-64 bg-gray-900/80 p-3 rounded-lg border border-gray-800 print:bg-transparent print:border-none print:p-0">
              <ProofScoreBar score={evidence.proofScore} />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center print:border-gray-300">
          <svg className="w-6 h-6 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          <p className="text-xs text-gray-500 font-mono tracking-wide uppercase">Automatically Generated by ProofCam Sys-Ops</p>
          <p className="text-[10px] text-gray-600 mt-2">Document verification active. SHA-256 signature guarantees zero-tampering.</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Report;
