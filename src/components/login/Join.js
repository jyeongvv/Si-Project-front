import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);

  const handleJoin = () => {
    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // 이메일과 아이디 중복 확인을 하지 않았을 경우에 대한 처리 추가
    if (!isEmailChecked || !isUsernameChecked) {
      alert("이메일과 아이디 중복 확인을 해주세요.");
      return;
    }

    // 제출 처리
    alert("회원가입이 완료되었습니다.");
  };

  const handleEmailDuplicationCheck = () => {
    // 이메일 중복 확인 처리
    setIsEmailChecked(true);
    alert("이메일을 사용할 수 있습니다.");
  };

  const handleUsernameDuplicationCheck = () => {
    // 아이디 중복 확인 처리
    setIsUsernameChecked(true);
    alert("아이디를 사용할 수 있습니다.");
  };

  return (
    <div className="myapp-join-box">
      <h2>회원가입 페이지</h2>

      <div className="myapp-input-container">
        <button className="myapp-check-button" onClick={handleEmailDuplicationCheck}>
          E-mail 확인
        </button>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="email">이메일</label>
      </div>

      <div className="myapp-input-container">
        <button className="myapp-check-button" onClick={handleUsernameDuplicationCheck}>
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

      <div className="myapp-input-container">
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password">비밀번호</label>
      </div>

      <div className="myapp-input-container">
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm-password">비밀번호 확인</label>
      </div>

      <button className="myapp-submit-button" onClick={handleJoin}>
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
