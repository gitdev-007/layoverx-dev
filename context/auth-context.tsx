'use client';

import React, { createContext, useContext, useState } from 'react';

export type AuthMode = 'login' | 'signup' | 'reset-password';

export interface UserProfile {
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  authModalOpen: boolean;
  authModalMode: AuthMode;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  signIn: (email?: string, name?: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    email: 'traveler@layoverx.com',
    name: 'Alex Traveler',
    role: 'user',
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>('login');

  const openAuthModal = (mode: AuthMode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const signIn = (email = 'traveler@layoverx.com', name = 'Alex Traveler') => {
    setUser({ email, name, role: isAdmin ? 'admin' : 'user' });
    closeAuthModal();
  };

  const signOut = () => {
    setUser(null);
    closeAuthModal();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        setIsAdmin,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signIn,
        signOut,
      }}
    >
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
