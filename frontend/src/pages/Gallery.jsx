import React, { useState, useEffect } from 'react';
import { getPublicEvidence } from '../api';
import EvidenceCard from '../components/EvidenceCard';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await getPublicEvidence();
        setEvidenceList(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredList = evidenceList.filter(item => {
    if (filterCategory && item.category !== filterCategory) return false;
    if (filterSeverity && item.severity !== filterSeverity) return false;
    return true;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-800 animate-pulse"></div>
        <div className="w-16 h-16 rounded-full border-t-4 border-primary-cyan animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
      </div>
      <p className="text-primary-cyan font-mono tracking-widest text-sm uppercase mt-6">Loading Public Feed</p>
      <p className="text-gray-500 text-xs mt-2">Retrieving shared proof capsules...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <PageHeader 
          title={
            <span className="flex items-center gap-3">
              <svg className="w-8 h-8 text-primary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Public Gallery
              <span className="bg-gray-800 border border-gray-700 text-primary-cyan text-sm px-3 py-1 rounded-md font-mono tracking-wider ml-2">{evidenceList.length} Capsules</span>
            </span>
          }
          description="A shared feed of publicly visible, cryptographically verified evidence."
        />
        <div className="flex gap-4">
          <Link to="/map" className="btn-secondary py-3 px-6 whitespace-nowrap">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              View on Map
            </span>
          </Link>
          <Link to="/capture" className="btn-primary py-3 px-6 whitespace-nowrap shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Capture
            </span>
          </Link>
        </div>
      </div>

      {evidenceList.length > 0 && (
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 mb-8 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 w-full sm:w-auto mr-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Filters
          </div>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="input-field !py-2 !text-sm bg-gray-900 flex-1 min-w-[150px]">
            <option value="">All Categories</option>
            {['Road Accident', 'Road Damage', 'Fire', 'Flood', 'Unsafe Area', 'Field Inspection', 'Garbage Issue', 'Traffic Issue', 'Personal Safety', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)} className="input-field !py-2 !text-sm bg-gray-900 flex-1 min-w-[150px]">
            <option value="">All Severities</option>
            {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          
          {(filterCategory || filterSeverity) && (
            <button 
              onClick={() => { setFilterCategory(''); setFilterSeverity(''); }}
              className="text-xs text-danger-red hover:text-white transition-colors py-2 px-3 border border-danger-red/30 hover:bg-danger-red rounded-lg"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {evidenceList.length === 0 ? (
        <GlassCard className="text-center py-24 px-6 border-dashed border-gray-700">
          <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">No Public Evidence</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">There are currently no public proof capsules available in the network.</p>
        </GlassCard>
      ) : filteredList.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/30 border border-gray-800 rounded-xl">
          <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <h3 className="text-xl font-bold text-gray-300 mb-2">No Matches Found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more results.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredList.map(evidence => (
            <EvidenceCard key={evidence._id} evidence={evidence} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
