'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import AuthModal from './AuthModal';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthModalOpen } = useAuth();
  const showOverlay = !user && isAuthModalOpen;

  return (
    <>
      {/* Isolated dim overlay — does NOT filter child DOM or any iframe descendants */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-[998] pointer-events-none"
          aria-hidden="true"
        />
      )}
      {/* Children always render without any filter — preserves Razorpay iframe rendering */}
      <div className="transition-all duration-300 min-h-screen">
        {children}
      </div>
      <AuthModal />
    </>
  );
}
