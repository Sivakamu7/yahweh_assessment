import { createTheme } from '@mui/material/styles';

function themeMode(isDarkTheme) {
  return createTheme({
    palette: {
      mode: isDarkTheme ? 'dark' : 'light',
      primary: {
        main: '#FFFFFF', 
        light: '#ADADAD', 
        dark: '#115293',
        tertiary: '#F4F4F4',
        scroll: '#E0E0E0', 
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#ADADAD',
        light: '#F7B446',
        dark: '#2D1B1B',
        tertiary: '#252525',
        scroll: '#414141',
        contrastText: '#FFFFFF',
      },
      action: {
        hover: '#ADADAD',
        selected: '#F7B446',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: (theme) => theme.palette.secondary.light,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: (theme) => theme.palette.action.selected,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '&:hover': {
              borderColor: (theme) => theme.palette.action.selected,
            },
          },
        },
      },
    },
  });
}

export default themeMode;
