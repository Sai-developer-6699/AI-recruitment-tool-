import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update this with your backend URL

const UserService = {
  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // User not found
        return null;
      }
      throw error.response?.data || { message: 'An error occurred while fetching user' };
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred while creating user' };
    }
  },

  // Update existing user
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred while updating user' };
    }
  },
};

export default UserService;