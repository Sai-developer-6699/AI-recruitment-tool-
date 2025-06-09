import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize auth token interceptor
import authService from './services/authService';
const token = localStorage.getItem('token');
if (token) {
  authService.setupAxiosInterceptors(token);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
