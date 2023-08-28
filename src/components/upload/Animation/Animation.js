import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Animation.css'; // Make sure to import the correct CSS file

const Marquee = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    // Send a GET request to localhost:8080/search
    axios.get('http://localhost:8080/search')
      .then(response => {
        console.log('Server Response:', response.data); // Log the server response
        setResponse(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="animation-marquee-container">
      <div className="animation-marquee">
        <div className="animation-marquee-group">
          {response.map((cocktail, index) => (
            <div key={index} className="animation-card">
              <div
                className="animation-card-image"
                style={{ backgroundImage: `url(${cocktail.image})` }}
              >
                <div className="animation-overlay">
                  <div className="animation-cardh4">{cocktail.englishName}</div>
                  <div className="animation-cardp">{cocktail.koreanName}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Marquee;