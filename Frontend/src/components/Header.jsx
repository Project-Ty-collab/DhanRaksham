import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router';

export const Header = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  return (
    <div>
      <nav>
        <div className="container nav-container">
          <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />DhanRaksham</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#market">Markets</a></li>
            <li><a href="#insurance">Insurance</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header;