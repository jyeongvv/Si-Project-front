import React, { useState } from 'react';
import axiosInstance from '../../../../api/axiosInstance';
import './Popup.css';

function WriteFormPopup({ addPost }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axiosInstance.post('/board', JSON.stringify(newPost), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (response.data) {
          setNewPost({ title: '', content: '' });
          closePopup();
        }
      } else {
        alert('로그인이 필요한 기능입니다.');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  

  return (
    <div>
      <div id="wrapper">
        <p>
          <button className="board-add-button" onClick={openPopup}>
            Open Write Form
          </button>
        </p>
      </div>

      {isOpen && (
        <div className={`custom-overlay visible`}>
          <div className="board-modal-content">
            <span className="modal-close" onClick={closePopup}>
              &times;
            </span>
            <div className="popup-content board-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="제목"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                />
                <textarea
                  placeholder="Write your content here"
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                ></textarea>
                <button className="board-add-button" type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteFormPopup;
