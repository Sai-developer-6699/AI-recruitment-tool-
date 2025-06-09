import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  Alert,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import Header from '../components/layout/Header';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import WorkIcon from '@mui/icons-material/Work';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

// Import CSS
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        // For demo purposes, hardcoded admin login
        if (values.email === 'admin' && values.password === 'admin') {
          // Create a mock token with admin role
          const mockToken = 'mock-jwt-token-for-admin';
          
          // Use the login function from AuthContext
          login(mockToken);
          
          // Navigate to admin dashboard
          navigate('/admin-dashboard');
        } else {
          setError('Invalid username or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        setError('An error occurred during login');
      }
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Header />

      {/* Main content */}
      <Container maxWidth="lg" className="main-container">
        <Grid container spacing={4}>
          {/* Left side - Company info */}
          <Grid item xs={12} md={7}>
            <Box className="company-info-container">
              <Box className="company-info-overlay" />
              <Box className="company-info-content">
                <Typography variant="h2" component="h1" gutterBottom>
                  Join Our Team
                </Typography>
                <Typography variant="h5" paragraph>
                  Safe Software and Integrated Solutions Pvt. Ltd. is a leading provider of innovative software solutions. We are always looking for talented individuals to join our team. Upload your resume to be considered for current and future opportunities.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  color="primary"
                  id="upload"
                  className="upload-button"
                >
                  Upload Resume
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right side - Login form */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              className="login-paper"
            >
              <Typography component="h1" variant="h5" className="login-title">
                AI Recruitment Tool
              </Typography>
              <Typography component="h2" variant="h6" className="login-subtitle">
                Sign in
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                  {error}
                </Alert>
              )}
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                className="login-form"
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="login-button"
                >
                  Sign In
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Why Join Us Section */}
        <Box className="why-join-section" id="about">
          <Typography variant="h3" component="h2" gutterBottom>
            Why Join Us?
          </Typography>
          <Typography variant="body1" paragraph>
            At Safe Software and Integrated Solutions Pvt. Ltd., we foster a collaborative and innovative environment where employees can thrive and make a real impact.
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card className="feature-card">
                <CardContent>
                  <BusinessCenterIcon color="primary" className="feature-icon" />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Career Growth
                  </Typography>
                  <Typography variant="body2">
                    We offer ample opportunities for professional development and career advancement.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card">
                <CardContent>
                  <Diversity3Icon color="primary" className="feature-icon" />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Inclusive Culture
                  </Typography>
                  <Typography variant="body2">
                    We embrace diversity and create a supportive workplace for everyone.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card">
                <CardContent>
                  <WorkIcon color="primary" className="feature-icon" />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Impactful Work
                  </Typography>
                  <Typography variant="body2">
                    Your work will contribute to meaningful projects that shape the future of technology.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" className="footer">
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Privacy Policy
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Terms of Service
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Contact Us
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Follow Us
              </Typography>
              <Box>
                <IconButton aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box className="footer-copyright">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Safe Software and Integrated Solutions Pvt. Ltd. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;