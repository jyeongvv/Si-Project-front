import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTokenAction } from '../../redux/actions/authActions';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/login',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      const token = response.data;
      // 로그인 성공 시
      if (response.status === 200) {
        dispatch(setTokenAction(token)); // Redux
        console.log('로그인 성공:', response.data);
        // 로컬 스토리지
        localStorage.setItem('token', token);
        navigate('/'); // 홈으로 이동
      }

    } catch (error) {
      console.error('로그인 실패:', error);
      alert(error.message);
    }
  };

  return (
    <div className="myapp-login-box">
      <h2>로그인</h2>
      <form>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>사용자 이름</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>비밀번호</label>
        </div>
        <button className="myapp-submit-button" type="submit" onClick={handleLogin}>
          로그인
        </button>
        <br />
      </form>
      <p>
        아직 회원이 아니신가요? <Link to="/join">회원가입 페이지로 이동</Link>
      </p>
    </div>
  );
};

export default Login;
