import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import StyledCard from '../components/custom_components/styledcard';
import { CheckCircle, Visibility, Edit, HourglassEmpty } from '@mui/icons-material';

const RecentActivities = () => {
  const activities = [
    { id: 1, activity: 'JavaScript Basics assessment', status: 'Completed', timestamp: '2024-08-28 14:32' },
    { id: 2, activity: 'React Advanced assessment', status: 'Viewed Results', timestamp: '2024-08-27 09:15' },
    { id: 3, activity: 'CSS Fundamentals assessment', status: 'Edited', timestamp: '2024-08-26 16:45' },
    { id: 4, activity: 'Assessment Yahweh', status: 'Pending', timestamp: '2024-08-28 10:40' },
  ];

  const statusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle sx={{ color: 'green' }} />;
      case 'Viewed Results':
        return <Visibility sx={{ color: 'gray' }} />;
      case 'Edited':
        return <Edit sx={{ color: 'gray' }} />;
      case 'Pending':
        return <HourglassEmpty sx={{ color: 'orange' }} />;
      default:
        return null;
    }
  };

  return (
    <StyledCard>
      <Typography variant="h6" gutterBottom>
        Recent Activities
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>{statusIcon(activity.status)}</TableCell>
                <TableCell align="right">{activity.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledCard>
  );
};

export default RecentActivities;
