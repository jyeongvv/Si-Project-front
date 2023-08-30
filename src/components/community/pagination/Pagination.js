import React from 'react';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CustomPagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (event, page) => {
    paginate(page);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(145, 183, 214)', // 버튼의 색상을 #6AAF5F로 변경
      },
    },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginRight: '20px' }}>
      <ThemeProvider theme={theme}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'rgb(145, 183, 214)',
            },
            '& .Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: '#f4f4f4',
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
