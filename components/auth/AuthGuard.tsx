'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import AuthModal from './AuthModal';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Verifying LayoverX Security Credentials...
        </p>
      </div>
    );
  }

  const isLocked = !user;

  return (
    <>
      <div className={isLocked ? "blur-md select-none pointer-events-none transition-all duration-300 min-h-screen" : "transition-all duration-300 min-h-screen"}>
        {children}
      </div>
      <AuthModal />
    </>
  );
}
