'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertOctagon, RotateCcw, Home, MessageSquare, ShieldAlert } from 'lucide-react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log unexpected client-side error to telemetry/monitoring
    console.error('[LayoverX Aviation System] Uncaught runtime exception:', error);
  }, [error]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-12 relative overflow-hidden">
      {/* Background Warning Radar Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative z-10 max-w-xl w-full">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-rose-950/30 space-y-6">
          
          {/* Header Warning Ribbon */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              FLIGHT CORRIDOR EXCEPTION
            </div>
            {error.digest && (
              <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-2 py-1 rounded">
                REF #{error.digest.slice(0, 8)}
              </span>
            )}
          </div>

          {/* Core Content */}
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertOctagon className="w-6 h-6" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Temporary <span className="text-amber-400">Transit Turbulence</span>
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              An unexpected system interruption occurred while calculating your layover schedule. Your booking draft, selected transit hotel slots, and itinerary items remain safely preserved in local storage.
            </p>
          </div>

          {/* Non-Destructive Safe State Notice */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Session Data Safe &amp; Untouched</span>
            </div>
            <p className="text-slate-400 leading-normal">
              Clicking "Resume Transit" will reload the current component view without clearing your traveler preferences or shopping bag.
            </p>
            {error.message && (
              <p className="font-mono text-[11px] text-slate-400 truncate pt-1 border-t border-slate-800">
                Reason: {error.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0284C7] hover:bg-[#0369a1] text-white font-bold text-sm shadow-lg shadow-sky-950/50 transition-all active:scale-[0.98] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-white" />
              <span>Resume Transit (Retry)</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all active:scale-[0.98]"
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>CSMIA Hub</span>
            </Link>
          </div>

          {/* Airport Support Footer */}
          <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800/80 flex items-center justify-between">
            <span>Mumbai CSMIA 24/7 Dispatch Desk</span>
            <a
              href="https://wa.me/919876543210?text=Hi%20LayoverX%20Support,%20I%20hit%20a%20technical%20issue%20during%20my%20layover%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
