import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';



const Wrapper = styled.div`
  background-color: #e0f2e9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      font-size: 18px;
      margin-bottom: 8px;
    }

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 16px;
      font-size: 16px;
    }

    button {
      padding: 10px;
      background-color: #00a896;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }
  }

  p {
    color: red;
    font-size: 16px;
    text-align: center;
  }
`;

const VerifyPasscodePage = () => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || null;


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace the following URL with your backend endpoint for verifying the passcode
      const response = await axios.post("http://localhost:3000/verify-passcode", {
        email,
        passcode,
      });

      const data = response.data;
      const code = data.passcode;
      console.log(data); // For debugging purposes

      if (data.success === true) {
        // Passcode is valid, navigate to the reset password page
        navigate(`/reset-password`,{state:{email: email, passcode: code}});
      } else {
        setError('Invalid passcode. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying passcode:', error);
      setError('Error verifying passcode. Please try again later.');
    }
  };

  return (
    <Wrapper>
      <Container>
        <h1>Verify Passcode</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="passcode">Enter Passcode:</label>
          <input type="text" name="passcode" value={passcode} onChange={(e) => setPasscode(e.target.value)} required />
          <button type="submit">VERIFY PASSCODE</button>
        </form>
      </Container>
    </Wrapper>
  );
};


export default VerifyPasscodePage;
