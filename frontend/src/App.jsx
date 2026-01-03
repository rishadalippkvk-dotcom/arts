import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import PointsTable from './pages/PointsTable';
import Admin from './pages/Admin';
import Fixtures from './pages/Fixtures';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar glass">
          <div className="nav-logo">
            <span className="red">ANNUAL</span> SPORTS & GAMES
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/schedule" onClick={() => setMobileMenuOpen(false)}>Schedule</Link>
            <Link to="/fixtures" onClick={() => setMobileMenuOpen(false)}>Fixtures</Link>
            <Link to="/points" onClick={() => setMobileMenuOpen(false)}>Points Table</Link>
            <Link to="/admin" className="admin-link" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
          </div>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/points" element={<PointsTable />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>

      <style>{`
        .app-container {
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          background: #fff;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #eee;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-logo {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 1px;
          color: var(--poster-blue);
        }
        .red { color: var(--poster-red); }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--poster-blue);
          padding: 0.5rem;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-links a {
          color: #666;
          text-decoration: none;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.9rem;
          transition: var(--transition);
        }
        .nav-links a:hover {
          color: var(--poster-red);
        }
        .admin-link {
          padding: 8px 18px;
          border-radius: 4px;
          border: 1px solid var(--poster-blue);
          color: var(--poster-blue) !important;
        }
        .admin-link:hover {
          background: var(--poster-blue);
          color: white !important;
        }
        .content {
          padding: 0;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .navbar {
            padding: 1rem 1.5rem;
            position: relative;
          }
          .nav-logo {
            font-size: 1rem;
          }
          .mobile-menu-btn {
            display: block;
          }
          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: #fff;
            flex-direction: column;
            gap: 0;
            padding: 1rem 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }
          .nav-links.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          .nav-links a {
            padding: 1rem 2rem;
            width: 100%;
            border-bottom: 1px solid #f0f0f0;
          }
          .admin-link {
            margin: 0.5rem 1.5rem;
            width: calc(100% - 3rem);
            text-align: center;
          }
        }

        /* Tablet Responsive */
        @media (max-width: 1024px) and (min-width: 769px) {
          .nav-links {
            gap: 1.5rem;
          }
          .nav-links a {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </Router>
  );
}

export default App;
