import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--glass-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-primary)' }}>
        <Mic2 size={28} color="var(--accent-color)" />
        <span style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.5px' }}>
          MockAI<span style={{ color: 'var(--accent-color)' }}>.</span>
        </span>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link to="/" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}>Dashboard</Link>
        <UserCircle size={32} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
      </div>
    </nav>
  );
};

export default Navbar;
