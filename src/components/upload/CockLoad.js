import React from 'react';
import './CockLoad.css';

const Cocktail = () => {
  return (
    <div className="wrapper">
      <div className="cocktail">
        <div className="liquid"></div>
        <div className="ice-cubes">
          <div className="ice-cube ice-cube-1"></div>
          <div className="ice-cube ice-cube-2"></div>
          <div className="ice-cube ice-cube-3"></div>
        </div>
        <div className="lemon-slice"></div>
        <div className="leaves">
          <div className="leave leave-1"></div>
          <div className="leave leave-2"></div>
          <div className="leave leave-3"></div>
        </div>
        <div className="straw"></div>
        <div className="straw-surface"></div>
        <div className="shadow"></div>
      </div>
      <p className="stirring-message">칵테일 열심히 젓는중!</p>
    </div>
  );
};

export default Cocktail;