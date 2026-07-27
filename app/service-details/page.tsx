import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, ShieldCheck, Clock, Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Niranta Transit Hotel & Lounge | LayoverX CSMIA',
  description:
    'Book hourly micro-stay rooms inside Mumbai CSMIA Terminal 2 with express check-in and rain shower amenities.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/service-details',
  },
};

export default function ServiceDetailsPage() {
  return (
    <div className="min-h-screen pb-20 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 md:p-8 bg-slate-800/80 border border-slate-700/60 rounded-3xl shadow-xl">
              <div className="relative h-72 w-full rounded-2xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                  alt="Niranta Transit Hotel"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-sky-500 text-white font-bold text-xs rounded-full shadow-md">
                  Inside Airport Security (T2)
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-white mb-2">
                Niranta Transit Hotel & Lounge
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-sky-400" /> Mumbai CSMIA Terminal 2 (Level 2 & Level 1)
              </p>

              <div className="flex items-center gap-4 text-xs mb-6 border-y border-slate-700 py-3">
                <span className="flex items-center gap-1 font-bold text-white">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.8 / 5.0 (320 Reviews)
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Flight Delay Protection Included
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-3">Service Description</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Niranta Transit Hotel offers air-conditioned micro-stay rooms right inside Mumbai CSMIA Terminal 2. Perfect for international passengers with long layovers who wish to sleep, shower, and refresh without clearing customs or leaving the airport premises.
              </p>

              <h2 className="text-xl font-bold text-white mb-3">Included Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Rain Shower',
                  'High-Speed Wi-Fi',
                  'Express Check-In',
                  'Flight Status Monitor',
                  '24/7 Room Service',
                  'Soundproof Windows',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-900/80 p-2.5 rounded-xl border border-slate-700"
                  >
                    <Check className="w-4 h-4 text-emerald-400" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Side Card */}
          <div>
            <div className="p-6 bg-slate-800/80 border border-slate-700/60 rounded-3xl sticky top-24 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white">Book Hourly Slot</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Select Duration
                  </label>
                  <select className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5">
                    <option value="3">3 Hours Stay — ₹3,499</option>
                    <option value="6">6 Hours Stay — ₹5,299</option>
                    <option value="12">12 Hours Stay — ₹8,999</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Check-in Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5"
                    defaultValue="2026-07-28T12:00"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Travelers
                  </label>
                  <select className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Slot Base Fee</span>
                  <span className="font-semibold text-white">₹3,499</span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Airport Taxes</span>
                  <span className="font-semibold text-white">₹420</span>
                </div>
                <div className="flex justify-between border-t border-slate-700 pt-2 text-sm font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-sky-400">₹3,919</span>
                </div>
              </div>

              <Link
                href="/my-itinerary"
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
              >
                Proceed to Reserve <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
