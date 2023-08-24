import React from 'react';
import Pagination from '@mui/material/Pagination';
import './Pagination.css';
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
              color: '#7BA0E2', // 숫자의 색상을 #6AAF5F로 변경
            },
            '& .Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: '#FFFFFF', // 선택된 페이지의 배경 색상은 #6AAF5F이고 숫자 색상은 하얀색(#FFFFFF)으로 변경
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
