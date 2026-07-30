'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, User as UserIcon, X, Loader2, KeyRound } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        closeAuthModal();
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
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        if (data.session) {
          closeAuthModal();
        } else {
          setMessage('Account created! Please check your email for confirmation link or sign in.');
        }
      }
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

        {/* Auth Tab Buttons */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setTab('signin'); setError(null); setMessage(null); }}
            className={`flex-1 py-2 rounded-lg transition ${tab === 'signin' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('signup'); setError(null); setMessage(null); }}
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
                  placeholder="Alex Traveler"
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

        <div className="text-center pt-2 text-[11px] text-slate-500">
          🔒 Secure 256-bit encrypted authentication by Supabase Auth
        </div>
      </div>
    </div>
  );
}
