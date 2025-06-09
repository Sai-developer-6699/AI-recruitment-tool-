import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage on initial load
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // For the hardcoded admin user
        if (token === 'mock-jwt-token-for-admin') {
          setUser({
            id: 'admin-id',
            email: 'admin',
            name: 'Administrator',
            role: 'admin',
            exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
          });
        } else {
          // For real JWT tokens
          const decoded = jwtDecode(token);
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            setUser(null);
          } else {
            setUser(decoded);
          }
        }
      } catch (error) {
        console.error('Token decode error:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    
    // For the hardcoded admin user
    if (token === 'mock-jwt-token-for-admin') {
      setUser({
        id: 'admin-id',
        email: 'admin',
        name: 'Administrator',
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      });
    } else {
      // For real JWT tokens
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};