import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import  themeMode  from './theme';
import Sidebar from './components/sidebar';
import ThemeToggle from './components/theme_mode';
import Dashboard from './pages/dashboard';
import CreateAssessment from './pages/create_assessment';
import ManageQuestionBank from './pages/question_bank_management';

const App = () => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const theme = themeMode(isDarkTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            bgcolor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <ThemeToggle />
          </Box>
          <Paper elevation={0} sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-assessment" element={<CreateAssessment />} />
              <Route path="/manage-question-bank" element={<ManageQuestionBank />} />
            </Routes>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
