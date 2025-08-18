import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

export interface User {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  googleId?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; message: string }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string }>;
  resendVerification: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users database
const mockUsers: { [key: string]: User & { password: string; resetToken?: string; verificationToken?: string } } = {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and validate
    const token = localStorage.getItem('authToken');
    if (token) {
      validateToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async () => {
    try {
      const response = await apiService.getProfile();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        // Invalid token, clear it
        apiService.setToken(null);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      apiService.setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      const response = await apiService.login({ email, password });
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsLoading(false);
        return { success: true, message: response.message };
      } else {
        setIsLoading(false);
        return { success: false, message: response.message };
      }
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const register = async (username: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      const response = await apiService.register({ username, email, password });
      setIsLoading(false);
      return { success: response.success, message: response.message };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, message: error.message || 'Registration failed' };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      // Redirect to Google OAuth
      window.location.href = apiService.getGoogleAuthUrl();
      return { success: true, message: 'Redirecting to Google...' };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, message: error.message || 'Google login failed' };
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      apiService.setToken(null);
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      const response = await apiService.forgotPassword(email);
      setIsLoading(false);
      return { success: response.success, message: response.message };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, message: error.message || 'Request failed' };
    }
  };

  const resetPassword = async (token: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      const response = await apiService.resetPassword(token, password);
      setIsLoading(false);
      return { success: response.success, message: response.message };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, message: error.message || 'Password reset failed' };
    }
  };

  const verifyEmail = async (token: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      const response = await apiService.verifyEmail(token);
      setIsLoading(false);
      return { success: response.success, message: response.message };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, message: error.message || 'Email verification failed' };
    }
  };

  const resendVerification = async (email: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      const response = await apiService.resendVerification(email);
      setIsLoading(false);
      return { success: response.success, message: response.message };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, message: error.message || 'Request failed' };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    loginWithGoogle,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};