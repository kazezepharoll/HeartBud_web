import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthShell from '../components/AuthShell';

export default function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await axios.post(`${API}/login`, { email, password });
      const userData = response.data;
      const role = String(userData.userRole || '').toLowerCase();
      localStorage.setItem('heartbud_token', userData.token || '');
      localStorage.setItem('heartbud_user', JSON.stringify({ role, fullnames: userData.fullnames || '', email: email, userId: userData.userId }));
      if (role === 'doctor') navigate('/doctor');
      else if (role === 'patient') navigate('/patient');
      else if (role === 'admin') navigate('/admin');
      else navigate('/notfound');
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.response?.data?.error || 'Unable to sign in. Check the API server and your credentials.');
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your HeartBud account to continue."
      error={error}
      footer={<>Not registered yet? <Link to="/register">Create an account</Link></>}
    >
      <form className="hb-auth-form" onSubmit={handleClick}>
        <div className="hb-field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="hb-field">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="hb-button">Sign in</button>
        <Link to="/getpasscode" className="hb-link" style={{ textAlign: 'center' }}>Forgot your password?</Link>
      </form>
    </AuthShell>
  );
}
