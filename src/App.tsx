import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import DashboardPage from './pages/DashboardPage';
import GoogleAuthSuccess from './pages/GoogleAuthSuccess';
import GoogleAuthError from './pages/GoogleAuthError';

type PageType = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'verify-email' | 'dashboard' | 'google-success' | 'google-error';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('login');

  // Handle URL-based routing for OAuth callbacks
  React.useEffect(() => {
    const path = window.location.pathname;
    const search = window.location.search;
    
    if (path === '/auth/success') {
      setCurrentPage('google-success');
    } else if (path === '/auth/error') {
      setCurrentPage('google-error');
    } else if (search.includes('token=')) {
      // Handle verification or reset tokens
      const urlParams = new URLSearchParams(search);
      const token = urlParams.get('token');
      const type = urlParams.get('type');
      
      if (type === 'verify') {
        setCurrentPage('verify-email');
      } else if (type === 'reset') {
        setCurrentPage('reset-password');
      }
    }
  }, []);

  // If user is logged in, show dashboard
  if (user) {
    return <DashboardPage />;
  }

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  // Demo tokens for testing the flows
  const demoResetToken = 'demo-reset-token';
  const demoVerificationToken = 'demo-verification-token';

  switch (currentPage) {
    case 'register':
      return <RegisterPage onNavigate={handleNavigate} />;
    case 'forgot-password':
      return <ForgotPasswordPage onNavigate={handleNavigate} />;
    case 'reset-password':
      return <ResetPasswordPage onNavigate={handleNavigate} resetToken={demoResetToken} />;
    case 'verify-email':
      return <VerifyEmailPage onNavigate={handleNavigate} verificationToken={demoVerificationToken} />;
    case 'dashboard':
      return <DashboardPage />;
    case 'google-success':
      return <GoogleAuthSuccess onNavigate={handleNavigate} />;
    case 'google-error':
      return <GoogleAuthError onNavigate={handleNavigate} />;
    default:
      return <LoginPage onNavigate={handleNavigate} />;
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;