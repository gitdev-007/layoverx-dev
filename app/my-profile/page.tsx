'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Plane,
  Bookmark,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Save,
  Clock,
  Briefcase,
  Award,
  ExternalLink,
} from 'lucide-react';

export default function MyProfilePage() {
  const [fullName, setFullName] = useState('Traveler');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [nationality, setNationality] = useState('United States');
  const [loungeStyle, setLoungeStyle] = useState('Activity & City Tours');
  const [baggagePref, setBaggagePref] = useState('Use Left-Luggage Airport service');

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* PROFILE HERO */}
      <section className="relative bg-slate-900 text-white pt-24 pb-16 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0284C7] to-sky-600 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg shadow-sky-500/20 uppercase">
              {fullName.charAt(0) || 'U'}
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{fullName}</h1>
              <p className="text-sm text-sky-300 font-semibold flex items-center gap-2 justify-center md:justify-start">
                <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Verified Transit Passenger
              </p>
              <p className="text-xs text-slate-400">traveler@layoverx.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN PROFILE BODY */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Sidebar Navigation */}
            <aside className="md:col-span-1 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Navigation</h2>
                <nav className="flex flex-col gap-1 text-sm font-semibold">
                  <Link href="/my-profile" className="flex items-center gap-2 px-3 py-2.5 bg-sky-50 text-[#0284C7] rounded-xl font-bold transition">
                    👤 Profile Details
                  </Link>
                  <Link href="/my-trips" className="flex items-center gap-2 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition">
                    ✈️ My Trips
                  </Link>
                  <Link href="/saved-itineraries" className="flex items-center gap-2 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition">
                    💾 Saved Plans
                  </Link>
                  <Link href="/account-settings" className="flex items-center gap-2 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition">
                    ⚙️ Settings
                  </Link>
                </nav>
              </div>

              {/* Visa Guide Promo Box */}
              <div className="bg-gradient-to-br from-[#0284C7] to-sky-700 text-white rounded-2xl p-6 shadow-md">
                <h3 className="font-extrabold text-base mb-2">Need a Visa?</h3>
                <p className="text-xs text-sky-100 leading-relaxed mb-4">
                  Transit passengers can get a 24-48 hour tourist visa on arrival at Mumbai. Check eligibility details.
                </p>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-1 text-xs font-bold bg-white text-[#0284C7] px-3.5 py-2 rounded-xl shadow hover:bg-slate-50 transition"
                >
                  Read Visa Guide &rarr;
                </Link>
              </div>
            </aside>

            {/* Center Profile Panel */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">👤 Personal Information</h2>
                
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        type="email"
                        value="traveler@layoverx.com"
                        readOnly
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nationality</label>
                      <input
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <hr className="border-slate-100 my-6" />

                  <h3 className="text-sm font-bold text-slate-900">✈️ Transit Preference Profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Preferred Lounge Style</label>
                      <select
                        value={loungeStyle}
                        onChange={(e) => setLoungeStyle(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Quiet / Sleeping Pod focus">Quiet / Sleeping Pod focus</option>
                        <option value="Activity & City Tours">Activity & City Tours</option>
                        <option value="Fine Dining & Spa Wellness">Fine Dining & Spa Wellness</option>
                        <option value="Gaming & Entertainment">Gaming & Entertainment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Baggage Preference</label>
                      <select
                        value={baggagePref}
                        onChange={(e) => setBaggagePref(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Use Left-Luggage Airport service">Use Left-Luggage Airport service</option>
                        <option value="Carry cabin luggage along">Carry cabin luggage along</option>
                        <option value="Checked-through to final destination">Checked-through to final destination</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
