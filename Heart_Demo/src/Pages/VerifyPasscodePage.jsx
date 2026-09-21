import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthShell from '../components/AuthShell';

export default function VerifyPasscodePage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await axios.post(`${API}/verify-passcode`, {
        email,
        passcode,
      });

      const data = response.data;
      const code = data.passcode;

      if (data.success === true) {
        navigate('/reset-password', { state: { email, passcode: code } });
      } else {
        setError('Invalid passcode. Please try again.');
      }
    } catch (err) {
      console.error('Error verifying passcode:', err);
      setError('Error verifying passcode. Please try again later.');
    }
  };

  return (
    <AuthShell
      title="Enter your passcode"
      subtitle={`We sent a passcode to ${email || 'your email'}. Enter it below to continue.`}
      error={error}
      backTo="/getpasscode"
      backLabel="Back"
    >
      <form className="hb-auth-form" onSubmit={handleSubmit}>
        <div className="hb-field">
          <label htmlFor="passcode">Passcode</label>
          <input type="text" name="passcode" id="passcode" value={passcode} onChange={(e) => setPasscode(e.target.value)} required />
        </div>
        <button type="submit" className="hb-button">Verify passcode</button>
      </form>
    </AuthShell>
  );
}
