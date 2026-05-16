import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SeverityBadge from '../components/SeverityBadge';
import ProofScoreBar from '../components/ProofScoreBar';
import AccessLogTimeline from '../components/AccessLogTimeline';

const Landing = () => {
  const mockLogs = [
    { action: "Captured with GPS", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { action: "Proof Score Generated", timestamp: new Date(Date.now() - 3590000).toISOString() },
    { action: "Secured in GeoVault", timestamp: new Date(Date.now() - 3580000).toISOString() },
  ];

  return (
    <div className="space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-cyan/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-green/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">

            <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight">
              <span className="text-white">Truth is </span>
              <br />
              <span className="text-gradient-primary">Geo-Verified</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Capture media with GPS, timestamp, hash, proof score, and privacy controls. Store it securely, replay it on maps, share it with authorities, or generate verified reports.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/capture" className="btn-primary text-lg px-8 py-3.5">
                Secure Evidence
              </Link>
              <Link to="/map" className="btn-secondary text-lg px-6 py-3.5">
                View Public Map
              </Link>
              <Link to="/vault" className="btn-ghost text-lg px-6 py-3.5">
                Open GeoVault
              </Link>
            </div>
          </div>

          {/* Hero Mock Dashboard */}
          <div className="hidden lg:block relative perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-cyan/30 to-accent-green/30 rounded-2xl blur opacity-30"></div>
            <div 
              className="relative transition-transform duration-200 ease-out"
              style={{ transform: typeof window !== 'undefined' ? window.__heroTransform || 'perspective(1000px) rotateX(5deg) rotateY(-5deg)' : '' }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y / rect.height) - 0.5) * -15;
                const rotateY = ((x / rect.width) - 0.5) * 15;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                window.__heroTransform = e.currentTarget.style.transform;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(-5deg) translateY(0)';
                window.__heroTransform = e.currentTarget.style.transform;
              }}
              onClick={(e) => {
                // Add a small "float/bounce" effect on click
                e.currentTarget.style.transition = 'transform 0.1s ease-in-out';
                const currentTransform = e.currentTarget.style.transform;
                e.currentTarget.style.transform = currentTransform.replace('translateY(-5px)', 'translateY(5px) scale(0.98)');
                setTimeout(() => {
                  e.currentTarget.style.transition = 'transform 0.2s ease-out';
                  e.currentTarget.style.transform = currentTransform;
                }, 100);
              }}
            >
              <GlassCard className="bg-gray-900/90 border-gray-700/50 shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-white font-bold text-lg">Accident on 5th Ave</h3>
                    <p className="text-primary-cyan font-mono-hash text-xs mt-1">EVID-9A2F4C</p>
                  </div>
                  <SeverityBadge severity="High" />
                </div>
                
                <div className="h-40 bg-gray-800 rounded-lg mb-6 relative overflow-hidden group border border-gray-700/50">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
                  <div className="absolute bottom-3 left-3 bg-gray-900/80 backdrop-blur px-2 py-1 rounded text-xs text-accent-green font-mono-hash border border-gray-700 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    GPS Verified
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                    <span>Proof Score</span>
                    <span className="text-accent-green">Highly Trusted</span>
                  </div>
                  <ProofScoreBar score={92} />
                </div>

                <div className="pt-4 border-t border-gray-700/50">
                  <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Access Log</p>
                  <AccessLogTimeline logs={mockLogs} />
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Normal media does not prove <span className="text-danger-red">where</span>, <span className="text-danger-red">when</span>, or whether it was <span className="text-danger-red">modified</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <GlassCard className="border-t-4 border-t-danger-red/80 hover:border-danger-red/50 text-center py-8">
            <div className="w-12 h-12 rounded-full bg-danger-red/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-danger-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Location Can Be Doubted</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Regular photos lack irrefutable geospatial context, making it easy for opposing parties to question where an incident occurred.</p>
          </GlassCard>
          
          <GlassCard className="border-t-4 border-t-warning-amber/80 hover:border-warning-amber/50 text-center py-8">
            <div className="w-12 h-12 rounded-full bg-warning-amber/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-warning-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Timestamp Can Be Questioned</h4>
            <p className="text-gray-400 text-sm leading-relaxed">EXIF data is easily manipulated. Without cryptographic hashing, proving exactly when a file was captured is impossible.</p>
          </GlassCard>
          
          <GlassCard className="border-t-4 border-t-gray-500 hover:border-gray-400 text-center py-8">
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Sharing Exposes Privacy</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Public sharing risks personal safety. Standard tools lack granular visibility controls for sharing with authorities anonymously.</p>
          </GlassCard>
        </div>
      </section>

      {/* Solution Section */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">The Workflow</h2>
          <p className="text-gray-400">An unbroken chain of custody from the moment of capture.</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-gray-800 via-primary-cyan/50 to-gray-800 -translate-y-1/2 -z-10"></div>
          
          {[
            { step: '1', title: 'Capture', desc: 'Secure App Environment' },
            { step: '2', title: 'Verify', desc: 'GPS & Time Injection' },
            { step: '3', title: 'Secure', desc: 'SHA-256 Hashing' },
            { step: '4', title: 'Manage', desc: 'GeoVault Storage' },
            { step: '5', title: 'Replay/Report', desc: 'Map or PDF' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center bg-gray-900 px-4 py-2 rounded-xl relative z-10 w-full md:w-auto">
              <div className="w-12 h-12 rounded-full border-2 border-primary-cyan bg-gray-900 text-primary-cyan flex items-center justify-center font-bold text-lg mb-3 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                {item.step}
              </div>
              <h4 className="text-white font-bold mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 text-center whitespace-nowrap">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white">Platform Capabilities</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Proof Capsule', desc: 'An immutable container holding media, metadata, and cryptographics.' },
            { title: 'GeoVault', desc: 'Private locker securing evidence with role-based access control.' },
            { title: 'GPS + Timestamp', desc: 'Military-grade location accuracy recorded at the exact moment of capture.' },
            { title: 'Proof Score', desc: 'Algorithmic trust rating validating the integrity of the captured data.' },
            { title: 'Map Playback', desc: 'Geo-intelligence view filtering incidents by severity and verified location.' },
            { title: 'Authority Dashboard', desc: 'Dedicated portals for authorized entities to review submitted cases.' }
          ].map((feat, i) => (
            <GlassCard key={i} className="hover:border-primary-cyan/30 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">{feat.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white">Built For Reality</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {['Road Accident', 'Infrastructure Damage', 'Field Inspection', 'Disaster Reporting', 'Public Safety', 'Personal Security', 'Insurance Claim'].map(useCase => (
            <span key={useCase} className="px-6 py-3 rounded-full border border-gray-700 bg-gray-800/50 text-gray-300 font-medium hover:border-gray-500 hover:text-white transition-colors cursor-default">
              {useCase}
            </span>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-primary-cyan/30 bg-gradient-to-b from-gray-900 to-gray-800 p-12 md:p-20 text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Create your first Proof Capsule</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Start capturing verifiable truth today. Free for personal reporting and public safety.</p>
          <Link to="/capture" className="btn-primary text-xl px-10 py-4 shadow-[0_0_30px_rgba(0,212,255,0.3)]">
            Capture Evidence
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
