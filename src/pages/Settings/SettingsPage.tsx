import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useCRM } from '../../context/CRMContext';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { User, Moon, Sun, DollarSign, RefreshCw, Shield, Check } from 'lucide-react';
import { DealStage } from '../../types';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme, setThemeMode } = useTheme();
  const { preferences, updatePreferences, resetAllData } = useCRM();

  const [name, setName] = useState(user?.name || 'Alex Morgan');
  const [email, setEmail] = useState(user?.email || 'admin@demo.com');
  const [role, setRole] = useState(user?.role || 'Sales Director');

  const [currency, setCurrency] = useState(preferences.defaultCurrency || '$');
  const [defaultStage, setDefaultStage] = useState<DealStage>(preferences.defaultPipelineStage || 'New');

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      defaultCurrency: currency,
      defaultPipelineStage: defaultStage,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          CRM Settings & Preferences
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Customize your user profile, appearance theme, currency formats, and local mock data.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-semibold flex items-center dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300">
          <Check className="w-4 h-4 mr-2" /> Settings updated successfully!
        </div>
      )}

      {/* 1. Profile Settings Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs p-6">
        <div className="flex items-center space-x-3 pb-4 mb-5 border-b border-gray-100 dark:border-gray-700">
          <div className="p-2 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              User Profile
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your active sales user credentials
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Appearance Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs p-6">
        <div className="flex items-center space-x-3 pb-4 mb-5 border-b border-gray-100 dark:border-gray-700">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Appearance Theme
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Choose between light and dark modes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm">
          <button
            type="button"
            onClick={() => setThemeMode('light')}
            className={`p-4 rounded-xl border flex items-center justify-center space-x-3 transition-all ${
              theme === 'light'
                ? 'border-brand-600 bg-brand-50/50 text-brand-700 font-semibold ring-2 ring-brand-500'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Sun className="w-5 h-5 text-amber-500" />
            <span className="text-sm">Light Mode</span>
          </button>

          <button
            type="button"
            onClick={() => setThemeMode('dark')}
            className={`p-4 rounded-xl border flex items-center justify-center space-x-3 transition-all ${
              theme === 'dark'
                ? 'border-brand-500 bg-brand-900/30 text-brand-300 font-semibold ring-2 ring-brand-500'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Moon className="w-5 h-5 text-indigo-400" />
            <span className="text-sm">Dark Mode</span>
          </button>
        </div>
      </div>

      {/* 3. CRM Preferences Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs p-6">
        <div className="flex items-center space-x-3 pb-4 mb-5 border-b border-gray-100 dark:border-gray-700">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              CRM System Preferences
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Pipeline default stage & currency formatting
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Currency Symbol
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Pipeline Creation Stage
              </label>
              <select
                value={defaultStage}
                onChange={(e) => setDefaultStage(e.target.value as DealStage)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="New">New</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 transition-colors shadow-sm"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>

      {/* 4. Local Data Management Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-rose-100 dark:border-rose-900/40 shadow-xs p-6">
        <div className="flex items-center space-x-3 pb-4 mb-5 border-b border-gray-100 dark:border-gray-700">
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Data Management & Reset
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Restore pre-populated mock dataset to default state
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Resetting will erase custom edits and restore the initial sample dataset across all 10 CRM modules.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800 transition-colors whitespace-nowrap"
          >
            Reset Mock Data
          </button>
        </div>
      </div>

      {/* Reset confirmation modal */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetAllData}
        title="Reset All CRM Mock Data"
        message="Are you sure you want to reset all CRM data back to initial sample records? This will clear local storage modifications."
        confirmText="Reset All Data"
      />
    </div>
  );
};
