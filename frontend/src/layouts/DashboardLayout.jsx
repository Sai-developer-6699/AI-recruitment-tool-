import React, { useState } from 'react';
import { Outlet, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  CssBaseline,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import Header from '../components/layout/Header';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';

// Import CSS
import '../styles/DashboardLayout.css';

const drawerWidth = 240;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin-dashboard',
    },
    {
      text: 'Candidates',
      icon: <PeopleIcon />,
      path: '/admin-dashboard/candidates',
    },
    {
      text: 'Administrators',
      icon: <AdminPanelSettingsIcon />,
      path: '/admin-dashboard/administrators',
    },
    {
      text: 'Create User',
      icon: <PersonAddIcon />,
      path: '/admin-dashboard/user-creation',
    },
    {
      text: 'Profile',
      icon: <PersonIcon />,
      path: '/admin-dashboard/profile',
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={() => isMobile && handleDrawerToggle()}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box className="dashboard-container">
      <CssBaseline />
      
      {/* Use the common Header component */}
      <Header />
      
      {/* Mobile menu toggle */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className="mobile-menu-toggle"
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar */}
      <Box
        component="nav"
        className="nav-container"
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          className="mobile-drawer"
          classes={{
            paper: "drawer-paper"
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          className="desktop-drawer"
          classes={{
            paper: "drawer-paper"
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        className="main-content"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;