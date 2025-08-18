import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { CheckCircle, Loader2 } from 'lucide-react';

interface GoogleAuthSuccessProps {
  onNavigate: (page: string) => void;
}

const GoogleAuthSuccess: React.FC<GoogleAuthSuccessProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      // Store token and reload to trigger auth context update
      localStorage.setItem('authToken', token);
      window.location.reload();
    } else {
      // No token, redirect to login
      setTimeout(() => onNavigate('login'), 2000);
    }
  }, [onNavigate]);

  if (user) {
    return (
      <AuthLayout
        title="Welcome!"
        subtitle="Google authentication successful"
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-gray-600 mb-4">
            You have successfully signed in with Google.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to your dashboard...
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Authenticating..."
      subtitle="Please wait while we complete your Google sign-in"
    >
      <div className="text-center py-8">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
        <p className="text-gray-600">Processing your authentication...</p>
      </div>
    </AuthLayout>
  );
};

export default GoogleAuthSuccess;