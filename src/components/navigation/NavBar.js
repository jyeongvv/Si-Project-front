import React, { useEffect, useState } from 'react';
import './NavBar.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation } from 'react-router-dom';
import AccountMenu from '../menu/Menu';
import jwtDecode from 'jwt-decode';

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
            <li><Link to="/board">커뮤니티</Link></li>
            <li><Link to="/cocktailsearch">검색</Link></li>
            <a href='/'>
              <li><HomeIcon fontSize="large" style={{ color: '#6AAF5F' }} /></li>
            </a>
            <li><Link to="/CBTI">CockBTI</Link></li>
            <li><Link to="/page4">페이지4</Link></li>
          </ul>
        </nav>
        <div className="user-info">
          {decodedToken && decodedToken.nickname && (
            <div className="user-info-wrapper">
              <div className="user-id">{`환영합니다, ${decodedToken.nickname}님!`}</div>
            </div>
          )}
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
