'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, Plus, ArrowRight } from 'lucide-react';

export default function SavedItinerariesPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* SAVED PLANS HERO */}
      <section className="relative bg-slate-900 text-white pt-24 pb-16 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Saved Itineraries</h1>
              <p className="text-sm text-sky-200">Manage and reload your saved transit plans</p>
            </div>
            <Link
              href="/plan-my-layover"
              className="px-5 py-3 bg-[#0284C7] hover:bg-[#027ab1] text-white text-xs font-bold rounded-xl shadow-lg transition"
            >
              ＋ Plan New Stopover
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4">
            
            {/* Center Saved Itineraries List */}
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3 shadow-sm">
              <p className="font-bold text-lg text-slate-900">No saved itineraries found</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Configure timings and select custom day rooms, spas, or tours in the planner to save plans.
              </p>
              <Link
                href="/plan-my-layover"
                className="mt-2 inline-block px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow"
              >
                Open AI Planner
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
