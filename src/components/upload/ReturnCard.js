import React, { useState } from 'react';
import './ReturnCard.css';

function CustomCard({ recipeData }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`custom-card ${isOpen ? 'open' : ''}`} onClick={toggleCard}>
      <div className="card-content">
        <div className="custom-header">
          <div className="card-image" style={{ backgroundImage: `url(${recipeData.image})` }}></div>
          <h2>{recipeData.name}</h2>
        </div>
        {isOpen && (
          <div className="custom-details">
            <p className="custom-ingredients">재료</p>
            <ul className="custom-ingredients">
              {recipeData.ingredients.split(', ').map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>제조법</h3>
            <p>{recipeData.cmethod ? recipeData.cmethod.replace("Method: ", "") : ''}</p>
            {recipeData.garnish && (
              <>
                <h3>가니쉬</h3>
                <p>{recipeData.garnish}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomCard;