import React, { useRef, useEffect } from 'react';
import './CockTitle.css';

function Cocktitle() {
  const textRef = useRef(null);

  useEffect(() => {
    const string1 = "Chalcock "; // First line of text
    const string2 = "찰칵 찍어서 나오는 칵테일 "; // Second line of text

    let currentIndex1 = 0;
    let currentIndex2 = 0;
    let animationRunning = true; // Flag to control animation

    const animate = async () => {
      if (!animationRunning) return;

      if (currentIndex1 < string1.length || currentIndex2 < string2.length) {
        const combinedText = `${string1.substring(0, currentIndex1)}<br style="margin-top: -20px;"><span class="small-font">${string2.substring(0, currentIndex2)}</span>`;
        textRef.current.innerHTML = combinedText;

        if (currentIndex1 < string1.length) {
          currentIndex1++;
        }

        if (currentIndex2 < string2.length) {
          currentIndex2++;
        }

        await new Promise(resolve => setTimeout(resolve, 90));
        animate();
      }
    };

    animate();

    // Stop animation when both strings are fully displayed
    setTimeout(() => {
      animationRunning = false;
    }, (string1.length + string2.length) * 90 + 100);

  }, []);

  return (
    <div>
      <div id="str" ref={textRef}></div>
    </div>
  );
}

export default Cocktitle;
