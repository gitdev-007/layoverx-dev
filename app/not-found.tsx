import React from 'react';
import Link from 'next/link';
import { Plane, Compass, RotateCcw, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-12 relative overflow-hidden">
      {/* Background Radar Concourse Circles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-sky-500/30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-sky-400/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-amber-400/20"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Terminal Gate Display Board */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/60 space-y-8">
          
          {/* Top Flight Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-xs font-black tracking-widest text-slate-300 uppercase">
                CSMIA AIR TRAFFIC CONCOURSE
              </span>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> STATUS: UNROUTED FLIGHT
            </span>
          </div>

          {/* Boarding Pass Hero Section */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
              <Plane className="w-3.5 h-3.5 -rotate-45 text-amber-400" />
              FLIGHT PATH 404 • BOM / CSMIA
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Gate <span className="text-amber-400">Not Found</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The concourse terminal or transit route you requested does not exist or has been reassigned to another runway. Don't worry—your layover session and connection timeline remain fully protected.
            </p>
          </div>

          {/* Boarding Pass Info Slate */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 block uppercase text-[10px]">Airport Code</span>
              <strong className="text-slate-200 text-sm">BOM (Mumbai)</strong>
            </div>
            <div>
              <span className="text-slate-400 block uppercase text-[10px]">Terminal Sector</span>
              <strong className="text-slate-200 text-sm">T2 / T1 Transit</strong>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 block uppercase text-[10px]">Transit Safeguard</span>
              <strong className="text-emerald-400 text-sm flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> 100% Active
              </strong>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0284C7] hover:bg-[#0369a1] text-white font-bold text-sm shadow-lg shadow-sky-950/50 transition-all active:scale-[0.98]"
            >
              <Compass className="w-4 h-4" />
              <span>Back to CSMIA Hub</span>
            </Link>

            <Link
              href="/#calculator"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 font-bold text-sm transition-all active:scale-[0.98]"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Recalculate Layover</span>
            </Link>
          </div>

          {/* Terminal Assistance Footer */}
          <div className="pt-2 text-center sm:text-left text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80">
            <span>Mumbai International Airport Concourse Support</span>
            <Link href="/contact" className="text-sky-400 hover:underline inline-flex items-center gap-1">
              <span>Station Desk</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
