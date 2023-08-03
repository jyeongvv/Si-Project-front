import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);
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
      </form>
      <p>
        아직 회원이 아니신가요? <Link to="/join">회원가입 페이지로 이동</Link>
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default Login;
