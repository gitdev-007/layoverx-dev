'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup' | 'reset-password' | string) => void;
  closeAuthModal: () => void;
  setAuthModalOpen: (open: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  requireAuth: (actionCallback: () => void) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const pendingActionRef = React.useRef<(() => void) | null>(null);
  useEffect(() => {
    pendingActionRef.current = pendingAction;
  }, [pendingAction]);

  const supabase = createClient();

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (!session?.user) {
          setIsAuthModalOpen(true);
        }
      } catch (err) {
        console.warn('[AuthContext] Failed to retrieve session:', err);
        setIsAuthModalOpen(true);
      } finally {
        setLoading(false);
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
        if (currentSession?.user) {
          setIsAuthModalOpen(false);
          if (pendingActionRef.current) {
            try {
              pendingActionRef.current();
            } catch (e) {
              console.error('[AuthContext] Error running pending action:', e);
            }
            setPendingAction(null);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (_mode?: string) => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const signInWithGoogle = async () => {
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });
    if (error) {
      console.error('[Google OAuth Error]', error.message);
      throw error;
    }
  };

  const requireAuth = (actionCallback: () => void) => {
    if (user) {
      actionCallback();
    } else {
      setPendingAction(() => actionCallback);
      setIsAuthModalOpen(true);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAuthModalOpen(true);
    } catch (err) {
      console.error('[AuthContext] Error signing out:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        setAuthModalOpen: setIsAuthModalOpen,
        signInWithGoogle,
        requireAuth,
        signOut,
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
