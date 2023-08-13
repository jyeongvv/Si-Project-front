import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [texts, setTexts] = useState({
    text1: '',
    text2: '',
    text3: ''
  });

  const [pictures, setPictures] = useState({
    picture1: null,
    picture2: null,
    picture3: null
  });

  const [picture1, setPicture1] = useState("");
  const [picture2, setPicture2] = useState("");
  const [picture3, setPicture3] = useState("");

  const handleDrop = (acceptedFiles, pictureKey) => {
    setPictures({
      ...pictures,
      [pictureKey]: acceptedFiles[0]
    });
  };

  const handleTextChange = (key, event) => {
    setTexts({
      ...texts,
      [key]: event.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = new FormData();
      dataToSend.append('text1', texts.text1 || '');
      dataToSend.append('text2', texts.text2 || '');
      dataToSend.append('text3', texts.text3 || '');
      dataToSend.append('picture1', pictures.picture1);
      dataToSend.append('picture2', pictures.picture2);
      dataToSend.append('picture3', pictures.picture3);
  
      const response = await axios.post('http://127.0.0.1:8080/upload', dataToSend);
  
      console.log("response:",response);
      console.log('response.data:', response.data);
      console.log("response.data.picture1:", response.data.picture1);
      setPicture1(response.data.picture1);
      setPicture2(response.data.picture2);
      setPicture3(response.data.picture3);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" onChange={(event) => handleDrop(event.target.files, 'picture1')} />
      <input type="file" onChange={(event) => handleDrop(event.target.files, 'picture2')} />
      <input type="file" onChange={(event) => handleDrop(event.target.files, 'picture3')} />

      <h2>Text Input</h2>
      {Object.keys(texts).map((key) => (
        <input
          key={key}
          type="text"
          value={texts[key]}
          onChange={(event) => handleTextChange(key, event)}
          placeholder={key}
        />
      ))}

      <button onClick={handleSubmit}>전송</button>
      <p>그림1:{picture1}</p>
      <p>그림2:{picture2}</p>
      <p>그림3:{picture3}</p>
    </div>
  );
};

export default UploadForm;