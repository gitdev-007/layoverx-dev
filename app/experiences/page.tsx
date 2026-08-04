'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TOURS_DATA, FAQS_DATA } from '@/data/layover-data';
import { useItinerary } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';
import { Compass, MapPin, Clock, Star, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function ExperiencesPage() {
  const { items = [], addToItinerary = () => {}, removeFromItinerary = () => {} } = useItinerary() || {};
  const { requireAuth } = useAuth();
  const [activeCategory, setActiveCategory] = useState<'all' | 'sightseeing' | 'culture' | 'shopping' | 'food' | 'nightlife'>('all');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const filteredTours = activeCategory === 'all'
    ? TOURS_DATA
    : TOURS_DATA.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <nav className="flex items-center gap-2 text-xs text-amber-300" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-slate-500">/</span>
                <span className="text-white font-medium">Experiences</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                ✨ DISCOVER MUMBAI IN TRANSIT
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Time-Optimized Mumbai <br />
                <span className="text-amber-400">Layover Experiences</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                Escape the airport gates. Book short, custom-guided tours, shopping expeditions, and heritage walks scheduled exactly within your layover hours. Private AC transport included.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Tailored to your Layover Hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Private AC Transport & Chauffeur</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Local Expert Guides</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Luggage Storage Options</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=800&q=80"
                  alt="South Mumbai Heritage Tour"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-white font-bold flex items-center gap-2 border border-white/10">
                  <MapPin size={14} className="text-amber-400" /> South Mumbai & Gateway of India
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeCategory === 'all' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Activities
            </button>
            <button
              onClick={() => setActiveCategory('sightseeing')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeCategory === 'sightseeing' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📸 Sightseeing
            </button>
            <button
              onClick={() => setActiveCategory('culture')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeCategory === 'culture' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🕌 Culture & Heritage
            </button>
            <button
              onClick={() => setActiveCategory('food')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeCategory === 'food' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🍲 Food Crawls
            </button>
          </div>
        </div>
      </section>

      {/* MAIN LISTINGS & FILTERS */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filter Sidebar */}
            <aside className="w-full lg:w-1/4 flex-shrink-0">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sticky top-36 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Filters</h2>
                  <button onClick={() => setActiveCategory('all')} className="text-xs text-[#0284C7] font-bold hover:underline">
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Layover Fit</h3>
                  <label className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0284C7]" />
                    Quick stops (Under 4h)
                  </label>
                  <label className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0284C7]" />
                    Standard stays (4h - 8h)
                  </label>
                  <label className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0284C7]" />
                    Long transits (8h+)
                  </label>
                </div>
              </div>
            </aside>

            {/* Marketplace Grid */}
            <div className="w-full lg:w-3/4 space-y-6">
              {filteredTours.map((t) => (
                <article
                  key={t.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row"
                >
                  <div className="relative w-full md:w-80 h-52 md:h-auto flex-shrink-0">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                    <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      📸 {(t.category || 'sightseeing').toUpperCase()}
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-lg">{t.name}</h3>
                        <span className="flex items-center gap-1 bg-slate-50 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold">
                          ⭐ {t.rating}
                        </span>
                      </div>

                      <div className="text-xs text-[#0284C7] font-semibold flex items-center gap-1 mb-2">
                        <Clock size={13} /> Duration: {t.duration} ({t.safeWindow})
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Price Per Guest</span>
                        <strong className="text-lg font-black text-slate-900">{t.price}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/service-details?id=${t.id}`}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                        >
                          View Details
                        </Link>
                        {(() => {
                          const isAdded = items.some((item) => item.id === t.id);
                          return (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (isAdded) {
                                  removeFromItinerary(t.id);
                                } else {
                                  requireAuth(() => {
                                    addToItinerary({
                                      id: t.id,
                                      title: t.name,
                                      type: 'tour',
                                      price: t.price,
                                      cost: t.price,
                                      durationHours: 4.0,
                                      image: t.image,
                                      location: t.location || 'Mumbai',
                                      detail: `Duration: ${t.duration} (${t.safeWindow})`,
                                      badge: 'Tour',
                                    });
                                  });
                                }
                              }}
                              className={`px-4 py-2 font-bold text-xs rounded-xl shadow transition cursor-pointer ${
                                isAdded ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-[#0284C7] hover:bg-[#027ab1] text-white'
                              }`}
                            >
                              {isAdded ? 'Added ✓' : 'Add to Itinerary'}
                            </button>
                          );
                        })()}
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
