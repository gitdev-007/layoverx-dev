'use client';

import React, { useState } from 'react';
import { useAuth, AuthMode } from '@/context/auth-context';
import { X, Mail, Lock, User, Plane, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthModal: React.FC = () => {
  const { authModalOpen, authModalMode, closeAuthModal, openAuthModal, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'reset-password') {
      setSuccessMsg('Password reset instructions sent to your email!');
      setTimeout(() => {
        setSuccessMsg('');
        closeAuthModal();
      }, 2000);
      return;
    }

    signIn(email || 'traveler@layoverx.com', name || 'Traveler');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Top Header Banner */}
          <div className="bg-slate-900 px-6 py-6 text-white relative">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                <Plane size={16} />
              </div>
              <span className="font-extrabold tracking-tight text-white text-lg">LayoverX Pass</span>
            </div>
            <h2 className="text-xl font-bold">
              {authModalMode === 'login' && 'Welcome Back, Traveler'}
              {authModalMode === 'signup' && 'Create Your LayoverX Account'}
              {authModalMode === 'reset-password' && 'Reset Account Password'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Access your verified Mumbai CSMIA stopover vouchers & itinerary.
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6">
            {successMsg ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold text-center">
                ✓ {successMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {authModalMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-slate-400" size={16} />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="traveler@layoverx.com"
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {authModalMode !== 'reset-password' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold uppercase text-slate-600">Password</label>
                      {authModalMode === 'login' && (
                        <button
                          type="button"
                          onClick={() => openAuthModal('reset-password')}
                          className="text-xs font-bold text-sky-600 hover:underline"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-sky-600/20"
                >
                  {authModalMode === 'login' && 'Sign In to Account'}
                  {authModalMode === 'signup' && 'Create Account'}
                  {authModalMode === 'reset-password' && 'Send Reset Link'}
                </button>
              </form>
            )}

            {/* Toggle Modes */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              {authModalMode === 'login' && (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="font-bold text-sky-600 hover:underline"
                  >
                    Sign Up Free
                  </button>
                </p>
              )}
              {authModalMode === 'signup' && (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => openAuthModal('login')}
                    className="font-bold text-sky-600 hover:underline"
                  >
                    Log In
                  </button>
                </p>
              )}
              {authModalMode === 'reset-password' && (
                <p>
                  Remembered your password?{' '}
                  <button
                    onClick={() => openAuthModal('login')}
                    className="font-bold text-sky-600 hover:underline"
                  >
                    Back to Log In
                  </button>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
