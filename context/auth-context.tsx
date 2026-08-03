'use client';

import React, { useState } from 'react';
import { useAuth as useSupabaseAuth, AuthProvider as SupabaseAuthProvider } from '@/lib/auth-context';

export type AuthMode = 'login' | 'signup' | 'reset-password';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
}

export function useAuth() {
  const {
    user,
    session,
    loading,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    setAuthModalOpen,
    signInWithGoogle,
    requireAuth,
    signOut,
  } = useSupabaseAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const emailStr = user?.email || '';
  const emailUsername = emailStr.includes('@') ? emailStr.split('@')[0] : (emailStr || 'Traveler');
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || undefined;

  const userProfile: UserProfile | null = user
    ? {
        id: user.id,
        email: user.email || '',
        name: emailUsername,
        avatarUrl,
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
    isAuthModalOpen,
    authModalOpen: isAuthModalOpen,
    authModalMode: 'login' as AuthMode,
    openAuthModal,
    closeAuthModal,
    setAuthModalOpen,
    signInWithGoogle,
    requireAuth,
    signIn: openAuthModal,
    signOut,
  };
}
