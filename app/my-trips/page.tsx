import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Plane, Calendar, Hotel, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Trips & Active Stopovers | LayoverX',
  description: 'View active and completed Mumbai airport stopovers.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/my-trips',
  },
};

export default function MyTripsPage() {
  return (
    <div className="min-h-screen pb-20 space-y-8 p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-sky-400 uppercase">Travel History</span>
          <h1 className="text-2xl font-extrabold text-white">My Trips</h1>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-3xl space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-sky-400">July 28, 2026</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
              Confirmed
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">CSMIA Terminal 2 — 8-Hour Layover Stay</h3>
          <p className="text-xs text-slate-400">Niranta Transit Hotel (3h) + Peshawri Express Dining</p>
          <Link href="/my-itinerary" className="inline-block text-xs font-bold text-sky-400 hover:underline pt-2">
            View Live Timeline →
          </Link>
        </div>
      </div>
    </div>
  );
}
