import { NavLink, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import './design.css';

const patientNav = [
  ['Overview', '/patient', '⌂'],
  ['Vitals monitor', '/patient/vitals', '⌁'],
  ['Health assessment', '/patient/prediction', '♥'],
  ['Appointments', '/patient/appointments', '▣'],
  ['Prescriptions', '/patient/prescriptions', 'Rx'],
  ['Diet plan', '/patient/diet', '◌'],
  ['Notifications', '/patient/notifications', '●'],
];
const doctorNav = [
  ['Overview', '/doctor', '⌂'],
  ['Patients', '/doctor/patients', '♙'],
  ['Live alerts', '/doctor/alerts', '⚠'],
  ['Appointments', '/doctor/appointments', '▣'],
  ['Prescriptions', '/doctor/prescriptions', 'Rx'],
  ['Diet plans', '/doctor/diet-plans', '◌'],
  ['Assessments', '/doctor/predictions', '♥'],
];
const adminNav = [
  ['Overview', '/admin', '⌂'],
  ['Users', '/admin/users', '♙'],
  ['Predictions', '/admin/predictions', '♥'],
  ['Appointments', '/admin/appointments', '▣'],
  ['Prescriptions', '/admin/prescriptions', 'Rx'],
  ['Activity log', '/admin/activity', '≡'],
  ['Settings', '/admin/settings', '⚙'],
];

export function getUser() {
  try { return JSON.parse(localStorage.getItem('heartbud_user') || '{}'); } catch { return {}; }
}

export function Icon({ children }) { return <span className="hb-icon" aria-hidden="true">{children}</span>; }

export default function AppShell({ role = 'patient', children, title, subtitle }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = getUser();
  const nav = role === 'admin' ? adminNav : role === 'doctor' ? doctorNav : patientNav;
  const displayName = user.fullnames || (role === 'doctor' ? 'Dr. Kazeze' : role === 'admin' ? 'System Admin' : 'Patient');
  const roleLabel = role === 'admin' ? 'Administrator' : role === 'doctor' ? 'Doctor' : 'Patient';

  const initials = useMemo(() => displayName.split(' ').map(x => x[0]).slice(0,2).join('').toUpperCase(), [displayName]);

  const logout = () => {
    localStorage.removeItem('heartbud_token');
    localStorage.removeItem('heartbud_user');
    navigate('/login');
  };

  return <div className="hb-app">
    <aside className={`hb-sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="hb-brand" onClick={() => navigate(role === 'patient' ? '/patient' : role === 'doctor' ? '/doctor' : '/admin')}>
        <div className="hb-brand-mark">♥</div>
        <div><strong>HeartBud</strong><span>Cardiovascular care</span></div>
      </div>
      <div className="hb-role-pill"><span className="hb-status-dot" /> {roleLabel} portal</div>
      <nav className="hb-nav">
        <p className="hb-nav-label">Workspace</p>
        {nav.map(([label, href, icon]) => <NavLink key={href} to={href} end={href === `/${role}`} onClick={() => setMobileOpen(false)} className={({isActive}) => isActive ? 'active' : ''}><Icon>{icon}</Icon><span>{label}</span></NavLink>)}
      </nav>
      <div className="hb-sidebar-bottom">
        <button className="hb-ghost-link" onClick={() => navigate('/')}><Icon>↗</Icon> Public home</button>
        <button className="hb-ghost-link danger" onClick={logout}><Icon>⇥</Icon> Sign out</button>
      </div>
    </aside>
    {mobileOpen && <button className="hb-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <main className="hb-main">
      <header className="hb-topbar">
        <button className="hb-mobile-menu" onClick={() => setMobileOpen(true)}>☰</button>
        <div className="hb-breadcrumb">HeartBud <span>/</span> {title || 'Overview'}</div>
        <div className="hb-top-actions">
          <button className="hb-icon-button" title="Notifications" onClick={() => navigate(role === 'patient' ? '/patient/notifications' : role === 'doctor' ? '/doctor' : '/admin/activity')}>◉<i /></button>
          <div className="hb-profile" onClick={() => {}}><div className="hb-avatar">{initials || 'HB'}</div><div><strong>{displayName}</strong><span>{roleLabel}</span></div><span className="hb-chevron">⌄</span></div>
        </div>
      </header>
      <div className="hb-content">
        {(title || subtitle) && <div className="hb-page-heading"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div></div>}
        {children}
      </div>
    </main>
  </div>
}

export function StatCard({ label, value, detail, tone = 'blue', icon }) {
  return <div className={`hb-stat-card ${tone}`}><div className="hb-stat-top"><span>{label}</span><span className="hb-stat-icon">{icon}</span></div><strong>{value}</strong>{detail && <small>{detail}</small>}</div>
}

export function SectionCard({ title, action, children, className = '', ...props }) {
  return <section {...props} className={`hb-card ${className}`}><div className="hb-card-header"><div><h2>{title}</h2></div>{action}</div>{children}</section>
}

export function StatusBadge({ children, tone = 'neutral' }) { return <span className={`hb-badge ${tone}`}>{children}</span>; }

export function MiniSparkline({ values = [5,7,6,9,8,11,10] }) {
  const max = Math.max(...values), min = Math.min(...values);
  const points = values.map((v,i) => `${(i/(values.length-1))*100},${30-((v-min)/(max-min || 1))*25}`).join(' ');
  return <svg className="hb-sparkline" viewBox="0 0 100 32" preserveAspectRatio="none"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"/><circle cx="100" cy={30-((values.at(-1)-min)/(max-min || 1))*25} r="1.8" fill="currentColor" /></svg>
}
