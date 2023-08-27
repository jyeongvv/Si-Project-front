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
      <div className="modal-page-1">
        <div className="modal-page__container">
          <a href="#modal-article" className="open-modal" onClick={openModal}>
            ?
          </a>
        </div>
      </div>
      {isModalOpen && (
        <div
          id="modal-article"
          className="modal"
          onClick={handleModalClick}
        >
          <div className="modal__container">
            <a href="#" className="modal__close" onClick={closeModal}>
              <span className="screen-reader">close</span>
            </a>
            <div className="modal__content" onClick={handleContentClick}>
              <h1 className="modal__title r-title">ChalCock Service Manual</h1>
              <p className="modal__text">
                1. 가지고 있는 술의 사진을 칵테일 모양의 Dropzone을 클릭해 업로드 합니다.
                <br />
                2. 아래 버튼을 클릭해 가지고 있는 술로 만들 수 있는 칵테일을 분석해 올때까지 기다립니다.
                <br />
                3. 텍스트 입력창에 텍스트로 입력해도 검색할 수 있습니다.
              </p>
            </div>
            {/* 닫기 버튼을 맨 아래로 이동시킵니다 */}
            <button className="modal__close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;