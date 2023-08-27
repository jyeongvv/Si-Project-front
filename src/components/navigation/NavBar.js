import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import AccountMenu from '../menu/Menu';
import jwtDecode from 'jwt-decode';
import homeIconImage from '../../img/KakaoTalk_Image_2023-08-27-23-38-29.png';

const NavBar = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const localToken = localStorage.getItem('token');

    if (localToken) {
      try {
        const decoded = jwtDecode(localToken);
        setDecodedToken(decoded);
        console.log('Decoded Token:', decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [location.pathname]);

  return (
    <div className="nav-bg-container">
      <div className="content">
        <nav id="primary_nav_wrap">
          <ul>
            <li>
              <Link to="/">
                <img src={homeIconImage} alt="Home" style={{ width: '40px'}} />
              </Link>
            </li>
            <li><Link to="/cocktailsearch">Search</Link></li>
            <li><Link to="/CBTI">CBTI</Link></li>
            <li><Link to="/board">Board</Link></li>
          </ul>
        </nav>
        <div className="user-info">
          {decodedToken && decodedToken.nickname && (
            <div className="user-info-wrapper">
              <div className="user-info-image"></div> {/* 이미지 표시 */}
              <div className="user-id">{`${decodedToken.nickname}`}</div>
            </div>
          )}
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default NavBar;