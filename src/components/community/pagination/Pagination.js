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
        main: '#7BA0E2', // 버튼의 색상을 #6AAF5F로 변경
      },
    },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ThemeProvider theme={theme}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#7BA0E2',
            },
            '& .Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: '#eeeeee',
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
