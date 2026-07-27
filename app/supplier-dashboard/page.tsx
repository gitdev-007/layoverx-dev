'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { Shield, Building, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SupplierDashboardPage() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl text-center max-w-md space-y-4">
          <Shield className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Admin Privileges Required</h2>
          <p className="text-xs text-slate-400">
            This page is restricted to authorized LayoverX supplier partners and admins. Toggle 'Admin Mode' in the navbar to preview.
          </p>
          <Link href="/" className="inline-block px-4 py-2 bg-sky-500 text-white font-bold text-xs rounded-xl">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 space-y-8 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase">Supplier Portal</span>
          <h1 className="text-2xl font-extrabold text-white">Mumbai CSMIA Partner Dashboard</h1>
        </div>
        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
          Verified Partner Mode
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium">Active Micro-Stay Bookings</p>
          <p className="text-3xl font-extrabold text-white mt-1">142</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium">Monthly Occupancy Rate</p>
          <p className="text-3xl font-extrabold text-sky-400 mt-1">94.8%</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium">AeroAPI Live Flight Syncs</p>
          <p className="text-3xl font-extrabold text-emerald-400 mt-1">100% Active</p>
        </div>
      </div>
    </div>
  );
}
