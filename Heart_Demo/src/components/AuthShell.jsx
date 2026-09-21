import { Link } from 'react-router-dom';
import '../v2/design.css';
import '../v2/public.css';

// Shared two-panel layout for the login/register/passcode/reset flow: a navy
// brand panel on the left (hidden on mobile) and a centered white form card
// on the right, matching the same design tokens as the app shell.
export default function AuthShell({ title, subtitle, error, backTo, backLabel, children, footer }) {
  return (
    <div className="hb-auth-shell">
      <aside className="hb-auth-side">
        <Link to="/" className="hb-pub-brand" style={{ color: '#fff' }}>
          <div className="hb-brand-mark">♥</div>
          <strong>HeartBud</strong>
        </Link>
        <div className="hb-auth-side-quote">
          <p>&ldquo;HeartBud keeps me and my doctor on the same page between visits &mdash; readings, alerts, everything in one place.&rdquo;</p>
          <span>Personal medical assistant for cardiovascular care</span>
        </div>
      </aside>
      <main className="hb-auth-main">
        <div className="hb-auth-card">
          {backTo && (
            <Link to={backTo} className="hb-auth-back">&larr; {backLabel || 'Back'}</Link>
          )}
          <div className="hb-pub-brand" style={{ marginBottom: 24 }}>
            <div className="hb-brand-mark">♥</div>
            <strong>HeartBud</strong>
          </div>
          <h1>{title}</h1>
          {subtitle && <p className="hb-auth-subtitle">{subtitle}</p>}
          {error && <div className="hb-auth-error">{error}</div>}
          {children}
          {footer && <div className="hb-auth-foot">{footer}</div>}
        </div>
      </main>
    </div>
  );
}
