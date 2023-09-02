import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #007BFF;
`;

const Text = styled.p`
  color: #555;
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
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const GetPasscode = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subject = "Password Reset Process";

    try {
      // Replace the following URL with your backend endpoint for sending the passcode via email
      const response = await axios.post("http://localhost:3000/getcode", {
        recipient: email,
        subject,
      });

      const data = response.data;
      console.log(data); // For debugging purposes

      if (data.success === true) {
        // Passcode sent successfully, navigate to the reset password page
        navigate(`/verify-passcode`,{state: {email: email}});
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error sending passcode:', error);
      setError('Error sending passcode. Please try again later.');
    }
  };

  return (
    <Container>
      <Title>Restore Password</Title>
      <Text>Enter your email address to get started, and we will send you a passcode that you must enter to reset your password.</Text>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form onSubmit={handleSubmit}>
        <Label htmlFor="email">Email:</Label>
        <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <SubmitButton type="submit">GET PASSCODE</SubmitButton>
      </Form>

      <Text>Not registered yet? <a href="/register">Click here</a></Text>
    </Container>
  );
};

export default GetPasscode;
