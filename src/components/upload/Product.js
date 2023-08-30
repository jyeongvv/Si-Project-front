import React, { useState, useEffect } from 'react';
import './Product.css';

const Product = ({ responseData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 8; // 한 페이지당 표시할 이미지 수

  // 현재 페이지 변경 시 activeIndex를 조정하는 효과
  useEffect(() => {
    const startIndex = (currentPage - 1) * imagesPerPage;
    setActiveIndex(0); // 페이지가 변경될 때 마다 첫 번째 이미지로 activeIndex를 초기화합니다.
  }, [currentPage]);

  // 새로운 응답 데이터가 들어올 때 activeIndex와 currentPage 초기화
  useEffect(() => {
    setActiveIndex(0);
    setCurrentPage(1);
  }, [responseData]);

  // 새로운 응답 데이터가 들어올 때마다 페이지를 1페이지로 설정
  useEffect(() => {
    setCurrentPage(1);
  }, [responseData]);

  // 이미지 클릭 시 activeIndex 업데이트
  const handleImageItemClick = (index) => {
    setActiveIndex(index);
  };

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const visibleImages = responseData.slice(startIndex, endIndex);

  return (
    <div className="custom-product-container">
      <div className="product-left">
        <main>
          <div className="custom-main-container">
            <div className="grid product">
              <div className="column-xs-12 column-md-7">
                <div className="product-gallery">
                  <div className="product-image">
                    <img
                      className={`product-img`}
                      src={visibleImages[activeIndex]?.image}
                      alt={`Product ${startIndex + activeIndex + 1}`}
                    />
                  </div>
                </div>
              </div>
              <div className="column-xs-12 column-md-5">
                <h1 className="nps-h1">{visibleImages[activeIndex]?.koreanCocktailName}</h1>
                <h2 className="tangerine-h2">{visibleImages[activeIndex]?.englishCocktailName}</h2>
                <div className="description">
                  <div className="info-container">
                    <div>
                      <h2 className="nps-h2">베이스 술</h2>
                      <p className="nps-p">{visibleImages[activeIndex]?.koreanIngredient}</p>
                    </div>
                    <div>
                      <h2 className="nps-h2">인식 결과</h2>
                      <p className="nps-p">{visibleImages[activeIndex]?.userInputData}</p>
                    </div>
                  </div>
                  <div className="info-container">
                    {visibleImages[activeIndex]?.ingredients ? (
                      <div>
                        <h3 className="tangerine-h3">Ingredients</h3>
                        <ul className="nps-ul">
                          {visibleImages[activeIndex]?.ingredients.split(', ').map((ingredient, ingIndex) => (
                            <p key={ingIndex} className="nps-p">{ingredient}</p>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {visibleImages[activeIndex]?.garnish ? (
                      <div>
                        <h3 className="tangerine-h3">Garnish</h3>
                        <p className="nps-p">{visibleImages[activeIndex]?.garnish}</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="nps-h3">Garnish</h3>
                        <p className="nps-p">가니쉬는 없습니다.</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="method-container">
                  <h3 className="tangerine-h3">Method</h3>
                  <p className="nps-p">{visibleImages[activeIndex]?.method}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer>
        <div className="grid">
          <div className="column-xs-12">
            <p className="nps-p">추천 칵테일은 총 : {responseData.length}개!</p>
            <ul className="image-list">
              {visibleImages.map((row, index) => (
                <li key={startIndex + index} className="image-item">
                  <img
                    src={row.image}
                    alt={`Product ${startIndex + index + 1}`}
                    className={`thumbnail ${startIndex + index === activeIndex ? 'active-image' : ''}`}
                    onClick={() => handleImageItemClick(index)}
                  />
                </li>
              ))}
            </ul>
            <div className="pagination">
              {currentPage > 1 && (
                <button onClick={handlePrevPage}>&lt; Prev</button>
              )}
              {endIndex < responseData.length && (
                <button onClick={handleNextPage}>Next &gt;</button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Product;