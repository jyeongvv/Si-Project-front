import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Upload.css';

const UploadForm = () => {
  const [textData, setTextData] = useState(Array(3).fill(''));
  const [pictureData, setPictureData] = useState(Array(3).fill(null));
  const [responseData, setResponseData] = useState([]);
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(Array(3).fill(false));

  useEffect(() => {
    const fetchIngredientsList = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080');
        if (response.status === 200 && Array.isArray(response.data)) {
          setSuggestedIngredients(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchIngredientsList();
  }, []);

  const handleTextChange = (index, event) => {
    const newTextData = [...textData];
    newTextData[index] = event.target.value;
    setTextData(newTextData);
  };

  const handleFileSelect = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = true;
    setSelectedFiles(newSelectedFiles);
  };

  const handlePictureChange = (index, event) => {
    const newPictureData = [...pictureData];
    newPictureData[index] = event.target.files[0];
    setPictureData(newPictureData);
    handleFileSelect(index);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      textData.forEach((text, index) => {
        if (text.trim() !== '') {
          formData.append('textData', text);
        }
      });

      pictureData.forEach((picture, index) => {
        formData.append('pictureData', picture || '');
      });

      const response = await axios.post('http://127.0.0.1:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response);

      if (response.status === 200 && Array.isArray(response.data)) {
        setResponseData(response.data);
      } else {
        setResponseData([]);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        if (typeof error.response.data.message === 'string') {
          alert(error.response.data.message);
        } else {
          alert('업로드 실패: 알 수 없는 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <div className="upload-form-container">
      <h2>Text Input</h2>
      <div className="text-input-container">
        {textData.map((text, index) => (
          <div key={index} className="text-input-wrapper">
            <input
              type="text"
              value={text}
              onChange={(event) => handleTextChange(index, event)}
              placeholder={`Text ${index + 1}`}
              className="text-input"
            />
            {suggestedIngredients.length > 0 && (
              <ul className="suggested-ingredients">
                {suggestedIngredients.slice(index * 10, (index + 1) * 10).map((ingredient, i) => (
                  <li
                    key={i}
                    onClick={() => handleTextChange(index, { target: { value: ingredient } })}
                    className="suggested-ingredient"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <h2>Image Upload</h2>
      <div className="image-upload-container">
        {pictureData.map((picture, index) => (
          <div key={`picture${index}`} className="image-upload-wrapper">
            <label htmlFor={`file${index}`} className="image-upload-label">
              <span className="image-upload-text">
                {selectedFiles[index] ? '파일 선택됨' : '이미지 선택'}
              </span>
            </label>
            <input
              id={`file${index}`}
              type="file"
              onChange={(event) => handlePictureChange(index, event)}
              className="image-upload-input"
            />
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="submit-button">
        전송
      </button>

      {responseData.length > 0 && (
        <div>
          <h2>Response Data</h2>
          <table className="response-table">
            <thead>
              <tr>
                <th>Cocktail Name</th>
                <th>Amount</th>
                <th>Ingredients</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((row, index) => (
                <tr key={index}>
                  <td>{row.cocktailName}</td>
                  <td>{row.amount}</td>
                  <td>{row.ingredients}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
