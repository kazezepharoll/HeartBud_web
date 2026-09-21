import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const email = location.state?.email || null;
  const passcode = location.state?.passcode || null;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await axios.post(`${API}/reset-password`, {
        email,
        password,
        passcode,
      });

      const data = response.data;
      if (data.success === true) {
        navigate('/login');
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setError('Error resetting password. Please try again later.');
    }
  };

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Choose a new password for your account."
      error={error}
      backTo="/login"
      backLabel="Back to sign in"
    >
      <form className="hb-auth-form" onSubmit={handleSubmit}>
        <div className="hb-field">
          <label htmlFor="password">New password</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="hb-field">
          <label htmlFor="confirmPassword">Confirm new password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit" className="hb-button">Reset password</button>
      </form>
    </AuthShell>
  );
}
