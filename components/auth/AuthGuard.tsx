'use client';

import React from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <div className="transition-all duration-300 min-h-screen">
      {children}
    </div>
  );
}
