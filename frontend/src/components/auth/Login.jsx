import React, { useState } from 'react';
import { set } from 'react-hook-form';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call login API
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(response);
      console.log(data);
      if (!response.ok) {
        console.log(data?.message);
        throw data?.message || 'Login failed';
      }
      else {
        setSuccess('Login successful');
      }
      // Handle login success
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
