'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SupplierDashboardPage() {
  const [activeTab, setActiveTab] = useState<'applications' | 'inventory'>('applications');

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* SUPPLIER DASHBOARD HERO */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-24 pb-12 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            📊 PARTNER DASHBOARD
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Your Supplier Hub & <br />
            <span className="bg-gradient-to-r from-indigo-400 to-sky-300 bg-clip-text text-transparent">
              Application Status
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Track your onboarding applications, list metadata configurations, and update operational credentials.
          </p>
        </div>
      </section>

      {/* MAIN DASHBOARD CONTENT */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Active Application Progress Card */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Application Progress</h2>
                <p className="text-xs text-slate-500 mt-0.5">Reference: <strong className="text-slate-700">LHX-SUP-88421</strong></p>
              </div>
              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full">
                Under Review
              </span>
            </div>

            {/* Tracker Timeline */}
            <div className="grid grid-cols-3 gap-4 relative py-4 max-w-xl mx-auto text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow">
                  ✓
                </div>
                <span className="text-xs font-bold text-slate-900">Submitted</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0284C7] text-white font-bold text-xs flex items-center justify-center shadow">
                  2
                </div>
                <span className="text-xs font-bold text-sky-700">Under Review</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center border border-slate-300">
                  3
                </div>
                <span className="text-xs font-medium text-slate-400">Decision</span>
              </div>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs text-indigo-950 space-y-1">
              <strong className="block font-bold">ℹ️ Review Notes:</strong>
              <p className="text-indigo-900 leading-relaxed">
                Application submitted. Verification team is validating GST certificate & airport access permits. Estimated turnaround: 24-48 hours.
              </p>
            </div>
          </div>

          {/* Business Information Card */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">Business Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
              <div>
                <span className="text-slate-400 block text-xs uppercase font-bold">Category</span>
                <strong className="text-slate-900">Airport Hotel / Micro-Stay</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs uppercase font-bold">Business Name</span>
                <strong className="text-slate-900">Niranta Transit Hotel & Lounge T2</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs uppercase font-bold">GST / Registration</span>
                <strong className="text-slate-900">27AAACN9481Q1Z4</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs uppercase font-bold">Primary Location</span>
                <strong className="text-slate-900">CSMIA Terminal 2 Arrivals, Mumbai</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
