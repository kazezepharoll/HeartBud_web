import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthShell from '../components/AuthShell';

export default function Registration() {
  const [fullnames, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPWD, setConfirmPWD] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = 'patient';
    try {
      if (password === confirmPWD && password.length > 8) {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/register`, { fullnames, email, role, password });
        const data = response.data;

        if (data.success === true) {
          navigate('/login');
        } else {
          setMessage(data.message);
        }
      } else {
        setMessage('Please make sure your passwords are matching and are not less than 8 characters.');
      }
    } catch (error) {
      console.error('Error registering this user:', error);
      setMessage(error.response?.data?.message || 'Registration failed. Please check the API server.');
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Register as a patient to start tracking your cardiovascular health."
      error={message}
      footer={<>Already have an account? <Link to="/login">Sign in</Link></>}
    >
      <form className="hb-auth-form" onSubmit={handleSubmit}>
        <div className="hb-field">
          <label htmlFor="fullname">Full name</label>
          <input onChange={(e) => setFullname(e.target.value)} value={fullnames} type="text" name="fullname" id="fullname" required />
        </div>
        <div className="hb-field">
          <label htmlFor="email">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" required />
        </div>
        <div className="hb-field">
          <label htmlFor="password">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" required />
          <small>At least 8 characters.</small>
        </div>
        <div className="hb-field">
          <label htmlFor="confirmPWD">Confirm password</label>
          <input onChange={(e) => setConfirmPWD(e.target.value)} value={confirmPWD} type="password" name="confirmPWD" id="confirmPWD" required />
        </div>
        <button type="submit" className="hb-button">Create account</button>
      </form>
    </AuthShell>
  );
}
