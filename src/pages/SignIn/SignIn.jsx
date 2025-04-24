import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Signed In with:', email, password);
    // After successful login, navigate to home or dashboard
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Sign In</button>
        </form>
        <div className="links">
          <a href="#forgot-password">Forgot Password?</a>
          <a href="/signup">Don't have an account? Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
