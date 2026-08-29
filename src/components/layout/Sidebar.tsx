import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  TrendingUp,
  CalendarCheck,
  FileText,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export type NavItem =
  | 'Dashboard'
  | 'Leads'
  | 'Contacts'
  | 'Customers'
  | 'Deals'
  | 'Activities'
  | 'Quotations'
  | 'Campaigns'
  | 'Analytics'
  | 'Settings';

interface SidebarProps {
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onCloseMobile,
}) => {
  const { logout } = useAuth();

  const navItems: { label: NavItem; icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Leads', icon: <Users className="w-5 h-5" /> },
    { label: 'Contacts', icon: <UserCheck className="w-5 h-5" /> },
    { label: 'Customers', icon: <Building2 className="w-5 h-5" /> },
    { label: 'Deals', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Activities', icon: <CalendarCheck className="w-5 h-5" /> },
    { label: 'Quotations', icon: <FileText className="w-5 h-5" /> },
    { label: 'Campaigns', icon: <Megaphone className="w-5 h-5" /> },
    { label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                S
              </div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                  Sales CRM
                </h1>
                <p className="text-[10px] uppercase font-semibold text-gray-400 dark:text-gray-400 tracking-wider">
                  Pro Platform
                </p>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveTab(item.label);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 font-semibold shadow-xs'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 dark:text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout button */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30 dark:hover:text-rose-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
