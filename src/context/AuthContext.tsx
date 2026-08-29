import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { initialUser } from '../data/mockData';
import { loadFromStorage, saveToStorage, removeFromStorage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    return loadFromStorage<User | null>('crm_auth_user', initialUser);
  });

  const login = (email: string, pass: string): boolean => {
    // Simple demo validation
    if (email === 'admin@demo.com' && pass === 'admin123') {
      const authUser = initialUser;
      setUser(authUser);
      saveToStorage('crm_auth_user', authUser);
      return true;
    }
    // Allow any demo login input for flexibility
    if (email.trim() && pass.trim()) {
      const demoUser: User = {
        id: 'usr-custom',
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        email: email,
        role: 'Sales Manager',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      };
      setUser(demoUser);
      saveToStorage('crm_auth_user', demoUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    removeFromStorage('crm_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
