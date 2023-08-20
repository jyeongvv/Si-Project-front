import React from 'react';
import './NavBar.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import AccountMenu from '../menu/Menu';

const NavBar = ({ loggedIn, nickname }) => {
  return (
    <div className="nav-bg-container">
      <div className="content">
        <nav id="primary_nav_wrap">
          <ul>
            <li><Link to="/board">커뮤니티</Link></li>
            <li><Link to="/page2">지도</Link></li>
            <a href='/'>
              <li><HomeIcon fontSize="large" style={{ color: '#6AAF5F' }} /></li>
            </a>
            <li><Link to="/page3">CockBTI</Link></li>
            <li><Link to="/page4">페이지4</Link></li>
          </ul>
        </nav>
        <div className="user-info">
          {loggedIn && (
            <div className="user-nickname">{nickname}</div>
          )}
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
