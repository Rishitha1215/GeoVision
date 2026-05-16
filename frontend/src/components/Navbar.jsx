import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const inSimulator = window.top !== window.self;

  const navLinks = [
    { name: 'Public Map', path: '/map' },
    { name: 'Gallery', path: '/gallery' },
  ];

  if (!inSimulator) {
    navLinks.push({ name: 'Mobile App', path: '/mobile' });
  }

  if (user) {
    navLinks.unshift({ name: 'GeoVault', path: '/vault' });
    navLinks.unshift({ name: 'Capture', path: '/capture' });
    if (user.role === 'admin') {
      navLinks.push({ name: 'Admin', path: '/admin' });
    }
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo2.jpg" alt="Geo-Vision Logo" className="w-9 h-9 rounded-lg shadow-[0_0_15px_rgba(0,212,255,0.4)] group-hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-shadow object-cover" />
            <span className="text-xl font-heading font-bold tracking-wide text-gradient-primary">
              Geo-Vision
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isActive(link.path)
                    ? 'bg-primary-cyan/10 text-primary-cyan shadow-[inset_0_-2px_0_var(--primary-cyan)]'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth / Profile */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 border-l border-gray-700 pl-4 ml-2">
                <div className="flex items-center gap-2 bg-gray-800/50 py-1.5 px-3 rounded-full border border-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-600 to-gray-500 flex items-center justify-center text-xs font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-200">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-danger-red/20 text-danger-red px-1.5 py-0.5 rounded ml-1">Admin</span>
                  )}
                </div>
                <button onClick={handleLogout} className="text-sm font-medium text-gray-400 hover:text-danger-red transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn-ghost text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                    ? 'bg-primary-cyan/10 text-primary-cyan'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            {inSimulator && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.top.location.href = '/';
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              >
                Desktop View
              </button>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-800">
            {user ? (
              <div className="px-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-600 to-gray-500 flex items-center justify-center text-sm font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-base font-medium text-white">{user.name}</div>
                    <div className="text-sm font-medium text-gray-400">{user.email}</div>
                  </div>
                  {user.role === 'admin' && (
                    <span className="ml-auto text-xs uppercase tracking-wider font-bold bg-danger-red/20 text-danger-red px-2 py-1 rounded">Admin</span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-3 block w-full text-left px-3 py-2 rounded-md text-base font-medium text-danger-red hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-5 flex flex-col gap-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-ghost w-full justify-center">Login</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full justify-center">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
