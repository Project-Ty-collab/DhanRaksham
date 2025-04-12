import React from 'react'
import './Header.css'

export const Header = () => {
  return (
    <nav>
    <div className="container nav-container">
      <div className="logo">Finance<span>Hub</span></div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#market">Markets</a></li>
        <li><a href="#insurance">Insurance</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="twobtn">
        <button className="btn">Sign in</button>
        <button className="btn">Sign up</button>
      </div>

    </div>
  </nav>
  )
}

export default Header;