/*import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate();
  return (
    <div className='navbar'>
        <img src="src/images/logo.png" alt="LOGO" width="130px" />
        <ul>
            
            <button><NavLink to='/adminlogin'><li>Admin Login</li></NavLink></button>
            <button><NavLink to='/trainerlogin'><li>Trainer Login</li></NavLink></button>
            <button><NavLink to='/studentlogin'><li>Student Login</li></NavLink></button>
            <button><NavLink to='/contact'><li>Contact</li></NavLink></button>
        </ul>
       
        

    </div>
  )
}

export default Navbar */
import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css"; // make sure this path is correct

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <NavLink to="/" className="navbar-logo">
          <img src="src/images/logo.png" alt="LOGO" />
        </NavLink>
      </div>

      {/* Right: Navigation Links */}
      <div className="navbar-right">
        <NavLink to="/adminlogin" className="nav-btn admin">
          Admin Login
        </NavLink>
        <NavLink to="/trainerlogin" className="nav-btn trainer">
          Trainer Login
        </NavLink>
        <NavLink to="/studentlogin" className="nav-btn student">
          Student Login
        </NavLink>
        <NavLink to="/contact" className="nav-btn contact">
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
