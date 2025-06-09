import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  WorkOutline as JobIcon,
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

// Mock data
const recentCandidates = [
  { id: 1, name: 'John Doe', position: 'Frontend Developer', date: '2023-05-18' },
  { id: 2, name: 'Jane Smith', position: 'Backend Developer', date: '2023-05-17' },
  { id: 3, name: 'Robert Johnson', position: 'UI/UX Designer', date: '2023-05-16' },
];

const upcomingInterviews = [
  { id: 1, candidate: 'Emily Davis', position: 'Full Stack Developer', date: '2023-05-20', time: '10:00 AM' },
  { id: 2, candidate: 'Michael Wilson', position: 'DevOps Engineer', date: '2023-05-21', time: '2:30 PM' },
];

const StatCard = ({ icon, title, value, color }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              backgroundColor: `${color}.light`,
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {React.cloneElement(icon, { sx: { color: `${color}.main` } })}
          </Box>
          <Box>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PeopleIcon />}
            title="Total Candidates"
            value="125"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<JobIcon />}
            title="Open Positions"
            value="8"
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<AssessmentIcon />}
            title="Interviews This Week"
            value="12"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ScheduleIcon />}
            title="Pending Reviews"
            value="5"
            color="error"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Candidates
            </Typography>
            <List>
              {recentCandidates.map((candidate, index) => (
                <React.Fragment key={candidate.id}>
                  <ListItem>
                    <ListItemText
                      primary={candidate.name}
                      secondary={`${candidate.position} • Applied on ${candidate.date}`}
                    />
                  </ListItem>
                  {index < recentCandidates.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Interviews
            </Typography>
            <List>
              {upcomingInterviews.map((interview, index) => (
                <React.Fragment key={interview.id}>
                  <ListItem>
                    <ListItemText
                      primary={interview.candidate}
                      secondary={`${interview.position} • ${interview.date} at ${interview.time}`}
                    />
                  </ListItem>
                  {index < upcomingInterviews.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;