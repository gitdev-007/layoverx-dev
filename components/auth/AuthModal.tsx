'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, User as UserIcon, X, Loader2, KeyRound } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError(null);
    setMessage(null);
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
      await signInWithGoogle();
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
      await signInWithEmail(cleanEmail, password);
      closeAuthModal();
      resetForm();
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

    const cleanName = fullName.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setError('Please enter your full name.');
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
      await signUpWithEmail(cleanEmail, password, cleanName);
      closeAuthModal();
      resetForm();
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during Account Creation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6 text-white">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-1">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Welcome to LayoverX
          </h2>
          <p className="text-xs text-slate-400">
            CSMIA Mumbai T2 Airport Transit &amp; VIP Layover Pass
          </p>
        </div>

        {/* Prominent Google OAuth Button */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 font-extrabold rounded-2xl shadow-md transition flex items-center justify-center gap-3 text-xs border border-slate-200"
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

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-slate-900 px-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider absolute">
              OR CONTINUE WITH EMAIL
            </span>
          </div>
        </div>

        {/* Auth Tab Buttons */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => handleTabSwitch('signin')}
            className={`flex-1 py-2 rounded-lg transition ${tab === 'signin' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('signup')}
            className={`flex-1 py-2 rounded-lg transition ${tab === 'signup' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Create Account
          </button>
        </div>

        {/* Error / Success Messages */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-emerald-300 text-xs text-center font-medium">
            {message}
          </div>
        )}

        {/* Sign In Form */}
        {tab === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-300 font-semibold">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-sky-400/30 text-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In to LayoverX</span>
              )}
            </button>
          </form>
        ) : (
          /* Create Account Form */
          <form onSubmit={handleSignUp} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-semibold">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-300 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-300 font-semibold">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  minLength={6}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-sky-400/30 text-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create LayoverX Account</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
