import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { CheckCircle, Mail } from 'lucide-react';

interface VerifyEmailPageProps {
  onNavigate: (page: string) => void;
  verificationToken?: string;
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ onNavigate, verificationToken }) => {
  const { verifyEmail, resendVerification, isLoading } = useAuth();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (verificationToken) {
      handleVerifyEmail();
    }
  }, [verificationToken]);

  const handleVerifyEmail = async () => {
    if (!verificationToken) return;
    
    setMessage(null);
    try {
      const result = await verifyEmail(verificationToken);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setIsVerified(true);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }
    
    setMessage(null);
    try {
      const result = await resendVerification(email);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    }
  };

  if (verificationToken && !message) {
    return (
      <AuthLayout
        title="Verifying Email"
        subtitle="Please wait while we verify your email address"
      >
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={isVerified ? "Email Verified!" : "Email Verification"}
      subtitle={isVerified ? "Your email has been successfully verified" : "Verify your email to complete registration"}
    >
      {message && (
        <Alert type={message.type} message={message.text} />
      )}

      <div className="text-center">
        {isVerified ? (
          <div className="py-6">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-gray-600 mb-6">
              Your account is now active. You can sign in with your credentials.
            </p>
            <Button onClick={() => onNavigate('login')}>
              Continue to Sign In
            </Button>
          </div>
        ) : (
          <div className="py-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-gray-600 mb-6">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>
            
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to resend verification"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <Button
                variant="secondary"
                onClick={handleResendVerification}
                isLoading={isLoading}
              >
                Resend Verification Email
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          <button
            onClick={() => onNavigate('login')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to sign in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;