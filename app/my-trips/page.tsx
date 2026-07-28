'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Bookmark,
  MapPin,
  FileText,
  Plus,
  ArrowRight,
} from 'lucide-react';

export default function MyTripsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'drafts' | 'past'>('upcoming');

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white pt-24 pb-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <nav className="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">Dashboard</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            My Trips <span className="text-[#0284C7]">& Bookings</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Track upcoming stopovers, retrieve receipts, and manage saved itinerary drafts.
          </p>
        </div>
      </section>

      {/* MAIN TRIPS CONTENT */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Tab Controls */}
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'upcoming' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              📅 Upcoming Stopovers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('drafts')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'drafts' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              💾 Saved Drafts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('past')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'past' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              ⏳ Past Stopovers
            </button>
          </div>

          {/* UPCOMING TRIPS TAB */}
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm max-w-2xl mx-auto space-y-4">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-2xl mx-auto">
                  📅
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">No Upcoming Bookings</h2>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">
                  You don't have any finalized stopovers booked yet. Complete checkout to secure your reservations.
                </p>
                <Link
                  href="/plan-my-layover"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0284C7] hover:bg-[#027ab1] text-white text-xs font-bold rounded-xl transition shadow"
                >
                  Start Planning
                </Link>
              </div>
            </div>
          )}

          {/* DRAFTS TAB */}
          {activeTab === 'drafts' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm max-w-2xl mx-auto space-y-4">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-2xl mx-auto">
                  💾
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">No Saved Drafts</h2>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">
                  Build a timeline and click "Save Draft" in the itinerary workspace to access them here.
                </p>
                <Link
                  href="/my-itinerary"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow"
                >
                  Open Planner
                </Link>
              </div>
            </div>
          )}

          {/* PAST TAB */}
          {activeTab === 'past' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm max-w-2xl mx-auto space-y-4">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-2xl mx-auto">
                  ⏳
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">No Past Trips Found</h2>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">
                  Trips you complete will appear here as past records with download links for invoice summaries.
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
