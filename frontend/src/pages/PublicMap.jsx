import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { getPublicEvidence } from '../api';
import SeverityBadge from '../components/SeverityBadge';
import GlassCard from '../components/GlassCard';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons based on severity
const createIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const icons = {
  Low: createIcon('green'),
  Medium: createIcon('gold'),
  High: createIcon('orange'),
  Critical: createIcon('red'),
  Default: createIcon('blue')
};

const PublicMap = () => {
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  
  const mapRef = React.useRef(null);
  const markerRefs = React.useRef({});

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const res = await getPublicEvidence();
        setEvidenceList(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMapData();
  }, []);

  const getAdjustedLocation = (ev) => {
    if (!ev.latitude || !ev.longitude) return null;
    let lat = ev.latitude;
    let lng = ev.longitude;
    
    if (ev.locationPrivacy === 'hidden') return null;
    if (ev.locationPrivacy === 'approximate') {
      lat += (Math.random() - 0.5) * 0.006;
      lng += (Math.random() - 0.5) * 0.006;
    }
    
    return [lat, lng];
  };

  const filteredList = evidenceList.filter(item => {
    if (filterCategory && item.category !== filterCategory) return false;
    if (filterSeverity && item.severity !== filterSeverity) return false;
    if (getAdjustedLocation(item) === null) return false;
    return true;
  });

  const handleSignalClick = (ev) => {
    const loc = getAdjustedLocation(ev);
    if (!loc) return;

    if (mapRef.current) {
      mapRef.current.flyTo(loc, 15, { animate: true, duration: 1 });
    }
    
    if (markerRefs.current[ev._id]) {
      setTimeout(() => {
        const marker = markerRefs.current[ev._id];
        if (marker && marker.openPopup) {
          marker.openPopup();
        }
      }, 500);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-800 animate-pulse"></div>
        <div className="w-16 h-16 rounded-full border-t-4 border-primary-cyan animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>
      <p className="text-primary-cyan font-mono tracking-widest text-sm uppercase mt-6">Loading GIS Data</p>
      <p className="text-gray-500 text-xs mt-2">Retrieving public proof capsules...</p>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] gap-6 pb-6 max-w-[1600px] mx-auto">
      {/* Sidebar */}
      <GlassCard className="w-full lg:w-1/3 xl:w-1/4 flex flex-col h-full p-5 overflow-hidden border-t-4 border-t-primary-cyan">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
          <div className="w-10 h-10 rounded-lg bg-primary-cyan/10 flex items-center justify-center text-primary-cyan border border-primary-cyan/30">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-white tracking-wide">Live Map</h2>
            <p className="text-xs text-gray-400">Public geo-intelligence feed</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6 shrink-0">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category Filter</label>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="input-field !py-2 !text-sm bg-gray-900 w-full">
              <option value="">All Categories</option>
              {['Road Accident', 'Road Damage', 'Fire', 'Flood', 'Unsafe Area', 'Field Inspection', 'Garbage Issue', 'Traffic Issue', 'Personal Safety', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Severity Filter</label>
            <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)} className="input-field !py-2 !text-sm bg-gray-900 w-full">
              <option value="">All Severities</option>
              {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2 shrink-0">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Signals</span>
          <span className="bg-primary-cyan/20 text-primary-cyan text-xs px-2 py-0.5 rounded font-mono font-bold border border-primary-cyan/30">{filteredList.length}</span>
        </div>

        <div className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {filteredList.length === 0 ? (
            <div className="text-center py-10 bg-gray-900/30 border border-gray-800 border-dashed rounded-xl">
              <p className="text-gray-500 text-sm">No signals match current filters.</p>
            </div>
          ) : (
            filteredList.map(ev => (
              <div 
                key={ev._id} 
                onClick={() => handleSignalClick(ev)}
                className="bg-gray-900/80 p-3 rounded-xl border border-gray-800 hover:border-primary-cyan/50 transition-colors group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-800 group-hover:bg-primary-cyan transition-colors"></div>
                <div className="pl-2">
                  <h4 className="font-bold text-gray-200 text-sm line-clamp-1 mb-2 group-hover:text-primary-cyan transition-colors">{ev.title}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {new Date(ev.capturedAt).toLocaleDateString()}
                    </span>
                    <SeverityBadge severity={ev.severity} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>

      {/* Map */}
      <div className="w-full lg:w-2/3 xl:w-3/4 rounded-2xl overflow-hidden border border-gray-700 h-[50vh] lg:h-full relative z-0 shadow-2xl">
        <MapContainer center={[17.385, 78.4867]} zoom={12} style={{ height: '100%', width: '100%' }} ref={mapRef}>
          {/* Using CartoDB Dark Matter tiles for cyber aesthetic */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {filteredList.map(ev => {
            const loc = getAdjustedLocation(ev);
            if (!loc) return null;
            return (
              <Marker 
                key={ev._id} 
                position={loc} 
                icon={icons[ev.severity] || icons.Default}
                ref={(m) => { if(m) markerRefs.current[ev._id] = m; }}
              >
                <Popup className="custom-popup">
                  <div className="p-0 w-56">
                    <div className="relative">
                      <img src={ev.mediaType === 'video' ? 'https://via.placeholder.com/300x150/111827/00d4ff?text=Video+Capsule' : ev.mediaUrl} alt="Thumbnail" className="w-full h-32 object-cover bg-gray-900" />
                      <div className="absolute top-2 right-2">
                        <SeverityBadge severity={ev.severity} />
                      </div>
                    </div>
                    <div className="p-3 bg-gray-900 border border-gray-700">
                      <h4 className="font-bold text-sm mb-2 line-clamp-2 text-white" title={ev.title}>{ev.title}</h4>
                      
                      <div className="flex justify-between items-center mb-3 text-xs border-b border-gray-800 pb-2">
                        <span className="text-gray-400">Integrity:</span>
                        <span className="text-primary-cyan font-mono font-bold">{ev.proofScore}/100</span>
                      </div>
                      
                      <Link to={`/evidence/${ev._id}`} className="block text-center text-xs font-bold bg-primary-cyan/10 hover:bg-primary-cyan/20 text-primary-cyan border border-primary-cyan/30 py-2 rounded transition-colors w-full uppercase tracking-wide">
                        View Details
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        
        {/* Map Overlay Decorators */}
        <div className="absolute top-4 right-4 z-[400] pointer-events-none">
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 p-2 rounded-lg text-[10px] text-gray-400 font-mono uppercase tracking-widest flex flex-col gap-1 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
              Live Feed Active
            </div>
            <div className="text-primary-cyan pl-4">SYS.OPT.GEO</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicMap;
