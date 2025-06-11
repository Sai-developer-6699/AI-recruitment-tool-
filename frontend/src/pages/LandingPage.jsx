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
  Link,
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
        if (values.email === 'admin' && values.password === 'admin') {
          const mockToken = 'mock-jwt-token-for-admin';
          login(mockToken);
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
      <Header />
      <main>
        {/* Hero Section */}
        <Box className="hero-section">
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Box className="hero-content">
                  <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Safe Software
                  </Typography>
                  <Typography variant="h5" component="p" sx={{ mb: 3 }}>
                    Pioneering IT & ELV Solutions Since 2005
                  </Typography>
                  <Typography variant="body1" paragraph>
                    As a leading system integrator in India, we deliver comprehensive, high-quality solutions in Information Technology (IT) and Extra Low Voltage (ELV) systems. Join our team and contribute to our mission of providing innovative, cost-effective solutions for our clients.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper component="aside" elevation={6} className="login-paper">
                  <Typography component="h2" variant="h5" className="login-title">
                    Admin Sign In
                  </Typography>
                  {error && (
                    <Alert severity="error" sx={{ mt: 2, width: '100%' }} role="alert">
                      {error}
                    </Alert>
                  )}
                  <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    className="login-form"
                    noValidate
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Username"
                      name="email"
                      autoComplete="username"
                      autoFocus
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      aria-required="true"
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
                      aria-required="true"
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
          </Container>
        </Box>

        {/* Features Section */}
        <Box component="section" className="why-join-section" id="about">
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" gutterBottom>
              Why Join Us?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
              At Safe Software, we foster a collaborative and innovative environment where employees can thrive and make a real impact.
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Card className="feature-card">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <BusinessCenterIcon className="feature-icon" />
                    <Typography variant="h6" component="h3" gutterBottom>
                      Career Growth
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Engage with diverse projects across IT and ELV systems, from data centers to security, offering vast opportunities for professional development.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className="feature-card">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Diversity3Icon className="feature-icon" />
                    <Typography variant="h6" component="h3" gutterBottom>
                      Inclusive Culture
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We embrace diversity and foster a collaborative, supportive environment where every team member's contribution is valued.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className="feature-card">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <WorkIcon className="feature-icon" />
                    <Typography variant="h6" component="h3" gutterBottom>
                      Impactful Work
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Contribute to a leading solutions provider committed to quality and client success, shaping the technological landscape for businesses across India.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>

      {/* Footer */}
      <Box component="footer" className="footer">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Safe Software & Integrated Solutions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your trusted partner in IT and ELV systems integration.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="h6" gutterBottom>Links</Typography>
              <Link href="#" color="inherit" display="block">Privacy Policy</Link>
              <Link href="#" color="inherit" display="block">Terms of Service</Link>
              <Link href="#" color="inherit" display="block">Contact Us</Link>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="h6" gutterBottom>Contact</Typography>
              <Typography variant="body2" color="text.secondary">
                123 Tech Avenue, Bangalore, India
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: contact@safesoftware.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="h6" gutterBottom>Follow Us</Typography>
              <Box>
                <IconButton aria-label="Twitter" color="inherit"><TwitterIcon /></IconButton>
                <IconButton aria-label="LinkedIn" color="inherit"><LinkedInIcon /></IconButton>
                <IconButton aria-label="Facebook" color="inherit"><FacebookIcon /></IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box className="footer-copyright">
            <Typography variant="body2" color="text.secondary" align="center">
              &copy; {new Date().getFullYear()} Safe Software and Integrated Solutions Pvt. Ltd. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;