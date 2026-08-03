'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TRANSFERS_DATA, FAQS_DATA } from '@/data/layover-data';
import { useItinerary } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';
import { Car, MapPin, ShieldCheck, ChevronDown, CheckCircle2, Star } from 'lucide-react';

export default function AirportTransfersPage() {
  const { addItem } = useItinerary();
  const { requireAuth } = useAuth();
  const [pickup, setPickup] = useState('t2');
  const [drop, setDrop] = useState('bandra');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <nav className="flex items-center gap-2 text-xs text-sky-300" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-slate-500">/</span>
                <span className="text-white font-medium">Airport Transfers</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                🚕 FIXED-RATE TRANSIT TRANSFERS
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Fixed-Rate Airport <br />
                <span className="text-sky-400">Cabs & Transfers</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                Book a professional, verified private taxi to escape CSMIA gates without transit surges. Free flight tracking, 45-minute terminal gate wait buffer, and professional English-speaking drivers.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Surge-Free Fixed Pricing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Tolls & Parking Included</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">45-Min Free Gate Wait Buffer</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Real-time Flight Tracking</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
                  alt="Executive Taxi Transfer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-white font-bold flex items-center gap-2 border border-white/10">
                  <MapPin size={14} className="text-sky-400" /> Mumbai CSMIA Terminal Pickups
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CAB BOOKING SEARCH BAR */}
      <section className="bg-white border-b border-slate-200 py-6 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pickup Location</label>
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="t2">Mumbai Airport T2 (International)</option>
                <option value="t1">Mumbai Airport T1 (Domestic)</option>
                <option value="hotel">Nearby Hotel / Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Drop Location</label>
              <select
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="bandra">Bandra (Cafe Street / Sea Link)</option>
                <option value="colaba">Colaba (Gateway of India / South Bombay)</option>
                <option value="juhu">Juhu Beach (Seaside Hotels)</option>
                <option value="andheri">Andheri East (Airport Hotels District)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pickup Date & Time</label>
              <input
                type="datetime-local"
                defaultValue="2026-07-28T10:00"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              className="py-3 bg-[#0284C7] hover:bg-[#027ab1] text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              Check Vehicles
            </button>
          </form>
        </div>
      </section>

      {/* MAIN VEHICLE LISTINGS & FILTERS */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filter Sidebar */}
            <aside className="w-full lg:w-1/4 flex-shrink-0">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sticky top-36 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Filters</h2>
                  <button className="text-xs text-[#0284C7] font-bold hover:underline">Clear All</button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cab Category</h3>
                  <label className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0284C7]" />
                    Compact Sedan
                  </label>
                  <label className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0284C7]" />
                    Premium SUV
                  </label>
                </div>
              </div>
            </aside>

            {/* Marketplace Grid */}
            <div className="w-full lg:w-3/4 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 text-xs sm:text-sm text-slate-700">
                Select your vehicle category. Prices shown are <strong>fixed and inclusive of toll/parking fees</strong>.
              </div>

              {TRANSFERS_DATA.map((c) => (
                <article
                  key={c.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row"
                >
                  <div className="relative w-full md:w-80 h-52 md:h-auto flex-shrink-0 overflow-hidden bg-slate-900">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover"
                    />
                    {c.badge && (
                      <span className="absolute top-4 left-4 bg-[#0284C7] text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                        {c.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-lg">{c.name}</h3>
                        <span className="flex items-center gap-1 bg-slate-50 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold">
                          ⭐ {c.rating}
                        </span>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{c.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Fixed Quote</span>
                        <strong className="text-lg font-black text-slate-900">{c.price}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            requireAuth(() => {
                              addItem({
                                title: c.name,
                                detail: `${c.vehicle} • Fixed rate transfer`,
                                badge: 'Cab',
                                cost: c.price,
                                durationHours: 1.0,
                              });
                            });
                          }}
                          className="px-4 py-2 bg-[#0284C7] hover:bg-[#027ab1] text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
                        >
                          Add to Itinerary
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
