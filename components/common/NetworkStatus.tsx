'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, Radio, CheckCircle2 } from 'lucide-react';

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [showRestoredNotice, setShowRestoredNotice] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
    setIsOnline(navigator.onLine);

    let restoredTimeout: NodeJS.Timeout;

    const handleOnline = () => {
      setIsOnline(true);
      setShowRestoredNotice(true);
      restoredTimeout = setTimeout(() => {
        setShowRestoredNotice(false);
      }, 3500);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestoredNotice(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (restoredTimeout) clearTimeout(restoredTimeout);
    };
  }, []);

  if (!hasMounted) return null;

  // Render offline alert toast
  if (!isOnline) {
    return (
      <div
        role="status"
        aria-live="assertive"
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full sm:w-auto transition-all animate-bounce-subtle"
      >
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-slate-950/95 border border-amber-500/40 text-white shadow-2xl shadow-black/80 backdrop-blur-xl">
          <div className="relative flex items-center justify-center shrink-0">
            <span className="absolute w-4 h-4 rounded-full bg-amber-400 opacity-75 animate-ping"></span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <WifiOff className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-0.5 pr-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>RADAR TELEMETRY OFFLINE</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Connection lost. Reconnecting to Mumbai Airport radar...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render briefly restored signal toast
  if (showRestoredNotice) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full sm:w-auto transition-all animate-fadeIn"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-950/95 border border-emerald-500/40 text-white shadow-2xl shadow-black/80 backdrop-blur-xl">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="pr-2">
            <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              SIGNAL RESTORED
            </span>
            <p className="text-xs text-slate-300 font-medium">
              Reconnected to CSMIA flight radar.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
