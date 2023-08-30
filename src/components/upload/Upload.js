import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import './Upload.css';
import Cocktail from './CockLoad';
import Product from './Product';
import Modal from './Modal/Modal';
import Animation from './Animation/Animation';

const UploadForm = () => {
  const [textData, setTextData] = useState(Array(1).fill(''));
  const [pictureData, setPictureData] = useState(Array(1).fill(null));
  const [responseData, setResponseData] = useState([]);
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(Array(1).fill(false));
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

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

      if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
        setResponseData(response.data);
        setErrorText('');
        console.log(response.data);

        const animationElement = document.querySelector('.animation-container');
        if (animationElement) {
          window.scrollTo({
            top: animationElement.offsetTop,
            behavior: 'smooth',
          });
        }
      } else {
        setResponseData([]);
        alert('잘못된 사진을 입력하셨습니다.');
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
          <Cocktail />
        </div>
      )}
      <Modal />
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
                    <p className="dropzone-text"></p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">
        
      </button>
      <Animation />

      {responseData.length > 0 && (
        <div className="animation-container">
          <Product responseData={responseData} />
        </div>
      )}
      {errorText && (
        <h2>{errorText}</h2>
      )}
    </div>
  );
};

export default UploadForm;
