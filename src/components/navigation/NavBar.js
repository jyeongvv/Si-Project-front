// src/components/navigation/NavBar.js
import React from 'react';
import './NavBar.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="nav-bg-container">
      <div className="content">
        <nav id="primary_nav_wrap">
          <ul>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/page2">Map</Link></li>
            <a href='/'>
            <li><HomeIcon fontSize="large" style={{ color: '#6AAF5F' }} /></li>
            </a>
            <li><Link to="/page3">CockBTI</Link></li>
            <li><Link to="/page4">page4</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;