import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set auth token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  // Load user
  const loadUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me');
      setUser(res.data.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (err) {
      localStorage.removeItem('token');
      setToken(null);
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false, message: err.response?.data?.message || 'Registration failed' };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Logout failed');
      return { success: false, message: 'Logout failed' };
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/dashboard/profile`, userData);
      setUser(res.data.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
      return { success: false, message: err.response?.data?.message || 'Profile update failed' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};