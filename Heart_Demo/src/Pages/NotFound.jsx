import { useNavigate } from 'react-router-dom';
import '../v2/design.css';
import '../v2/public.css';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="hb-notfound">
      <div className="hb-brand-mark">♥</div>
      <div className="hb-notfound-code">404</div>
      <h1>This page doesn&apos;t exist</h1>
      <p>The page you&apos;re looking for may have moved or the link may be broken.</p>
      <button className="hb-button" onClick={() => navigate('/')}>Back to home</button>
    </div>
  );
}
