import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Import CSS
import '../../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleProfile = () => {
    navigate('/admin-dashboard/profile');
    handleClose();
  };

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className="header-title">
          <RouterLink to="/" className="header-link">
            Safe Software and Integrated Solutions Pvt. Ltd.
          </RouterLink>
        </Typography>
        
        <Button color="primary" variant="text" component={RouterLink} to="/#about">About</Button>
        <Button color="primary" variant="text" component={RouterLink} to="/#services">Services</Button>
        <Button color="primary" variant="text" component={RouterLink} to="/#careers">Careers</Button>
        <Button color="primary" variant="text" component={RouterLink} to="/#contact">Contact</Button>
        
        {isAuthenticated ? (
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar className="user-avatar">
                {user?.name?.charAt(0) || 'A'}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button color="primary" variant="contained" component={RouterLink} to="/#upload">Upload Resume</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;