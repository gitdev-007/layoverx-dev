'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import AuthModal from './AuthModal';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthModalOpen } = useAuth();

  // Blur screen ONLY when auth modal is actively open
  const isBlur = !user && isAuthModalOpen;

  return (
    <>
      <div className={isBlur ? "blur-md pointer-events-none select-none transition-all duration-300 min-h-screen" : "transition-all duration-300 min-h-screen"}>
        {children}
      </div>
      <AuthModal />
    </>
  );
}
