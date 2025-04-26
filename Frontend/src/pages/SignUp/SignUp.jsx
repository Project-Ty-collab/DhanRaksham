import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }
    console.log('Signed Up with:', email, password);
    // After successful sign-up, navigate to the home or sign-in page
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Sign Up</button>
        </form>
        <div className="links">
          <a href="/signin">Already have an account? Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
