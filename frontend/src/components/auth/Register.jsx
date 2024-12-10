
import React, { useState } from 'react';

const Register = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call register API
    console.log(username, email, password);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register'
      , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const data = await response.json();
      setSuccess('Registration successful');
      // Handle register success
    } catch (error) {
      setError('Registration failed');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;