import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { loadCurrentUser, saveCurrentUser, loadUsers } from '../utils/storage';
import { initializeData } from '../utils/data';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
  isCEO: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initializeData();
    const currentUser = loadCurrentUser();
    setUser(currentUser);
    setMounted(true);
  }, []);

  // התחברות משתמש - בודק שם משתמש וסיסמה
  const login = async (username: string, password: string): Promise<boolean> => {
    const users = loadUsers();
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      saveCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  // התנתקות משתמש
  const logout = () => {
    setUser(null);
    saveCurrentUser(null);
  };

  const isBusiness = user?.role === 'business';
  const isAdmin = user?.role === 'admin';
  const isCEO = isBusiness && user?.username === 'נתנאל';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isBusiness,
        isAdmin,
        isCEO,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};