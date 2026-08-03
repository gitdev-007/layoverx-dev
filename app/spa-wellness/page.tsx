'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SPAS_DATA, FAQS_DATA } from '@/data/layover-data';
import { useItinerary } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';
import { Sparkles, MapPin, Clock, Star, ShieldCheck, ChevronDown, Plus } from 'lucide-react';

export default function SpaWellnessPage() {
  const { addItem } = useItinerary();
  const { requireAuth } = useAuth();
  const [activeCategory, setActiveCategory] = useState<'all' | 'massage' | 'express' | 'full-day'>('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [sortBy, setSortBy] = useState('popularity');

  const filteredSpas = SPAS_DATA.filter((s) => {
    if (activeCategory !== 'all' && s.category !== activeCategory) return false;
    if (ratingFilter === '4.5' && s.rating < 4.5) return false;
    const priceNum = parseInt(s.price.replace(/[^0-9]/g, '')) || 0;
    if (priceFilter === 'under-2000' && priceNum >= 2000) return false;
    if (priceFilter === 'above-2000' && priceNum < 2000) return false;
    return true;
  });

  const sortedSpas = [...filteredSpas].sort((a, b) => {
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
              <nav className="flex items-center gap-2 text-xs text-purple-300" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-slate-500">/</span>
                <span className="text-white font-medium">Spa & Wellness</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                💆 REJUVENATING TRANSIT WELLNESS
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Luxury Wellness & <br />
                <span className="text-purple-400">Transit Relaxation</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                Melt away travel fatigue and jetlag with customized spa treatments. Enjoy express foot reflexology inside Terminal 2 or full-day holistic wellness circuits at adjacent luxury hotels.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Express Jetlag Massages</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">In-Terminal and Hotel Options</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Steam and Sauna Access</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Aromatherapy & Detox Juices</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80"
                  alt="Spa Relaxation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-white font-bold flex items-center gap-2 border border-white/10">
                  <MapPin size={14} className="text-purple-400" /> Mumbai CSMIA Airport District
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
              All Treatments
            </button>
            <button
              onClick={() => setActiveCategory('massage')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeCategory === 'massage' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              💆 Massages
            </button>
            <button
              onClick={() => setActiveCategory('express')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeCategory === 'express' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ⚡ Express Services
            </button>
            <button
              onClick={() => setActiveCategory('full-day')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeCategory === 'full-day' ? 'bg-[#0284C7] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🛁 Full Wellness
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
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</h3>
                  <label className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0284C7]" />
                    Under 1 Hour
                  </label>
                  <label className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0284C7]" />
                    1 - 2 Hours
                  </label>
                  <label className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0284C7]" />
                    Deep Wellness (2h+)
                  </label>
                </div>
              </div>
            </aside>

            {/* Marketplace Grid */}
            <div className="w-full lg:w-3/4 space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="text-sm font-medium text-slate-700">
                  Showing <strong className="text-slate-900">{filteredSpas.length}</strong> verified transit treatments
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <select 
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="all">All Ratings</option>
                    <option value="4.5">⭐ 4.5+ Rating</option>
                  </select>

                  <select 
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-2000">Under ₹2,000</option>
                    <option value="above-2000">Above ₹2,000</option>
                  </select>

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

              {sortedSpas.map((s) => (
                <article
                  key={s.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row"
                >
                  <div className="relative w-full md:w-80 h-52 md:h-auto flex-shrink-0">
                    <Image 
                      src={s.image} 
                      alt={s.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover" 
                    />
                    <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      💆 {(s.category || 'massage').toUpperCase()}
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-lg">{s.name}</h3>
                        <span className="flex items-center gap-1 bg-slate-50 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold">
                          ⭐ {s.rating}
                        </span>
                      </div>

                      <div className="text-xs text-[#0284C7] font-semibold flex items-center gap-1 mb-2">
                        <MapPin size={13} /> {s.location}
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{s.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Starting Price</span>
                        <strong className="text-lg font-black text-slate-900">{s.price}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            requireAuth(() => {
                              addItem({
                                title: s.name,
                                detail: `${s.treatment} (${s.duration})`,
                                badge: 'Spa',
                                cost: s.price,
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

      {/* FAQS SECTION */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-[#0284C7] font-bold text-xs uppercase tracking-wider block mb-1">Common Questions</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Spa & Wellness FAQs</h2>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-5 cursor-pointer"
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
              >
                <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-900">
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#0284C7] transition-transform duration-200 ${
                      faqOpen === idx ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {faqOpen === idx && (
                  <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed border-t border-slate-200 pt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
