'use client';

import React, { useState } from 'react';
import { useAuth as useSupabaseAuth, AuthProvider as SupabaseAuthProvider } from '@/lib/auth-context';

export type AuthMode = 'login' | 'signup' | 'reset-password';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
}

export function useAuth() {
  const { user, session, loading, isAuthModalOpen, openAuthModal, closeAuthModal, setAuthModalOpen, signOut } = useSupabaseAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Traveler';

  const userProfile: UserProfile | null = user
    ? {
        id: user.id,
        email: user.email || '',
        name: fullName,
        role: isAdmin ? 'admin' : 'user',
      }
    : null;

  return {
    user: userProfile,
    rawUser: user,
    session,
    loading,
    isAdmin,
    setIsAdmin,
    authModalOpen: isAuthModalOpen,
    authModalMode: 'login' as AuthMode,
    openAuthModal,
    closeAuthModal,
    setAuthModalOpen,
    signIn: openAuthModal,
    signOut,
  };
}
