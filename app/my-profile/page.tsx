'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { User, Mail, Shield, Phone, Plane, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function MyProfilePage() {
  const { user, openAuthModal } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl text-center max-w-md space-y-4">
          <User className="w-12 h-12 text-sky-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Sign In Required</h2>
          <p className="text-xs text-slate-400">
            Please log in to view your traveler profile and saved stopovers.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-2.5 bg-sky-500 text-white font-bold text-xs rounded-xl"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 space-y-8 p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-sky-400 uppercase">Traveler Account</span>
          <h1 className="text-2xl font-extrabold text-white">My Profile</h1>
        </div>
        <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold px-3 py-1 rounded-full">
          Verified Pass Holder
        </span>
      </div>

      <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-700 pb-6">
          <div className="w-16 h-16 bg-sky-500 text-white rounded-full flex items-center justify-center text-2xl font-extrabold">
            {user.email[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Frequent Flyer Status</span>
            <p className="text-sm font-bold text-white mt-0.5">Mumbai CSMIA Priority Transit</p>
          </div>
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Flight Delay Protection</span>
            <p className="text-sm font-bold text-emerald-400 mt-0.5">Active & Monitored</p>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <Link
            href="/my-itinerary"
            className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl transition"
          >
            View Saved Itinerary
          </Link>
        </div>
      </div>
    </div>
  );
}
