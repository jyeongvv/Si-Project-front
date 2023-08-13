import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8080/login', {
        userid: username,
        password: password,
      });

      // 로그인 성공 시 처리
      console.log('로그인 성공:', response.data);
      navigate('/'); // 홈으로

    } catch (error) {
      console.error('로그인 실패:', error);
      alert('아이디랑 비밀번호를 다시 한번 확인해주세요.');
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="myapp-login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <button className="myapp-submit-button" type="submit" onClick={handleLogin}>
          Submit
        </button>
        <br />
      </form>
      <p>
        아직 회원이 아니신가요? <Link to="/join">회원가입 페이지로 이동</Link>
      </p>
      <p>
        <button className="login-home-button" onClick={goToHome}>
          Home
        </button>
      </p>
    </div>
  );
};

export default Login;
