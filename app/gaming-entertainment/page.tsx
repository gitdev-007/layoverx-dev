'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GAMING_DATA, FAQS_DATA } from '@/data/layover-data';
import { Gamepad2, MapPin, Star, ChevronDown } from 'lucide-react';

export default function GamingEntertainmentPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'gaming' | 'movie'>('all');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [sortBy, setSortBy] = useState('popularity');

  const filteredGaming = activeCategory === 'all'
    ? GAMING_DATA
    : GAMING_DATA.filter((g) => g.category === activeCategory);

  const sortedGaming = [...filteredGaming].sort((a, b) => {
    if (sortBy === 'price-low') {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
      return priceB - priceA;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'popularity') {
      return b.reviews - a.reviews;
    }
    return 0;
  });

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <nav className="flex items-center gap-2 text-xs text-fuchsia-300" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-slate-500">/</span>
                <span className="text-white font-medium">Gaming</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/30">
                🎮 INTERACTIVE ENTERTAINMENT
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Gaming Lounges & <br />
                <span className="text-fuchsia-400">Transit Entertainment</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                Turn boring flight connections into high-energy fun. Experience cutting-edge VR zones, boutique bowling lanes, and luxury theater suites at premium airport-adjacent entertainment hubs.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">VR and Simulator Zones</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Luxury Recliner Cinemas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Family-Friendly Activities</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Minutes from Terminal Gates</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
                  alt="Gaming Lounge"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-white font-bold flex items-center gap-2 border border-white/10">
                  <MapPin size={14} className="text-fuchsia-400" /> Mumbai CSMIA Airport District
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
              All Fun
            </button>
            <button
              onClick={() => setActiveCategory('gaming')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeCategory === 'gaming' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🎮 Gaming Zones
            </button>
            <button
              onClick={() => setActiveCategory('movie')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeCategory === 'movie' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🍿 Cinema
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
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Intensity</h3>
                  <label className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0284C7]" />
                    High Energy (Gaming)
                  </label>
                  <label className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0284C7]" />
                    Relaxed (Cinema)
                  </label>
                </div>
              </div>
            </aside>

            {/* Marketplace Grid */}
            <div className="w-full lg:w-3/4 space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="text-sm font-medium text-slate-700">
                  Showing <strong className="text-slate-900">{filteredGaming.length}</strong> verified transit experiences
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Sort By:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Guest Rating</option>
                  </select>
                </div>
              </div>

              {sortedGaming.map((g) => (
                <article
                  key={g.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row"
                >
                  <div className="relative w-full md:w-80 h-52 md:h-auto flex-shrink-0">
                    <Image src={g.image} alt={g.name} fill className="object-cover" />
                    <span className="absolute top-4 left-4 bg-fuchsia-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      🎮 {(g.category || 'gaming').toUpperCase()}
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-lg">{g.name}</h3>
                        <span className="flex items-center gap-1 bg-slate-50 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold">
                          ⭐ {g.rating}
                        </span>
                      </div>

                      <div className="text-xs text-[#0284C7] font-semibold flex items-center gap-1 mb-2">
                        <MapPin size={13} /> {g.location}
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{g.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Starting Price</span>
                        <strong className="text-lg font-black text-slate-900">{g.price}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href="/plan-my-layover"
                          className="px-4 py-2 bg-[#0284C7] hover:bg-[#027ab1] text-white font-bold text-xs rounded-xl shadow transition"
                        >
                          Add to Itinerary
                        </Link>
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
