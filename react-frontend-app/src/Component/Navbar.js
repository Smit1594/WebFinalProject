import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  return (
    <nav className="navbar navbar-expand-lg navbar-custom px-3">
      <Link className="navbar-brand" to={userRole === 'admin' ? "/dashboard" : "/"}>StepInStyle</Link>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">

          {userRole === 'admin' ?
            <li className="nav-item">
              <Link className="nav-link" to="/category">Category</Link>
            </li> :
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>
          }

          {userRole === 'admin' ?
            <li className="nav-item">
              <Link className="nav-link" to="/"
                onClick={() => {
                  localStorage.setItem('userRole', 'user');
                  navigate('/');
                }}>
                Logout</Link>
            </li> :
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
