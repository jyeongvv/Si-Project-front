import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Category = () => {
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
      <Link to="/join" style={{ textDecoration: 'none' }}>
        <Paper
          elevation={2}
          className="cat-paper-item"
          sx={{
            margin: '30px',
            width: 270,
            height: 200,
            background: 'white',
            borderRadius: 10,
            border: '2px solid #6AAF5F',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '20px', color: '#6E6E6E' }}>이혼😵‍💫</Typography>
        </Paper>
      </Link>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Paper
          elevation={2}
          className="cat-paper-item"
          sx={{
            margin: '30px',
            width: 270,
            height: 200,
            background: '',
            borderRadius: 10,
            border: '2px solid #6AAF5F',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '20px', color: '#6E6E6E' }}>상속👦🏻</Typography>
        </Paper>
      </Link>
    </Box>
  );
};

export default Category;
