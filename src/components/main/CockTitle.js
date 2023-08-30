import React, { useState, useEffect } from 'react';
import './CockTitle.css';

function Cocktitle() {
  const [displayText, setDisplayText] = useState('');

  const string1 = "Chalcock "; // First line of text
  const string2 = "찰칵✨ 찍어서 나오는 칵테일 "; // Second line of text

  useEffect(() => {
    let currentIndex1 = 0;
    let currentIndex2 = 0;
    let animationRunning = true; // Flag to control animation

    const animationInterval = setInterval(() => {
      if (!animationRunning) {
        clearInterval(animationInterval);
        return;
      }

      const combinedText = `${string1.substring(0, currentIndex1)}<br style="margin-top: -20px;"><span class="small-font">${string2.substring(0, currentIndex2)}</span>`;
      setDisplayText(combinedText);

      if (currentIndex1 < string1.length) {
        currentIndex1++;
      }

      if (currentIndex2 < string2.length) {
        currentIndex2++;
      }
    }, 90);

    // Stop animation when both strings are fully displayed
    setTimeout(() => {
      animationRunning = false;
    }, (string1.length + string2.length) * 90 + 100);

    return () => {
      clearInterval(animationInterval); // Clean up interval on component unmount
    }
  }, []);

  return (
    <div>
      <div id="str" dangerouslySetInnerHTML={{ __html: displayText }}></div>
    </div>
  );
}

export default Cocktitle;
