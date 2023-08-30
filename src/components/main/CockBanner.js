import React, { useRef } from 'react';
import './CockBanner.css';
import Cocktitle from './CockTitle';

const CockBanner = () => {
  const tableRef = useRef(null);

  const handleTableClick = () => {
    if (tableRef.current) {
      window.scrollTo({
        top: tableRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <Cocktitle />
      <div className="container">
        <div className="additional-text" onClick={handleTableClick}>
          <img
            src="https://img.icons8.com/?size=512&id=100368&format=png"
            alt="Additional Image"
            style={{ width: '30px' }}
          />
          Click Me!
          <br />
        </div>
        <div className="table" onClick={handleTableClick} ref={tableRef}>
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
        </div>
      </div>
    </div>
  );
};

export default CockBanner;
