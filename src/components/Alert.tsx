import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ type, message, className = '' }) => {
  const config = {
    success: {
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    error: {
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      icon: XCircle,
      iconColor: 'text-red-500'
    },
    warning: {
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      icon: AlertCircle,
      iconColor: 'text-yellow-500'
    }
  };

  const { bgColor, textColor, borderColor, icon: Icon, iconColor } = config[type];

  return (
    <div className={`${bgColor} ${textColor} ${borderColor} border rounded-xl p-4 mb-4 flex items-center gap-3 ${className}`}>
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Alert;