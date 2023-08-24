import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import AccountMenu from '../menu/Menu';
import jwtDecode from 'jwt-decode';
import homeIconImage from '../../img/KakaoTalk_Image_2023-08-24-15-08-30.png';

const NavBar = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const localToken = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기

    if (localToken) {
      try {
        const decoded = jwtDecode(localToken);
        setDecodedToken(decoded);
        console.log('Decoded Token:', decoded); // 디코딩된 토큰 콘솔 출력
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [location.pathname]); // location.pathname에 변경이 있을 때마다 실행

  return (
    <div className="nav-bg-container">
      <div className="content">
        <nav id="primary_nav_wrap">
          <ul>
            <li>
              <Link to="/">
                <img src={homeIconImage} alt="Home" style={{ width: '45px', height: '45px', color: '#7BA0E2' }} />
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