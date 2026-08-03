'use client';

import React, { useState } from 'react';
import { useAuth as useSupabaseAuth, AuthProvider as SupabaseAuthProvider } from '@/lib/auth-context';
import { getUserDisplayName, getAvatarUrl } from '@/lib/utils';

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

  // Derive display name and avatar using shared utilities — consistent across the entire app
  const displayName = getUserDisplayName(user);
  const avatarUrl = getAvatarUrl(user);

  const userProfile: UserProfile | null = user
    ? {
        id: user.id,
        email: user.email || '',
        name: displayName,
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
