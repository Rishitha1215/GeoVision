import React, { useState, useEffect } from 'react';
import { getAdminStats, getAdminEvidence } from '../api';
import SeverityBadge from '../components/SeverityBadge';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const statsRes = await getAdminStats();
        setStats(statsRes.data);
        
        const evRes = await getAdminEvidence();
        setEvidenceList(evRes.data);
      } catch (error) {
        console.error(error);
        alert('Access Denied. Admins only.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [navigate]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-800 animate-pulse"></div>
        <div className="w-16 h-16 rounded-full border-t-4 border-danger-red animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-danger-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.965 11.965 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
      </div>
      <p className="text-danger-red font-mono tracking-widest text-sm uppercase mt-6">Authenticating Overlord</p>
      <p className="text-gray-500 text-xs mt-2">Connecting to secure command center...</p>
    </div>
  );

  return (
    <div className="pb-24 max-w-7xl mx-auto">
      <div className="mb-10">
        <PageHeader 
          title={
            <span className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-danger-red/10 flex items-center justify-center text-danger-red border border-danger-red/30">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              Command Center
              <span className="bg-danger-red/20 border border-danger-red/50 text-danger-red text-[10px] px-2 py-1 rounded-sm font-mono tracking-widest uppercase ml-2 animate-pulse">SYS_ADMIN</span>
            </span>
          }
          description="Global intelligence overview and system-wide evidence management."
        />
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <GlassCard className="!border-primary-cyan/30 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-cyan/50"></div>
            <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <svg className="w-24 h-24 text-primary-cyan" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2 relative z-10">Total Evidence</p>
            <p className="text-5xl font-mono text-white relative z-10 font-black">{stats.totalEvidence}</p>
          </GlassCard>
          
          <GlassCard className="!border-danger-red/30 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-danger-red/50"></div>
            <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <svg className="w-24 h-24 text-danger-red" fill="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2 relative z-10">Critical Issues</p>
            <p className="text-5xl font-mono text-danger-red relative z-10 font-black drop-shadow-[0_0_8px_rgba(255,59,59,0.5)]">{stats.criticalEvidence}</p>
          </GlassCard>
          
          <GlassCard className="!border-warning-amber/30 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-warning-amber/50"></div>
            <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <svg className="w-24 h-24 text-warning-amber" fill="currentColor" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2 relative z-10">Publicly Shared</p>
            <p className="text-5xl font-mono text-warning-amber relative z-10 font-black">{stats.publicEvidence}</p>
          </GlassCard>
          
          <GlassCard className="text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-500/50"></div>
            <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2 relative z-10">Registered Agents</p>
            <p className="text-5xl font-mono text-white relative z-10 font-black">{stats.totalUsers}</p>
          </GlassCard>
        </div>
      )}

      {/* Global Evidence List */}
      <GlassCard className="!p-0 overflow-hidden border border-gray-700">
        <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            <h3 className="text-lg font-bold text-white tracking-wide">Global Intelligence Feed</h3>
          </div>
          <div className="text-[10px] text-gray-500 font-mono flex items-center gap-2 bg-gray-950 px-3 py-1.5 rounded-full border border-gray-800">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></span>
            LIVE SYNC ACTIVE
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-900/80 text-gray-400 uppercase text-[10px] tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4 border-b border-gray-800">Evidence ID</th>
                <th className="px-6 py-4 border-b border-gray-800">Title</th>
                <th className="px-6 py-4 border-b border-gray-800">Severity</th>
                <th className="px-6 py-4 border-b border-gray-800">Visibility</th>
                <th className="px-6 py-4 border-b border-gray-800 text-center">Score</th>
                <th className="px-6 py-4 border-b border-gray-800">Captured</th>
                <th className="px-6 py-4 border-b border-gray-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {evidenceList.map(ev => (
                <tr key={ev._id} className="border-b border-gray-800 hover:bg-primary-cyan/5 transition-colors group">
                  <td className="px-6 py-4 font-mono text-primary-cyan text-xs opacity-80 group-hover:opacity-100">{ev.evidenceId.substring(0, 12)}...</td>
                  <td className="px-6 py-4 font-semibold text-white max-w-xs truncate">{ev.title}</td>
                  <td className="px-6 py-4"><SeverityBadge severity={ev.severity} /></td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono bg-gray-800 px-2 py-1 rounded text-gray-300 capitalize border border-gray-700">
                      {ev.visibility.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-mono font-bold px-2 py-1 rounded text-xs ${ev.proofScore >= 80 ? 'bg-accent-green/10 text-accent-green border border-accent-green/20' : 'bg-warning-amber/10 text-warning-amber border border-warning-amber/20'}`}>
                      {ev.proofScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-mono">
                    {new Date(ev.capturedAt).toISOString().split('T')[0]}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link to={`/evidence/${ev._id}`} className="text-primary-cyan hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">Inspect</Link>
                      <Link to={`/report/${ev._id}`} className="text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                        PDF
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {evidenceList.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <p className="text-lg">No evidence records exist in the global database.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default AdminDashboard;
