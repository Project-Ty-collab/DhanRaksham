import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import './Header.css'

export const Header = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  return (
    <nav>
    <div className="container nav-container">
      <div className="logo">DhanRaksham</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#market">Markets</a></li>
        <li><a href="#insurance">Insurance</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="twobtn">
      <button className="auth-btn" onClick={handleSignInClick}>Sign In</button>
      <button className="auth-btn" onClick={handleSignUpClick}>Sign Up</button>
      </div>

    </div>
  </nav>
  )
}

export default Header;