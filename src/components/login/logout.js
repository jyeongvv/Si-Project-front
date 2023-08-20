import * as React from 'react';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const Logout = () => {
  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];

    window.location.href = '/login';
  };

  return (
    <IconButton
      className="logout-icon"
      onClick={handleLogoutClick}
      aria-label="Logout"
      color="inherit"
    >
      <LogoutIcon fontSize="small" />
      Logout
    </IconButton>
  );
};

export default Logout;
