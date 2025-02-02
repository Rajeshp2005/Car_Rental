import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../services/api';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setAdmin(null);
        return;
      }

      try {
        const response = await api.get('/admin/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(response.data);
      } catch (error) {
        console.error('Admin verification failed:', error.response?.data?.message);
        if (error.response?.status === 401) {
          logout(); // Auto-logout if unauthorized
        } else {
          setAdmin(null);
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/admin/login', credentials);
      localStorage.setItem('adminToken', response.data.token);
      setAdmin(response.data.admin);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
