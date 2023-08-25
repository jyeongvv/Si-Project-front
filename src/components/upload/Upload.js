import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import './Upload.css';
import CustomCard from './ReturnCard'; // ReturnCard 컴포넌트를 임포트합니다.
import Cocktail from './CockLoad'; // Cocktail 컴포넌트를 임포트합니다.

const UploadForm = () => {
  const [textData, setTextData] = useState(Array(1).fill(''));
  const [pictureData, setPictureData] = useState(Array(1).fill(null));
  const [responseData, setResponseData] = useState([]);
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(Array(1).fill(false));
  const [isLoading, setIsLoading] = useState(false);

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

  const handleTextChange = (index, value) => {
    const newTextData = [...textData];
    newTextData[index] = value;
    setTextData(newTextData);
  };

  const handlePictureChange = (acceptedFiles, index) => {
    const newPictureData = [...pictureData];
    newPictureData[index] = acceptedFiles[0];
    setPictureData(newPictureData);
    setSelectedFiles([...selectedFiles.slice(0, index), true, ...selectedFiles.slice(index + 1)]);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
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

      console.log(response.data);

      if (response.status === 200 && Array.isArray(response.data)) {
        setResponseData(response.data);
      } else {
        setResponseData([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        if (typeof error.response.data.message === 'string') {
          alert(error.response.data.message);
        } else {
          alert('업로드 실패: 알 수 없는 오류가 발생했습니다.');
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      {isLoading && (
        <div className="loading-overlay">
          <Cocktail /> {/* 로딩 애니메이션을 넣어줍니다 */}
        </div>
      )}
      <h2>Text Input</h2>
      <div className="text-input-container">
        {textData.map((text, index) => (
          <div key={index} className="text-input-wrapper">
            <input
              type="text"
              value={text}
              onChange={(event) => handleTextChange(index, event.target.value)}
              placeholder={`Text ${index + 1}`}
              className="text-input"
            />
          </div>
        ))}
      </div>
      <h2>Image Upload</h2>
      <div className="image-upload-container">
        {pictureData.map((picture, index) => (
          <div key={`picture${index}`} className="image-upload-wrapper">
            <Dropzone
              onDrop={(acceptedFiles) => handlePictureChange(acceptedFiles, index)}
              accept="image/*"
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  {selectedFiles[index] && picture ? (
                    <div className="image-preview">
                      <img src={URL.createObjectURL(picture)} alt={`Uploaded ${index + 1}`} />
                    </div>
                  ) : (
                    <p className="dropzone-text">이미지를 여기에 드래그하거나 클릭하여 선택하세요.</p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">
        전송
      </button>
      {responseData.length > 0 && (
        <div>
          <h2>Response Data</h2>
          {responseData.map((row, index) => (
            <CustomCard key={index} recipeData={row} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
