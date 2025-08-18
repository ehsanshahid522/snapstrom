import React from 'react';
import { Shield, Lock, Eye, AlertTriangle, Clock, Globe } from 'lucide-react';

const SecurityFeatures: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Password Security',
      description: 'Bcrypt hashing with salt rounds for maximum protection',
      color: 'text-blue-500 bg-blue-50'
    },
    {
      icon: Lock,
      title: 'Account Lockout',
      description: 'Automatic lockout after 5 failed login attempts',
      color: 'text-red-500 bg-red-50'
    },
    {
      icon: Eye,
      title: 'Rate Limiting',
      description: 'Request throttling to prevent brute force attacks',
      color: 'text-yellow-500 bg-yellow-50'
    },
    {
      icon: AlertTriangle,
      title: 'Input Validation',
      description: 'Server-side validation with express-validator',
      color: 'text-orange-500 bg-orange-50'
    },
    {
      icon: Clock,
      title: 'JWT Security',
      description: 'Secure tokens with expiration and proper signing',
      color: 'text-green-500 bg-green-50'
    },
    {
      icon: Globe,
      title: 'CORS & Headers',
      description: 'Proper CORS configuration and security headers',
      color: 'text-purple-500 bg-purple-50'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Security Features</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${feature.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Production Ready</span>
        </div>
        <p className="text-xs text-blue-700">
          This authentication system implements industry-standard security practices including
          password hashing, rate limiting, input validation, and secure session management.
        </p>
      </div>
    </div>
  );
};

export default SecurityFeatures;