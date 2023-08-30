import React from 'react';
import './CockBanner.css';
import Cocktitle from './CockTitle';
import { Link } from 'react-router-dom';

const CockBanner = () => {
  return (
    <div>
      <Cocktitle />
      {/* <div className="additional-text">
        이곳에 추가할 텍스트를 작성하세요.
      </div> */}
      <div className="container">
      <div className="additional-text">
        <img
              src="https://img.icons8.com/?size=512&id=100368&format=png"
              alt="Additional Image"
              style={{ width: '30px' }} // 이미지의 너비를 100px로 조정

            />
             Click Me! 
             <br />
             {/* Find Your Cocktail! */}
      </div>
      {/* <div className='additional-text'>
        Find Your Cocktail!
      </div> */}
        <div className="table">
          <Link to="/main">
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
            <div className="glassBar"></div>
            <div className="glassFoot"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CockBanner;
