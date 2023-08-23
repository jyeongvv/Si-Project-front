import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';
import axios from 'axios';

const Join = () => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState(''); // Add email state
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const handleJoin = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isUsernameChecked) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    if (!isNicknameChecked) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8080/join', {
        username: username,
        nickname: nickname,
        password: password,
        number: number,
        email: email, // Include email in the request
      });
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      console.error('Error while joining:', error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleUsernameDuplicationCheck = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8080/join/check-username`, null, {
        params: {
          username: username,
        },
      });
      if (response.data) {
        setIsUsernameChecked(true);
        alert("아이디를 사용할 수 있습니다.");
      } else {
        alert("아이디가 이미 사용중입니다.");
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
      alert("아이디 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleNicknameDuplicationCheck = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8080/join/check-nickname`, null, {
        params: {
          nickname: nickname,
        },
      });
      if (response.data) {
        setIsNicknameChecked(true);
        alert("닉네임을 사용할 수 있습니다.");
      } else {
        alert("닉네임이 이미 사용중입니다.");
      }
    } catch (error) {
      console.error('Error checking nickname availability:', error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="myapp-join-box">
      <h2>회원가입 페이지</h2>

      <div className="join-input-container">
        <button className="join-check-button" onClick={handleUsernameDuplicationCheck}>
          ID 확인
        </button>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="username">아이디</label>
      </div>

      <div className="join-input-container">
        <button className="join-check-button" onClick={handleNicknameDuplicationCheck}>
          닉네임 확인
        </button>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <label htmlFor="nickname">닉네임</label>
      </div>

      <div className="join-input-container">
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password">비밀번호</label>
      </div>

      <div className="join-input-container">
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm-password">비밀번호 확인</label>
      </div>

      <div className="join-input-container">
        <input
          id="phone-number"
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <label htmlFor="phone-number">전화번호</label>
      </div>

      <div className="join-input-container">
        <input
          id="email" // Add email input field
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="email">이메일</label>
      </div>

      <button className="join-submit-button" onClick={handleJoin}>
        제출
      </button>
      <br />
      <p>
        이미 회원이신가요? <Link to="/login">로그인 페이지로 이동</Link>
      </p>
    </div>
  );
};

export default Join;
