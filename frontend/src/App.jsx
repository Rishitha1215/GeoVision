import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMe } from './api';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AnimatedBackground from './components/AnimatedBackground';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Capture from './pages/Capture';
import Vault from './pages/Vault';
import EvidenceDetails from './pages/EvidenceDetails';
import PublicMap from './pages/PublicMap';
import Gallery from './pages/Gallery';
import Report from './pages/Report';
import AdminDashboard from './pages/AdminDashboard';
import MobileSimulator from './pages/MobileSimulator';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getMe().then(res => {
        setUser(res.data);
      }).catch(() => {
        localStorage.removeItem('token');
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center mt-20 text-white font-heading text-2xl">Loading ProofCam...</div>;

  return (
    <Router>
      <AnimatedBackground />
      <Navbar user={user} setUser={setUser} />
      <div className="container mx-auto px-4 py-8 relative z-0">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/map" element={<PublicMap />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/mobile" element={<MobileSimulator />} />
          
          <Route path="/capture" element={<ProtectedRoute user={user}><Capture /></ProtectedRoute>} />
          <Route path="/vault" element={<ProtectedRoute user={user}><Vault /></ProtectedRoute>} />
          <Route path="/evidence/:id" element={<ProtectedRoute user={user}><EvidenceDetails user={user} /></ProtectedRoute>} />
          <Route path="/report/:id" element={<ProtectedRoute user={user}><Report /></ProtectedRoute>} />
          
          <Route path="/admin" element={<ProtectedRoute user={user} requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
