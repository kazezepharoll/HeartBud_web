import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthShell from '../components/AuthShell';

export default function GetPasscode() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const subject = 'Password Reset Process';

    try {
      const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await axios.post(`${API}/getcode`, {
        recipient: email,
        subject,
      });

      const data = response.data;
      if (data.success === true) {
        navigate('/verify-passcode', { state: { email } });
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error('Error sending passcode:', err);
      setError('Error sending passcode. Please try again later.');
    }
  };

  return (
    <AuthShell
      title="Restore your password"
      subtitle="Enter your email address and we'll send you a passcode to reset your password."
      error={error}
      backTo="/login"
      backLabel="Back to sign in"
      footer={<>Not registered yet? <Link to="/register">Create an account</Link></>}
    >
      <form className="hb-auth-form" onSubmit={handleSubmit}>
        <div className="hb-field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="hb-button">Send passcode</button>
      </form>
    </AuthShell>
  );
}
