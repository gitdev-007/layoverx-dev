'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { supabaseClient } from '@/lib/supabaseClient';
import { Lock, Mail, User as UserIcon, X, Loader2, KeyRound, Eye, EyeOff } from 'lucide-react';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    loginWithGoogle, 
    authModalMessage, 
    setAuthModalMessage 
  } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (isAuthModalOpen && authModalMessage) {
      setMessage(authModalMessage);
      setAuthModalMessage(null);
    }
  }, [isAuthModalOpen, authModalMessage]);

  if (!isAuthModalOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setError(null);
    setMessage(null);
    setShowPassword(false);
  };

  const handleTabSwitch = (newTab: 'signin' | 'signup') => {
    setTab(newTab);
    resetForm();
  };

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err?.message || 'Failed to initiate Google authentication.');
      setGoogleLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Please enter your email address.');
      return;
    }
    if (!validateEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const { error: signInError } = await supabaseClient.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        closeAuthModal();
        resetForm();
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during Sign In.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const cleanUsername = username.trim();
    const cleanEmail = email.trim();

    if (!cleanUsername) {
      setError('Please enter a username.');
      return;
    }
    if (!cleanEmail) {
      setError('Please enter your email address.');
      return;
    }
    if (!validateEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await supabaseClient.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
          data: {
            username: cleanUsername,
            full_name: cleanUsername,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setMessage('Check your email to confirm registration');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during Account Creation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      onClick={closeAuthModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-150 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6 text-slate-800 max-h-[90vh] overflow-y-auto"
      >
        
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 mb-1">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Welcome to LayoverX
          </h2>
          <p className="text-xs text-slate-500">
            CSMIA Mumbai T2 Airport Transit &amp; VIP Layover Pass
          </p>
        </div>

        {/* Auth Tab Buttons */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 text-xs font-bold">
          <button
            type="button"
            onClick={() => handleTabSwitch('signin')}
            className={`flex-1 py-2 rounded-lg transition ${tab === 'signin' ? 'bg-white text-sky-600 shadow-sm border border-slate-250/20' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('signup')}
            className={`flex-1 py-2 rounded-lg transition ${tab === 'signup' ? 'bg-white text-sky-600 shadow-sm border border-slate-250/20' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Register
          </button>
        </div>

        {/* Error / Success Messages */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-rose-700 text-xs text-center font-semibold animate-in fade-in duration-200">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-emerald-700 text-xs text-center font-semibold animate-in fade-in duration-200">
            {message}
          </div>
        )}

        {/* Form Selection */}
        {tab === 'signin' ? (
          /* Sign In Form */
          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-slate-900 placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-slate-900 placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-650 transition"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0369a1] hover:bg-[#0284c7] text-white font-extrabold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleSignUp} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">Username</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-slate-900 placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-slate-900 placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  minLength={6}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-slate-900 placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-655 transition"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0369a1] hover:bg-[#0284c7] text-white font-extrabold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>
          </form>
        )}

        {/* Divider and Google OAuth */}
        <div className="space-y-4 pt-2">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-250 w-full"></div>
            <span className="bg-white px-3 text-[10px] font-extrabold text-slate-455 uppercase tracking-wider absolute">
              OR
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-extrabold rounded-xl shadow-sm transition flex items-center justify-center gap-3 text-xs border border-slate-250"
          >
            {googleLoading ? (
              <>
                <Loader2 className="w-4 h-4 text-slate-600 animate-spin" />
                <span>Redirecting to Google...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
