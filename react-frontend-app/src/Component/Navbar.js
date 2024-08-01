import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom px-3">
      <Link className="navbar-brand" to="/">StepInStyle</Link>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
