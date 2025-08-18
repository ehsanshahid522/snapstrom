import React from 'react';
import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';
import { XCircle } from 'lucide-react';

interface GoogleAuthErrorProps {
  onNavigate: (page: string) => void;
}

const GoogleAuthError: React.FC<GoogleAuthErrorProps> = ({ onNavigate }) => {
  return (
    <AuthLayout
      title="Authentication Failed"
      subtitle="There was an issue with Google authentication"
    >
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-gray-600 mb-6">
          We couldn't complete your Google sign-in. This might be due to:
        </p>
        <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
          <li>• You cancelled the authentication process</li>
          <li>• There was a temporary issue with Google's servers</li>
          <li>• Your account doesn't have the required permissions</li>
        </ul>
        <Button onClick={() => onNavigate('login')}>
          Back to Sign In
        </Button>
      </div>
    </AuthLayout>
  );
};

export default GoogleAuthError;