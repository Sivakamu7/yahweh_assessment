import React from 'react';
import { Card, CardContent } from '@mui/material';

const StyledCard = ({ children }) => {
  return (
    <Card
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default StyledCard;
