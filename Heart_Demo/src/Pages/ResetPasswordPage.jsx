import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import pharmacy from '../assets/Pharmacy.png';

const GlassContainer = styled.div`

  min-height: 100vh;
  background: url(${pharmacy}) no-repeat center center fixed;
  background-size: cover;
  font-family: Arial, sans-serif;
`;

const GlassContent = styled.div`
display: flex;
justify-content: center;
align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(25, 255, 255, 0.5); /* Glass background color with transparency */
 /* Shadow for the glass effect */
`;

const Container = styled.div`
  width: 500px;
  height: 60vh;
  background: rgba(255, 255, 255, 0.7); /* Glass background color with transparency */
  backdrop-filter: blur(12px);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;

  
`

const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  width: 350px;
  font-size: 24px;
  color: #007BFF;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  background-color: #f2dede;
  color: #a94442;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 40vh;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.7); /* Input field background with transparency */
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const email = location.state?.email || null;
  const passcode = location.state?.passcode || null;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Replace the following URL with your backend endpoint for resetting the password
      const response = await axios.post("http://localhost:3000/reset-password", {
        email,
        password,
        passcode
      });

      const data = response.data;
      console.log(data); // For debugging purposes

      if (data.success === true) {
        // Password reset successfully, navigate to the login page
        navigate('/login');
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Error resetting password. Please try again later.');
    }
  };

  return (
    <GlassContainer>
      <GlassContent>
        <Container>
        <Title>
          <button onClick={()=> navigate('/login')} style={{marginRight: '10px',padding: '7px 20px'}}>Back</button>
          Reset Password 
          </Title>
        <Text>Enter your new password below.</Text>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>

          <Label htmlFor="password">New Password:</Label>
          <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <Label htmlFor="confirmPassword">Confirm New Password:</Label>
          <Input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <SubmitButton type="submit">RESET PASSWORD</SubmitButton>
        </Form>
        </Container>
      </GlassContent>
    </GlassContainer>
  );
};

export default ResetPassword;
