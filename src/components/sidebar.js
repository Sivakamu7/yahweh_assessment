import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import CreateIcon from '@mui/icons-material/Create';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useTheme, useMediaQuery } from '@mui/material';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const theme = useTheme();
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const isSmallScreen = useMediaQuery('(max-width:1200px)');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const isActive = (path) => location.pathname === path;

  const listItemStyle = (path) => ({
    backgroundColor: isActive(path) ? theme.palette.action.selected : 'transparent',
    '&:hover': {
      backgroundColor: isActive(path) ? theme.palette.action.selected : isDarkTheme ? theme.palette.secondary.tertiary : theme.palette.primary.tertiary,
    },
  });

  const listIconStyle = (path) => ({
    color: isActive(path) ? theme.palette.primary.main : theme.palette.primary.light,
  });

  const listItemTextStyle = (path) => ({
    color: isActive(path) ? theme.palette.primary.main : theme.palette.primary.light,
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? (isSmallScreen ? 72 : 240) : (isSmallScreen ? 72 : 72),
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? (isSmallScreen ? 72 : 240) : (isSmallScreen ? 72 : 72),
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <Toolbar>
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        {open && !isSmallScreen && (
          <Typography variant="h6" noWrap>
            Sidebar
          </Typography>
        )}
      </Toolbar>
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          selected={isActive('/')}
          sx={listItemStyle('/')}
        >
          <ListItemIcon sx={listIconStyle('/')}>
            <DashboardIcon />
          </ListItemIcon>
          {open && !isSmallScreen && (
            <ListItemText
              primary="Dashboard"
              sx={listItemTextStyle('/')}
            />
          )}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/create-assessment"
          selected={isActive('/create-assessment')}
          sx={listItemStyle('/create-assessment')}
        >
          <ListItemIcon sx={listIconStyle('/create-assessment')}>
            <CreateIcon />
          </ListItemIcon>
          {open && !isSmallScreen && (
            <ListItemText
              primary="Create Assessment"
              sx={listItemTextStyle('/create-assessment')}
            />
          )}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/manage-question-bank"
          selected={isActive('/manage-question-bank')}
          sx={listItemStyle('/manage-question-bank')}
        >
          <ListItemIcon sx={listIconStyle('/manage-question-bank')}>
            <QuestionAnswerIcon />
          </ListItemIcon>
          {open && !isSmallScreen && (
            <ListItemText
              primary="Question Bank"
              sx={listItemTextStyle('/manage-question-bank')}
            />
          )}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
