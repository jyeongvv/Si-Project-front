import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Cockcard.css';

function Cockcard({ englishName, image }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [image]);

  return (
    <div className="card-container">
      <div className="card-img" style={{ backgroundImage: `url(${image})` }}>
        {loading && <p>Loading...</p>}
      </div>
      <div className="card-name">{englishName}</div>
    </div>
  );
}

export default Cockcard;
