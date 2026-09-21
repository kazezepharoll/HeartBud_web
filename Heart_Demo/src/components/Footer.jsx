import { Link } from 'react-router-dom';
import '../v2/design.css';
import '../v2/public.css';

export default function Footer() {
  return (
    <footer className="hb-pub-footer">
      <div className="hb-pub-footer-inner">
        <div className="hb-pub-footer-brand">
          <div className="hb-pub-brand">
            <div className="hb-brand-mark">♥</div>
            <strong>HeartBud</strong>
          </div>
          <p>A personal medical assistant for monitoring and managing cardiovascular disease, connecting patients and doctors with real-time data.</p>
        </div>
        <div className="hb-pub-footer-cols">
          <div className="hb-pub-footer-col">
            <strong>Product</strong>
            <Link to="/#services">Services</Link>
            <Link to="/#about">About</Link>
            <Link to="/register">Get started</Link>
          </div>
          <div className="hb-pub-footer-col">
            <strong>Account</strong>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
            <Link to="/getpasscode">Reset password</Link>
          </div>
        </div>
      </div>
      <div className="hb-pub-footer-bottom">
        &copy; {new Date().getFullYear()} HeartBud. Decision-support tooling, not a diagnostic device.
      </div>
    </footer>
  );
}
