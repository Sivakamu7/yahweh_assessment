import {React} from 'react';

import { Grid, Typography } from '@mui/material';

import AssessmentList from '../components/assessment_list';
import AssessmentAnalytics from '../components/assessment_analytics';
import RecentActivities from '../components/recent_activities';

const Dashboard = () => {
  
  return (
    <div>
      <Grid container alignItems="center" spacing={2} justifyContent="space-between">
        <Grid item>
          <Typography variant="h4">
            Assessment Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <AssessmentList />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <RecentActivities />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <AssessmentAnalytics />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
