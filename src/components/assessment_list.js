import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Cancel, CheckCircle, Edit, HourglassEmpty, Visibility } from '@mui/icons-material';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, InputBase, Stack, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import themeMode from '../theme';
import StyledCard from './custom_components/styledcard';
import { styled } from '@mui/material/styles';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.8),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
  }
}));

const AssessmentList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const theme = themeMode(isDarkTheme);
  const isSmallScreen = useMediaQuery('(max-width:1200px)');

  const assessments = [
    { id: 1, title: 'JavaScript Basics', status: 'Completed' },
    { id: 2, title: 'React Advanced', status: 'In Progress' },
    { id: 3, title: 'CSS Fundamentals', status: 'Not Started' },
    { id: 4, title: 'HTML Basics', status: 'Completed' },
    { id: 5, title: 'Node.js Introduction', status: 'In Progress' },
  ];

  const filteredAssessments = assessments.filter(assessment =>
    assessment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle sx={{ color: 'green' }} />;
      case 'In Progress':
        return <HourglassEmpty sx={{ color: 'orange' }} />;
      case 'Not Started':
        return <Cancel sx={{ color: 'red' }} />;
      default:
        return null;
    }
  };

  const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: 'calc(100vh - 380px)',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: isDarkTheme ? theme.palette.secondary.tertiary : theme.palette.primary.tertiary,
    },
    '&::-webkit-scrollbar-thumb': {
      background: isDarkTheme ? theme.palette.secondary.scroll : theme.palette.primary.scroll,
      borderRadius: '4px',
    },
  }));

  return (
    <StyledCard sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 60px)' }}>
      <Stack spacing={2} mb={2} sx={{ paddingRight: '10px', paddingTop: '10px' }}>
        <Typography variant="h6" gutterBottom>
          My Assessments
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ flexDirection: isSmallScreen ? 'row' : 'row' }}>
          <StyledInputBase
            sx={{
              height: '40px',
              borderRadius: '3px',
              width: isSmallScreen ? '100%' : '300px',
              borderColor: theme.palette.action.selected,
              borderWidth: '1px',
              borderStyle: 'solid',
              backgroundColor: 'transparent',
              color: theme.palette.primary,
              flex: 1,
            }}
            placeholder="Search Assessments"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            endAdornment={<SearchIcon sx={{ color: theme.palette.primary }} />}
          />
          <Button
            variant="contained"
            sx={{
              height: '40px',
              borderRadius: '3px',
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              },
              width: isSmallScreen ? 'auto' : 'auto',
              minWidth: isSmallScreen ? '150px' : 'auto',
            }}
            component={RouterLink}
            to="/create-assessment"
          >
            {isSmallScreen ? "+ Assessment" : "Create New Assessment"}
          </Button>
        </Stack>
      </Stack>
      <Stack sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <CustomTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell>{assessment.title}</TableCell>
                  <TableCell>
                    {statusIcon(assessment.status)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      sx={{
                        color: theme.palette.action.selected,
                        marginRight: '10px',
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary">
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CustomTableContainer>
      </Stack>
    </StyledCard>
  );
};

export default AssessmentList;
