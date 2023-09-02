import React, { useState } from 'react';
import axios from 'axios';

function EmailForm() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/sendemail', {
        to,
        subject,
        text: message,
      });
      setResult(response.data)
      console.log(response.data);
      // Show success message to the user
    } catch (error) {
      console.error('Error sending email:', error);
      // Show error message to the user
    }
  };

console.log(result)

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Recipient"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send Email</button>
    </form>
  );
}

export default EmailForm;
