import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(email, password)) {
      setError('Invalid demo credentials. Please enter valid email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-12 h-12 rounded-xl bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white font-bold text-2xl shadow-md mb-4">
          S
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Sign in to Sales CRM
        </h2>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Clean, Simple & Professional Sales Management Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-xs font-medium dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-400">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-2.5 px-4 text-sm font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 transition-colors shadow-sm"
            >
              <span>Sign In to Demo Workspace</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>

          {/* Predefined Demo Credentials Card */}
          <div className="mt-6 p-4 bg-brand-50/60 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/40 rounded-xl">
            <div className="flex items-center space-x-2 text-brand-700 dark:text-brand-300 mb-1">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-semibold">Demo Credentials</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-mono">
              Email: <span className="font-bold">admin@demo.com</span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-mono">
              Password: <span className="font-bold">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
