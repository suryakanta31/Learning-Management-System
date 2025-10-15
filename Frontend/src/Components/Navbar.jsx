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
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand fw-bold" to="/">
          <img src="src/images/logo.png" alt="LOGO" width="130" />
        </NavLink>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-1">
              <NavLink to="/adminlogin" className="btn btn-outline-primary">
                Admin Login
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink to="/trainerlogin" className="btn btn-outline-success">
                Trainer Login
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink to="/studentlogin" className="btn btn-outline-warning">
                Student Login
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink to="/contact" className="btn btn-outline-info">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
