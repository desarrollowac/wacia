import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { loginUser, registerUser, logoutUser, fetchUser } from '../api/authApi';
import { updateProfile as updateUserProfile } from '../api/userApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      toast.success('¡Bienvenido de vuelta!');
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      toast.error(message);
      throw error;
    }
  };

  const register = async (name, email, password, passwordConfirmation) => {
    try {
      await registerUser({ name, email, password, password_confirmation: passwordConfirmation });
      await login(email, password); // Log in directly after registration
      toast.success('¡Cuenta creada exitosamente!');
    } catch (error) {
      const message = error.response?.data?.message || 'Error al crear la cuenta';
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
      toast.success('¡Hasta pronto!');
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const data = await updateUserProfile(profileData);
      setUser(data.user);
      toast.success('Perfil actualizado exitosamente');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error al actualizar perfil';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
