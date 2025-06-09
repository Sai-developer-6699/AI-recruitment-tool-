import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import CandidatesPage from '../pages/admin/CandidatesPage';
import AdministratorsPage from '../pages/admin/AdministratorsPage';
import UserCreationPage from '../pages/admin/UserCreationPage';
import LandingPage from '../pages/LandingPage';
import { useAuth } from '../context/AuthContext';

// Placeholder components
const ProfilePage = () => <div>Profile Page</div>;
const Unauthorized = () => <div>Unauthorized Access</div>;

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin-dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/admin-dashboard" replace />
          ) : (
            <Register />
          )
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Dashboard Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="candidates" element={<CandidatesPage />} />
        <Route path="administrators" element={<AdministratorsPage />} />
        <Route path="user-creation" element={<UserCreationPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;