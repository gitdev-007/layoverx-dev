'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { getUserDisplayName } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup' | 'reset-password' | string) => void;
  closeAuthModal: () => void;
  setAuthModalOpen: (open: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<void>;
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
  const [authError, setAuthError] = useState<string | null>(null);

  // Detect ?auth_error= query param from OAuth callback redirect and show toast
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const err = params.get('auth_error');
    if (err) {
      setAuthError(decodeURIComponent(err));
      // Auto-clear after 7 seconds
      const t = setTimeout(() => setAuthError(null), 7000);
      // Strip ?auth_error= from URL without a page reload
      window.history.replaceState({}, document.title, window.location.pathname);
      return () => clearTimeout(t);
    }
  }, []);

  const pendingActionRef = React.useRef<(() => void) | null>(null);
  useEffect(() => {
    pendingActionRef.current = pendingAction;
  }, [pendingAction]);

  const supabase = createClient();

  const clearAllSessionData = () => {
    setUser(null);
    setSession(null);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('layoverx_local_user');
        localStorage.removeItem('layoverx_itinerary_items');
        localStorage.removeItem('layoverx_saved_plans');
        window.dispatchEvent(new Event('layoverx_logout'));
      } catch (e) {}
    }
  };

  const syncUserProfileToDatabase = async (u: User) => {
    if (!u || !u.id) return;
    const userEmail = u.email || '';
    const fullName = getUserDisplayName(u);
    try {
      await supabase.from('profiles').upsert({
        id: u.id,
        email: userEmail,
        full_name: fullName,
      }, { onConflict: 'id' });
    } catch (e) {
      console.warn('[Sync Profile Warning]', e);
    }
  };

  const handleAuthenticatedUser = (u: User) => {
    setUser(u);
    setIsAuthModalOpen(false);
    try {
      localStorage.setItem('layoverx_local_user', JSON.stringify(u));
    } catch (e) {}
    
    syncUserProfileToDatabase(u);

    if (pendingActionRef.current) {
      try {
        pendingActionRef.current();
      } catch (err) {
        console.error('[AuthContext] Error running pending action:', err);
      }
      setPendingAction(null);
    }
  };

  useEffect(() => {
    async function loadInitialSession() {
      if (typeof window !== 'undefined' && window.location.search.includes('code=')) {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
          try {
            const { data } = await supabase.auth.exchangeCodeForSession(code);
            if (data?.session?.user) {
              setSession(data.session);
              handleAuthenticatedUser(data.session.user);
              setLoading(false);
              return;
            }
          } catch (e) {}
        }
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setSession(session);
          handleAuthenticatedUser(session.user);
        } else {
          // Check local storage fallback
          const savedLocalUser = typeof window !== 'undefined' ? localStorage.getItem('layoverx_local_user') : null;
          if (savedLocalUser) {
            try {
              const parsed = JSON.parse(savedLocalUser);
              if (parsed?.email && !parsed.email.includes('google_user@layoverx.in') && !parsed.email.includes('placeholder')) {
                handleAuthenticatedUser(parsed);
              }
            } catch (e) {}
          }
        }
      } catch (err) {
        console.error('[Initial Session Error]', err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (currentSession?.user) {
          setSession(currentSession);
          handleAuthenticatedUser(currentSession.user);
          setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          clearAllSessionData();
          setLoading(false);
        } else {
          setLoading(false);
        }

        // Clean query parameters code/event cleanly
        if (typeof window !== 'undefined') {
          const search = window.location.search;
          if (search.includes('code=') || search.includes('event=')) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        }
      }
    );

    // Initial check for query parameters to clear cleanly on mount
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search.includes('code=') || search.includes('event=')) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (_mode?: string) => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const getRedirectUrl = () => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return `${window.location.origin}/auth/callback`;
    }
    return process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      : 'https://layoverx.in/auth/callback';
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getRedirectUrl(),
        queryParams: {
          prompt: 'consent select_account',
          access_type: 'offline',
        },
      },
    });
    if (error) {
      const msg = error.message || 'Google sign-in failed. Please try again.';
      console.error('[Google OAuth Error]', msg);
      throw new Error(msg);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
    if (error) {
      // ONLY bypass if environment API key is unconfigured or rejected by host
      if (error.message.toLowerCase().includes('api key') && !error.message.toLowerCase().includes('credentials')) {
        const localUser: User = {
          id: 'usr_' + Date.now(),
          email: cleanEmail,
          user_metadata: { full_name: cleanEmail.split('@')[0] },
          app_metadata: { provider: 'email' },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as unknown as User;
        handleAuthenticatedUser(localUser);
        return;
      }
      throw error;
    }
    if (data?.user) {
      handleAuthenticatedUser(data.user);
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('layoverx_clear_itinerary'));
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: { data: { full_name: cleanName } },
      });
      if (error) {
        if (error.message.toLowerCase().includes('api key') && !error.message.toLowerCase().includes('already registered')) {
          const localUser: User = {
            id: 'usr_' + Date.now(),
            email: cleanEmail,
            user_metadata: { full_name: cleanName || cleanEmail.split('@')[0] },
            app_metadata: { provider: 'email' },
            aud: 'authenticated',
            created_at: new Date().toISOString(),
          } as unknown as User;
          handleAuthenticatedUser(localUser);
          return;
        }
        throw error;
      }
      if (data?.user) {
        handleAuthenticatedUser(data.user);
      }
    } catch (err: any) {
      if (err?.message?.toLowerCase().includes('api key') && !err?.message?.toLowerCase().includes('already registered')) {
        const localUser: User = {
          id: 'usr_' + Date.now(),
          email: cleanEmail,
          user_metadata: { full_name: cleanName || cleanEmail.split('@')[0] },
          app_metadata: { provider: 'email' },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as unknown as User;
        handleAuthenticatedUser(localUser);
      } else {
        throw err;
      }
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
    } catch (err) {}
    clearAllSessionData();
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
        signInWithEmail,
        signUpWithEmail,
        requireAuth,
        signOut,
      }}
    >
      <>
        {children}
        {/* OAuth Error Toast — shown when ?auth_error= is detected on redirect */}
        {authError && (
          <div
            role="alert"
            style={{ position: 'fixed', top: '80px', right: '16px', zIndex: 9999, maxWidth: '380px', width: 'calc(100vw - 32px)' }}
            className="bg-rose-950 border border-rose-500/50 text-rose-100 rounded-2xl shadow-2xl px-5 py-4 flex items-start gap-3 animate-in slide-in-from-top-2 duration-300"
          >
            <span style={{ fontSize: '20px', flexShrink: 0 }}>⚠️</span>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm text-rose-200 mb-0.5">Google Sign-In Failed</p>
              <p className="text-xs text-rose-300 leading-snug break-words">{authError}</p>
            </div>
            <button
              onClick={() => setAuthError(null)}
              className="text-rose-400 hover:text-rose-200 flex-shrink-0 ml-1 mt-0.5 transition"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}
      </>
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
