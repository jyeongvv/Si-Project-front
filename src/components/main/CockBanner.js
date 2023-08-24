import React from 'react';
import './CockBanner.css';
import Cocktitle from './CockTitle'; // Cocktitle 컴포넌트 임포트

const CockBanner = () => {
  return (
    <div>
    <Cocktitle />
    <div className="container">
      <div className="table">
        <div className="glassHead">
          <div className="strawContainer">
            <div className="straw"></div>
            <div className="lemon"></div>
            <div className="ice"></div>
            <div className="ice ice2"></div>
            <div className="ice ice3"></div>
          </div>
        </div>
        <div className="liquid2"></div>
        <div className="liquid">

          {/* Cocktitle 컴포넌트를 칵테일 잔 위에 렌더링 */}
        </div>
        <div className="glassBar"></div>
        <div className="glassFoot"></div>
      </div>
    </div>
    </div>

  );
};

export default CockBanner;
