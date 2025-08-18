import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { Lock } from 'lucide-react';

interface ResetPasswordPageProps {
  onNavigate: (page: string) => void;
  resetToken?: string;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate, resetToken = 'demo-token' }) => {
  const { resetPassword, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (!validateForm()) return;

    try {
      const result = await resetPassword(resetToken, formData.password);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setFormData({ password: '', confirmPassword: '' });
        // Redirect to login after a delay
        setTimeout(() => onNavigate('login'), 2000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password below"
    >
      {message && (
        <Alert type={message.type} message={message.text} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-gray-600 text-sm">
            Choose a strong password to secure your account
          </p>
        </div>

        <Input
          label="New Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter new password"
          isPassword
        />

        <Input
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm new password"
          isPassword
        />

        <Button type="submit" isLoading={isLoading}>
          Reset Password
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Remember your password?{' '}
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

export default ResetPasswordPage;