'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import AuthModal from './AuthModal';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthModalOpen } = useAuth();
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
