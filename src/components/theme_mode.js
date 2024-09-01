import React from 'react';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { toggleTheme } from '../redux/themeReducer';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <IconButton color="inherit" onClick={handleThemeChange}>
      {isDarkTheme ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
