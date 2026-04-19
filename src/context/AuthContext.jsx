import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkSession, logout as logoutAPI } from '@/services/user/authService';
import { getProfile } from '@/services/user/apiUser';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    logoutAPI();
    setUser(null);
    setIsAuthenticated(false);
  };

  const checkUserSession = async () => {
    setIsLoading(true);
    try {
      const isValid = await checkSession();
      if (isValid) {
        const profile = await getProfile();
        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            role: profile.role || 'user',
          });
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error checking session:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setUser: login, // For backward compatibility with some store usage
    isUserAdmin: user?.role === 'admin',
    isUserClient: user?.role === 'user',
    checkUserSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
