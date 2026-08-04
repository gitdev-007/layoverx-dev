'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabaseClient } from '@/lib/supabaseClient';

export type AuthMode = 'login' | 'signup' | 'reset-password';

export interface LayoverUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  usernamePrefix: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: LayoverUser | null;
  rawUser: User | null;
  session: Session | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  apiFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [rawUser, setRawUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Get initial session
    async function getInitialSession() {
      try {
        if (typeof window !== 'undefined') {
          const searchParams = new URLSearchParams(window.location.search);
          const code = searchParams.get('code');
          if (code) {
            // Remove code parameter immediately to prevent duplicate exchanges
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('code');
            window.history.replaceState({}, '', newUrl.toString());

            const { data, error } = await supabaseClient.auth.exchangeCodeForSession(code);
            if (!error && data.session) {
              setSession(data.session);
              setRawUser(data.session.user);
              window.history.replaceState({}, document.title, window.location.pathname);
              setLoading(false);
              return;
            }
          }
        }
        const { data: { session: initialSession } } = await supabaseClient.auth.getSession();
        setSession(initialSession);
        setRawUser(initialSession?.user || null);

        // Error URL sanitization: If session is valid, clear error parameters
        if (initialSession?.user && typeof window !== 'undefined') {
          if (
            window.location.search.includes('error=') ||
            window.location.search.includes('otp_expired')
          ) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        }
      } catch (err) {
        console.error('[AuthContext] Error getting session:', err);
      } finally {
        setLoading(false);
      }
    }
    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setRawUser(currentSession?.user || null);

      if (currentSession?.user && typeof window !== 'undefined') {
        // Clean up error/code/token parameters from browser URL bar after successful auth
        if (
          window.location.search.includes('code=') || 
          window.location.hash.includes('access_token=') || 
          window.location.search.includes('error=') ||
          window.location.search.includes('otp_expired')
        ) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
        queryParams: {
          prompt: 'consent select_account',
          access_type: 'offline',
        },
      },
    });
    if (error) throw error;
  };

  // Alias for backward compatibility
  const signInWithGoogle = loginWithGoogle;

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) throw error;
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    const { error } = await supabaseClient.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });
    if (error) throw error;
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
    setRawUser(null);
    setSession(null);
  };

  const apiFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const token = session?.access_token;
    const headers = {
      ...init?.headers,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
    return fetch(input, { ...init, headers });
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Derived user details
  const displayName = rawUser?.user_metadata?.full_name 
    || rawUser?.user_metadata?.name 
    || rawUser?.email?.split('@')[0] 
    || 'Traveler';

  const avatarUrl = rawUser?.user_metadata?.avatar_url 
    || rawUser?.user_metadata?.picture 
    || '';

  const usernamePrefix = rawUser?.user_metadata?.preferred_username 
    || rawUser?.email?.split('@')[0] 
    || 'traveler';

  const isAdmin = rawUser ? (rawUser.app_metadata?.role === 'admin' || rawUser.user_metadata?.role === 'admin' || rawUser.email === 'founder@layoverx.in') : false;

  const user: LayoverUser | null = rawUser
    ? {
        id: rawUser.id,
        email: rawUser.email || '',
        name: displayName,
        avatarUrl,
        usernamePrefix,
        role: isAdmin ? 'admin' : 'user',
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        rawUser,
        session,
        loading,
        loginWithGoogle,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        apiFetch,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
