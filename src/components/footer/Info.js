import React from 'react';
import './Info.css';
import { Link } from 'react-router-dom';

const Info = () => {
  return (
    <div className="footer-container">
      <div className="footer-section1">
        <Link to="/team" className="button-link">
          Crew Profile
        </Link>  
      </div>
    </div>
  );
};

export default Info;
