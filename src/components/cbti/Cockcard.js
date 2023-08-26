import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Cockcard.css';
import axios from 'axios';

function Cockcard({ cocktailName }) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      // Axios를 사용하여 Spring 서비스로 POST 요청 보내기
      axios.post('http://localhost:8080/cbti')
        .then(response => {
          if (response.status === 200) {
            const { image } = response.data; // 예시로 image를 받아오는 예제입니다. 실제 응답에 따라 수정해야 합니다.
            setImageUrl(image);
          } else {
            console.error('Image not found');
          }
        })
        .catch(error => {
          console.error('Error fetching image:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('Error fetching image:', error);
      setLoading(false);
    }
  }, []);

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