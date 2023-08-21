import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Cockcard.css';

function Cockcard({ cocktailName, cnum }) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    console.log("cnum value in Cockcard:", cnum);
    const fetchImage = async () => {
      if (cnum !== '') {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8080/images/${cnum}`);
          if (response.ok) {
            const imageData = await response.text();
            setImageUrl(`data:image/jpeg;base64,${imageData}`);
          } else {
            console.error('Image not found');
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchImage();
  }, [cnum]);

  return (
    <div className="card-container">
      <div className="card-img">
        {loading ? <p>Loading...</p> : imageUrl && (
          <img
            src={imageUrl}
            alt={`Cocktail ${cocktailName}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      <div className="card-name">{cocktailName}</div>
    </div>
  );
}

export default Cockcard;
