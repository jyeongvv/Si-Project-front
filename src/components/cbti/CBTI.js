import React, { useState, useEffect } from 'react';
import './CBTI.css';
import Cockcard from './Cockcard';
import axios from 'axios';

function CBTI() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [matchingCocktails, setMatchingCocktails] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [noMatchingCocktails, setNoMatchingCocktails] = useState(false);

  const slides = [
    {
      question: "선호하는 칵테일의 맛을 골라주세요",
      options: ['달콤한', '상큼한', '부드러운', '새콤한', '쌉쌀한']
    },
    {
      question: '칵테일의 도수는 어느정도의 레벨이었으면 좋겠나요?',
      options: ['높게', '낮게']
    },
    {
      question: '어떤 분위기에서 마시고 싶나요?',
      options: ['파티/이벤트용', '격식있는 자리용', '캐주얼한 모임용', '로맨틱한 데이트용']
    }
  ];

  const fetchMatchingCocktails = async () => {
    try {
      if (selectedOptions.length === 3) {
        const endpoint = 'http://localhost:8080/cbti';
        const [taste, level, place] = selectedOptions;

        const response = await axios.post(endpoint, null, {
          params: { level, taste, place },
        });

        const data = response.data;

        if (data.length === 0) {
          setNoMatchingCocktails(true);
        } else {
          setMatchingCocktails(data);
        }
        setShowResult(true);
        console.log('Response:', data);
      }
    } catch (error) {
      console.error('Error fetching matching cocktails:', error);
    }
  };

  useEffect(() => {
    fetchMatchingCocktails();
  }, [selectedOptions]);

  const selectOption = (optionIndex) => {
    const selectedOption = slides[slideIndex].options[optionIndex];
    setSelectedOptions(prevOptions => [...prevOptions, selectedOption]);
    next();
  };

  const next = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(prevIndex => prevIndex + 1);
    }
  };

  const reset = () => {
    setSlideIndex(0);
    setSelectedOptions([]);
    setMatchingCocktails([]);
    setNoMatchingCocktails(false);
    setShowResult(false);
  };

  const slideWidth = 300 / slides.length;
  const left = `${-slideIndex * (slideWidth + (slideIndex === slides.length - 1 && selectedOptions.length === 3 ? 50 : 0))}%`;

  return (
    <div>
      <div id="q-cont" style={{ left: left }}>
        {/* {showResult ? null : <qconth2 style={{ textAlign: 'center', marginBottom: '1em' }}>당신의 CBTi를 찾아보세요</qconth2>} */}

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide${index === slideIndex ? ' slide' : ''}`}
          >
            <div className="question">{slide.question}</div>
            <div className="options">
              {slide.options.map((option, optionIndex) => (
                <span
                  key={optionIndex}
                  className={`op${optionIndex % 2 === 0 ? '' : ' op2'}${selectedOptions.includes(option) ? ' button_selected' : ''}`}
                  onClick={() => selectOption(optionIndex)}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        ))}
        {showResult && (
          <div className={`slide${slideIndex === slides.length - 1 ? ' slide' : ''}`}>
            <div className="question">선택하신 옵션입니다!</div>
            <div className="selected-options">
              {selectedOptions.map((option, index) => (
                <p key={index}>{option}</p>
              ))}
              <div className="re" onClick={reset}>
                Reset
              </div>
            </div>
                    
            {noMatchingCocktails ? (
              <div className="matching-cocktails">
                <br/>일치하는 칵테일이 없습니다..
              </div>
            ) : (
              <div>
                <br/>
                <div className="question">당신의 CBTI에 맞는 칵테일입니다!</div>
                <br/>
                <div className="matching-cocktails">
                  <div className="card-grid">
                    {matchingCocktails.map(cocktail => (
                      <div key={cocktail.id}>
                        <Cockcard englishName={cocktail.englishName} image={cocktail.image} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {!showResult && <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>당신의 CBTI(Cocktail MBTI)를 찾아보세요!</h1>}
    </div>
  );
}

export default CBTI;