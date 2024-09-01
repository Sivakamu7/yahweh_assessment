import React from 'react';
import { Typography, Divider, Grid } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import StyledCard from '../components/custom_components/styledcard';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const AssessmentAnalytics = () => {
  const analytics = {
    averageScore: 78,
    completionRate: 85,
    totalAssessments: 15,
    assessmentsCompleted: 13,
  };

  // Pie chart data
  const pieData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: 'Assessments',
        data: [analytics.assessmentsCompleted, analytics.totalAssessments - analytics.assessmentsCompleted],
        backgroundColor: ['#f7b446', '#373737'],
        hoverBackgroundColor: ['#f7b446', '#373737'],
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ['Average Score', 'Completion Rate'],
    datasets: [
      {
        label: 'Metrics',
        data: [analytics.averageScore, parseFloat(analytics.completionRate)],
        backgroundColor: '#f7b446',
      },
    ],
  };

  return (
    <StyledCard>
      <Typography variant="h6" gutterBottom>
        Assessment Analytics Overview
      </Typography>
      <Typography variant="body1" paragraph>
        This dashboard provides a quick overview of the performance metrics for each assessment. 
      </Typography>
      <Divider sx={{ margin: '16px 0' }} />
      <Typography variant="subtitle1" gutterBottom>
        Assessment Completion Status
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div style={{ height: '200px' }}>
            <Bar data={barData} options={{ responsive: true }} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div style={{ height: '200px' }}>
            <Pie data={pieData} />
          </div>
        </Grid>
      </Grid>
      <Typography variant="body2" color="textSecondary" paragraph pt={2}>
        The bar chart displays key performance metrics such as the average score and the completion rate for assessments.
      </Typography>
    </StyledCard>
  );
};

export default AssessmentAnalytics;
