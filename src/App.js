import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/navigation/NavBar';
import Home from './components/main/home'
import CommunityPage from './components/community/community-page/CommunityPage';
import Page2 from './components/page/page2';
import Page3 from './components/page/page3';
import Page4 from './components/page/page4';
import Login from './components/login/Login';
import Join from './components/login/Join';

const App = () => {
  const [setLoggedIn] = useState(false);
  const [setUserNickname] = useState('');
  

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<CommunityPage />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path='/page3' element={<Page3 />} />
          <Route path='/page4' element={<Page4 />} />
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn} setNickname={setUserNickname} />} />
          <Route path='/join' element={<Join />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
