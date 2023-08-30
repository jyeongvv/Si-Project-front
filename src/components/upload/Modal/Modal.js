import React, { useState } from 'react';
import './Modal.css'; // 스타일 파일을 임포트하세요

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = () => {
    closeModal();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='modal-page'>
      <div className="page">
        <div className="page__container">
          <a href="#popup-article" className="open-popup" onClick={openModal}>
            ?
          </a>
        </div>
      </div>
      {isModalOpen && (
        <div
          id="popup-article"
          className="popup"
          onClick={handleModalClick}
        >
          <div className="popup__container">
            <a href="#" className="popup__close" onClick={closeModal}>
              <span className="screen-reader">close</span>
            </a>
            <div className="popup__content" onClick={handleContentClick}>
              <h1 className="popup__title r-title">ChalCock Service Manual</h1>
              <p className="popup__text">
                1. 가지고 있는 술의 사진을 칵테일 모양의 이미지 업로드 박스를 클릭해 업로드 합니다.
                <br />
                2. 아래 버튼을 클릭해 가지고 있는 술로 만들 수 있는 칵테일을 분석해 올때까지 기다립니다.
                <br />
                3. 모델 인식 후 추천 칵테일 결과는 페이지 하단에 나타납니다.
              </p>
            </div>
            {/* 닫기 버튼을 맨 아래로 이동시킵니다 */}
            <button className="popup__close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
