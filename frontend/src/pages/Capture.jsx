import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadEvidence } from '../api';
import GlassCard from '../components/GlassCard';
import PageHeader from '../components/PageHeader';

const Capture = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState(null);
  const [locError, setLocError] = useState('');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [severity, setSeverity] = useState('Low');
  const [visibility, setVisibility] = useState('private');
  const [locationPrivacy, setLocationPrivacy] = useState('exact');
  const [address, setAddress] = useState('');

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const objUrl = URL.createObjectURL(selectedFile);
      setPreview(objUrl);
    }
  };

  const getLocation = () => {
    setLocError('');
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          acc: pos.coords.accuracy
        });
      },
      (err) => {
        setLocError('Unable to retrieve your location. Ensure permissions are granted.');
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file to capture.');
    if (!location) return alert('GPS Location is required to generate a Proof Capsule.');

    setLoading(true);
    const formData = new FormData();
    formData.append('media', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('severity', severity);
    formData.append('visibility', visibility);
    formData.append('locationPrivacy', locationPrivacy);
    formData.append('latitude', location.lat);
    formData.append('longitude', location.lng);
    formData.append('gpsAccuracy', location.acc);
    if (address) formData.append('address', address);

    try {
      const res = await uploadEvidence(formData);
      setSuccessData(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to secure evidence');
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <GlassCard className="text-center py-16 px-8 border-accent-green relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-green/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
          
          <div className="w-24 h-24 bg-accent-green/20 text-accent-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,255,136,0.3)] border border-accent-green/30">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
          </div>
          
          <h2 className="text-4xl font-heading font-bold text-white mb-4 tracking-wide">Proof Capsule Created</h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">Evidence has been cryptographically signed and secured in your GeoVault.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-10 max-w-2xl mx-auto">
            <div className="bg-gray-900/80 border border-gray-700/50 p-4 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-accent-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div>
                <p className="text-white font-bold text-sm">GPS Verified</p>
                <p className="text-xs text-gray-500 mt-0.5">High accuracy lock</p>
              </div>
            </div>
            <div className="bg-gray-900/80 border border-gray-700/50 p-4 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-accent-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <p className="text-white font-bold text-sm">Timestamped</p>
                <p className="text-xs text-gray-500 mt-0.5">Time sealed</p>
              </div>
            </div>
            <div className="bg-gray-900/80 border border-gray-700/50 p-4 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-accent-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <div>
                <p className="text-white font-bold text-sm">Hash Generated</p>
                <p className="text-xs text-gray-500 mt-0.5">SHA-256 immutable</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/80 border border-primary-cyan/20 p-5 rounded-xl inline-block mb-10 min-w-[300px]">
            <p className="text-xs text-primary-cyan uppercase tracking-widest font-bold mb-2 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              Capsule ID
            </p>
            <p className="font-mono-hash text-gray-200 text-xl font-bold tracking-wider">{successData.evidenceId}</p>
          </div>
          
          <div className="max-w-sm mx-auto">
            <button onClick={() => navigate(`/evidence/${successData._id}`)} className="btn-primary w-full py-4 text-lg">
              Open Evidence Control Panel
            </button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-24">
      <PageHeader 
        title="Capture Evidence" 
        description="Initialize a new Proof Capsule. Follow the three steps to ensure cryptographic validity."
      />
      
      <form onSubmit={handleSubmit} className="space-y-8 mt-10 relative">
        <div className="absolute left-[27px] top-10 bottom-10 w-0.5 bg-gray-800 -z-10 hidden md:block"></div>

        {/* Step 1: Media */}
        <div className="relative">
          <div className="hidden md:flex absolute -left-10 top-6 w-10 h-0.5 bg-gray-800 -z-10"></div>
          <GlassCard className="border-l-4 border-l-primary-cyan relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-cyan/5 rounded-full blur-[40px] -z-10 pointer-events-none"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-cyan/10 border border-primary-cyan/30 text-primary-cyan flex items-center justify-center font-bold font-heading shadow-[0_0_10px_rgba(0,212,255,0.2)]">1</div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">Media Capture</h3>
                <p className="text-xs text-gray-400">Select photo or video to be hashed</p>
              </div>
            </div>
            
            {!preview ? (
              <div 
                className="border-2 border-dashed border-gray-700 bg-gray-900/50 rounded-xl p-12 text-center cursor-pointer hover:border-primary-cyan hover:bg-primary-cyan/5 transition-all group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 rounded-full bg-gray-800 text-gray-400 group-hover:text-primary-cyan group-hover:bg-primary-cyan/10 flex items-center justify-center mx-auto mb-4 transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <p className="text-gray-300 font-medium">Click to initialize capture sequence</p>
                <p className="text-gray-500 text-sm mt-2">Supports high-res JPG, PNG, MP4</p>
              </div>
            ) : (
              <div className="relative group rounded-xl overflow-hidden border border-gray-700/50">
                {file?.type.startsWith('video/') ? (
                  <video src={preview} controls className="w-full bg-black object-contain max-h-[400px]" />
                ) : (
                  <img src={preview} alt="Preview" className="w-full object-cover max-h-[400px]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <div className="text-xs font-mono text-gray-300">File attached</div>
                  <button 
                    type="button"
                    onClick={() => { setFile(null); setPreview(null); }}
                    className="bg-danger-red/90 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-danger-red transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Discard
                  </button>
                </div>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*,video/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </GlassCard>
        </div>

        {/* Step 2: Location */}
        <div className="relative">
          <div className="hidden md:flex absolute -left-10 top-6 w-10 h-0.5 bg-gray-800 -z-10"></div>
          <GlassCard className="border-l-4 border-l-accent-green relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/5 rounded-full blur-[40px] -z-10 pointer-events-none"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/30 text-accent-green flex items-center justify-center font-bold font-heading shadow-[0_0_10px_rgba(0,255,136,0.2)]">2</div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">GPS Verification</h3>
                <p className="text-xs text-gray-400">Lock high-accuracy geospatial data</p>
              </div>
            </div>
            
            {!location ? (
              <div className="text-center p-8 border border-gray-700/50 rounded-xl bg-gray-900/50">
                <button type="button" onClick={getLocation} className="btn-secondary w-full max-w-xs py-3 border-accent-green text-accent-green hover:bg-accent-green/10">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Acquire Satellite Lock
                  </div>
                </button>
                {locError && (
                  <div className="mt-4 bg-danger-red/10 border border-danger-red/30 text-danger-red text-sm p-3 rounded flex items-start gap-2 max-w-xs mx-auto">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {locError}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-900/80 border border-accent-green/40 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                <div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Latitude</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Longitude</p>
                    <p className="text-primary-cyan font-mono text-sm tracking-wider">{location.lat.toFixed(6)}°</p>
                    <p className="text-primary-cyan font-mono text-sm tracking-wider">{location.lng.toFixed(6)}°</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></span>
                    Accuracy radius: <span className="text-white">{location.acc.toFixed(1)} meters</span>
                  </p>
                </div>
                <div className="bg-accent-green/20 border border-accent-green/50 text-accent-green px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  LOCK ACQUIRED
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Step 3: Details */}
        <div className="relative">
          <div className="hidden md:flex absolute -left-10 top-6 w-10 h-0.5 bg-gray-800 -z-10"></div>
          <GlassCard className="border-l-4 border-l-gray-400">
            <div className="flex items-center gap-4 mb-6 border-b border-gray-700/50 pb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-600 text-gray-300 flex items-center justify-center font-bold font-heading">3</div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">Evidence Details</h3>
                <p className="text-xs text-gray-400">Provide context and set privacy rules</p>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Subject / Title *</label>
                <input required value={title} onChange={e => setTitle(e.target.value)} className="input-field" placeholder="e.g. Collision at Main St Intersection" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description / Notes</label>
                <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} className="input-field" placeholder="Detailed objective observation..."></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Classification</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="input-field">
                    {['Road Accident', 'Road Damage', 'Fire', 'Flood', 'Unsafe Area', 'Field Inspection', 'Garbage Issue', 'Traffic Issue', 'Personal Safety', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Severity Level</label>
                  <select value={severity} onChange={e => setSeverity(e.target.value)} className="input-field">
                    {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 rounded-xl bg-gray-900 border border-gray-700/50">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> Access Policy</label>
                  <select value={visibility} onChange={e => setVisibility(e.target.value)} className="input-field bg-gray-800">
                    <option value="private">Private (GeoVault Only)</option>
                    <option value="authority_only">Authority Only</option>
                    <option value="public">Publicly Visible</option>
                    <option value="anonymous_public">Anonymous Public</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Location Privacy</label>
                  <select value={locationPrivacy} onChange={e => setLocationPrivacy(e.target.value)} className="input-field bg-gray-800">
                    <option value="exact">Publish Exact Coordinates</option>
                    <option value="approximate">Fuzz to Neighborhood Level</option>
                    <option value="authority_only_exact">Exact to Authorities Only</option>
                    <option value="hidden">Hide Location Completely</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Street Address / Landmark (Optional)</label>
                <input value={address} onChange={e => setAddress(e.target.value)} className="input-field" placeholder="Nearby recognizable structure..." />
              </div>
            </div>
          </GlassCard>
        </div>

        <button 
          type="submit" 
          disabled={loading || !file || !location} 
          className="btn-primary w-full py-5 text-xl font-bold tracking-wider mt-8 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,212,255,0.2)]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              GENERATING PROOF CAPSULE...
            </span>
          ) : (
            'SECURE EVIDENCE NOW'
          )}
        </button>
      </form>
    </div>
  );
};

export default Capture;
