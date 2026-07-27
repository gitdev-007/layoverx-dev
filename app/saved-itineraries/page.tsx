import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Plane, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Saved Layover Plans | LayoverX',
  description: 'View your saved stopover templates and itineraries.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/saved-itineraries',
  },
};

export default function SavedItinerariesPage() {
  return (
    <div className="min-h-screen pb-20 space-y-8 p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-sky-400 uppercase">Saved Plans</span>
          <h1 className="text-2xl font-extrabold text-white">Saved Layover Itineraries</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-3xl space-y-3">
          <span className="text-xs font-bold text-sky-400">Template 01</span>
          <h3 className="text-lg font-bold text-white">6-Hour South Mumbai Express Sightseeing</h3>
          <p className="text-xs text-slate-400">Gateway of India + Bandra Sea Link chauffeured tour.</p>
          <Link
            href="/my-itinerary"
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:underline pt-2"
          >
            Load Plan <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
