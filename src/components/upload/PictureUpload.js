import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    setSelectedImage(file);
  }

  function handleImageUpload() {
    if (!selectedImage) {
      alert('먼저 이미지를 선택해주세요.');
      return;
    }

    if (
      !selectedImage.type.includes('png') &&
      !selectedImage.type.includes('jpg') &&
      !selectedImage.type.includes('jpeg')
    ) {
      alert('이미지는 png 또는 jpg 형식이어야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    fetch('http://127.0.0.1:8080/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('백엔드 응답:', data);
        setPrediction(data.result);
        alert('이미지 업로드가 성공적으로 완료되었습니다!');
      })
      .catch((error) => {
        console.error('이미지 업로드 오류:', error);
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      });
  }

  const commonButtonStyle = {
    margin: '30px',
    width: 270,
    height: 50,
    background: '#6AAF5F',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  return (
    <Box
      className="cate-box-container"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '400px',
      }}
    >
      <label htmlFor="image-input">
        <input
          type="file"
          id="image-input"
          accept="image/png, image/jpeg"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <Paper
          elevation={2}
          className="cat-paper-item"
          sx={{
            ...commonButtonStyle,
            margin: '30px',
            background: 'white',
            border: '2px solid #6AAF5F',
          }}
        >
          {!selectedImage ? (
            <Typography variant="h6" sx={{ fontSize: '20px', color: '#6E6E6E', textAlign: 'center' }}>
              이미지 선택
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ fontSize: '16px', color: '#6E6E6E', textAlign: 'center' }}>
              {selectedImage.name}
            </Typography>
          )}
        </Paper>
      </label>
      <Paper
        elevation={2}
        className="cat-paper-item"
        sx={{
          ...commonButtonStyle,
          background: 'white',
          border: '2px solid #6AAF5F',
        }}
        onClick={handleImageUpload}
      >
        <Typography variant="h6" sx={{ fontSize: '20px', color: '#6E6E6E', textAlign: 'center' }}>
          이미지 업로드
        </Typography>
      </Paper>
      {prediction !== null && (
        <Typography variant="h6" sx={{ fontSize: '20px', color: '#6E6E6E', textAlign: 'center' }}>
          판별된 숫자: {prediction}
        </Typography>
      )}
    </Box>
  );
}

export default Upload;
