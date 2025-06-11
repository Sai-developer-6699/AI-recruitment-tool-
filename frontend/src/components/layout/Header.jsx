import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Stack,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate('/admin-dashboard/profile');
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo or Title */}
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/"
          sx={{ color: '#0a66c2', fontWeight: 700, textDecoration: 'none' }}
        >
          AI Recruitment Portal
        </Typography>

        {/* Navigation Links (only when NOT authenticated) */}
        {!isAuthenticated && (
          <Stack direction="row" spacing={2} sx={{ ml: 4 }}>
            <Button component={RouterLink} to="/#about" color="primary">
              About
            </Button>
            <Button component={RouterLink} to="/#services" color="primary">
              Services
            </Button>
            <Button component={RouterLink} to="/#careers" color="primary">
              Careers
            </Button>
            <Button component={RouterLink} to="/#contact" color="primary">
              Contact
            </Button>
          </Stack>
        )}

        {/* User Avatar or Auth Links */}
        {isAuthenticated ? (
          <Box>
            <IconButton onClick={handleMenuOpen} color="primary">
              <Avatar>
                {user?.name?.charAt(0).toUpperCase() || <PersonIcon />}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/register"
            >
              Register
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
