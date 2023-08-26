import React from 'react';
import './CockBanner.css';
import Cocktitle from './CockTitle';
import { Link } from 'react-router-dom';

const CockBanner = () => {
  return (
    <div>
      <Cocktitle />
      <div className="container">
        <Link to="/main">
          <div className="table">
            <div className="glassHead">
              <div className="strawContainer">
                <div className="straw"></div>
                <div className='stem'></div>
                <div className="cherry"></div>
                <div className='circle'></div>
                <div className="ice"></div>
                <div className="ice ice2"></div>
                <div className="ice ice3"></div>
              </div>
            </div>
            <div className="liquid2"></div>
            <div className="liquid"> </div>
            {/* <div className='gradient-liquid'></div> */}
            <div className="glassBar"></div>
            <div className="glassFoot"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CockBanner;
