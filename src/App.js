import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/navigation/NavBar';
import Home from './components/main/home'
import CommunityPage from './components/community/community-page/CommunityPage';
import CocktailSearch from './components/cocktailsearch/CocktailSearch';
import CBTI from './components/cbti/CBTI';
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
          <Route path="/cocktailsearch" element={<CocktailSearch />} />
          <Route path='/cbti' element={<CBTI />} />
          <Route path='/page4' element={<Page4 />} />
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn} setNickname={setUserNickname} />} />
          <Route path='/join' element={<Join />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
