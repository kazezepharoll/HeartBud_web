import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../v2/design.css';
import '../v2/public.css';

export default function GeneralBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="hb-pub-nav">
      <Link to="/" className="hb-pub-brand">
        <div className="hb-brand-mark">♥</div>
        <strong>HeartBud</strong>
      </Link>
      <nav className="hb-pub-nav-links">
        <Link to="/#services">Services</Link>
        <Link to="/#about">About</Link>
      </nav>
      <div className="hb-pub-nav-actions">
        <Link to="/login" className="hb-button ghost">Log in</Link>
        <Link to="/register" className="hb-button">Get started</Link>
      </div>
      <button
        className="hb-pub-nav-mobile-toggle"
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        ☰
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, background: '#fff', borderBottom: '1px solid var(--line)', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Link to="/#services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/#about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/login" className="hb-button secondary" onClick={() => setOpen(false)}>Log in</Link>
          <Link to="/register" className="hb-button" onClick={() => setOpen(false)}>Get started</Link>
        </div>
      )}
    </header>
  );
}
