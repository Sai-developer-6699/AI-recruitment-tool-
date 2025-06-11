import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import UserService from '../../services/UserService';

const UserCreationPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [mode, setMode] = useState('create'); // 'create' or 'update'

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    department: Yup.string().required('Department is required'),
    designation: Yup.string().required('Designation is required'),
    phone: Yup.string().required('Phone number is required'),
    userId: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      department: '',
      designation: '',
      phone: '',
      userId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (mode === 'create') {
          // Create new user
          // const userCreate = await UserService.createUser({
          //   name: values.name,
          //   email: values.email,
          //   department: values.department,
          //   designation: values.designation,
          //   phone: values.phone,
          // });
          setNotification({
            open: true,
            message: 'User created successfully!',
            severity: 'success',
          });
          // Reset form after successful creation
          formik.resetForm();
        } else {
          // Update existing user
          const updateUser = await UserService.updateUser(values.userId, {
            name: values.name,
            email: values.email,
            department: values.department,
            designation: values.designation,
            phone: values.phone,
          });
          setNotification({
            open: true,
            message: 'User updated successfully!',
            severity: 'success',
          });
        }
      } catch (error) {
        console.error('Error saving user:', error);
        setNotification({
          open: true,
          message: error.message || 'An error occurred while saving the user',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCheckUser = async () => {
    if (!formik.values.userId) {
      setNotification({
        open: true,
        message: 'Please enter a User ID to check',
        severity: 'warning',
      });
      return;
    }

    setSearchLoading(true);
    try {
      const user = await UserService.getUserById(formik.values.userId);
      if (user) {
        // User exists, autofill form fields
        formik.setValues({
          name: user.name || '',
          email: user.email || '',
          department: user.department || '',
          designation: user.designation || '',
          phone: user.phone || '',
          userId: user.id.toString(),
        });
        setMode('update');
        setNotification({
          open: true,
          message: 'User found! Form has been filled with user details.',
          severity: 'info',
        });
      } else {
        // User does not exist
        setMode('create');
        setNotification({
          open: true,
          message: 'User not found. You can create a new user.',
          severity: 'info',
        });
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setNotification({
        open: true,
        message: error.message || 'An error occurred while checking the user',
        severity: 'error',
      });
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClose = () => {
    formik.resetForm();
    setMode('create');
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        User Creation
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="userId"
                name="userId"
                label="User ID (for search only)"
                value={formik.values.userId}
                onChange={formik.handleChange}
                margin="normal"
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCheckUser}
                disabled={searchLoading}
                sx={{ mt: 1 }}
              >
                {searchLoading ? <CircularProgress size={24} /> : 'Check User Details'}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {mode === 'create' ? 'Create New User' : 'Update Existing User'}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="department"
                name="department"
                label="Department"
                value={formik.values.department}
                onChange={formik.handleChange}
                error={formik.touched.department && Boolean(formik.errors.department)}
                helperText={formik.touched.department && formik.errors.department}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="designation"
                name="designation"
                label="Designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                error={formik.touched.designation && Boolean(formik.errors.designation)}
                helperText={formik.touched.designation && formik.errors.designation}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                  sx={{ mr: 2 }}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserCreationPage;