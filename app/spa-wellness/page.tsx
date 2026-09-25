'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SPAS_DATA, FAQS_DATA } from '@/data/layover-data';
import { useItinerary } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';
import { Sparkles, MapPin, Clock, Star, ShieldCheck, ChevronDown, Plus } from 'lucide-react';

export default function SpaWellnessPage() {
  const { items = [], addToItinerary = () => {}, removeFromItinerary = () => {} } = useItinerary() || {};
  const { requireAuth } = useAuth();
  const [activeCategory, setActiveCategory] = useState<'all' | 'massage' | 'express' | 'full-day'>('all');
  const [durationFilter, setDurationFilter] = useState<string[]>([]);
  const [treatmentFilter, setTreatmentFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [amenityFilter, setAmenityFilter] = useState<string[]>([]);
  const [starFilter, setStarFilter] = useState<string[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [sortBy, setSortBy] = useState('popularity');

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setList((prev) => (prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]));
  };

  const clearAllFilters = () => {
    setActiveCategory('all');
    setDurationFilter([]);
    setTreatmentFilter([]);
    setLocationFilter([]);
    setPriceFilter([]);
    setAmenityFilter([]);
    setStarFilter([]);
  };

  const activeFiltersCount =
    (activeCategory !== 'all' ? 1 : 0) +
    durationFilter.length +
    treatmentFilter.length +
    locationFilter.length +
    priceFilter.length +
    amenityFilter.length +
    starFilter.length;

  const filteredSpas = SPAS_DATA.filter((s) => {
    // Top Tab Category
    if (activeCategory !== 'all' && s.category !== activeCategory) return false;

    // Treatment Type Filter
    if (treatmentFilter.length > 0 && !treatmentFilter.includes(s.category || '')) return false;

    // Duration Filter
    if (durationFilter.length > 0) {
      const durMinutes = parseInt(s.duration.replace(/[^0-9]/g, '')) || 60;
      const matchUnder1h = durationFilter.includes('under-1h') && durMinutes < 60;
      const match1to2h = durationFilter.includes('1-2h') && durMinutes >= 60 && durMinutes <= 90;
      const match2hPlus = durationFilter.includes('2h-plus') && durMinutes > 90;
      if (!matchUnder1h && !match1to2h && !match2hPlus) return false;
    }

    // Location / Enclave Filter
    if (locationFilter.length > 0) {
      const locLower = (s.location + ' ' + s.distance).toLowerCase();
      const matchInsideT2 = locationFilter.includes('in-terminal') && (locLower.includes('inside t2') || locLower.includes('0 km') || s.badge === 'In-Terminal');
      const matchSaharT2 = locationFilter.includes('near-t2') && (locLower.includes('sahar') || locLower.includes('1.2 km'));
      const matchT1 = locationFilter.includes('near-t1') && (locLower.includes('t1') || locLower.includes('santacruz') || locLower.includes('vile parle'));
      const matchCity = locationFilter.includes('city') && (locLower.includes('powai') || locLower.includes('international airport'));
      if (!matchInsideT2 && !matchSaharT2 && !matchT1 && !matchCity) return false;
    }

    // Price Filter
    if (priceFilter.length > 0) {
      const priceNum = parseInt(s.price.replace(/[^0-9]/g, '')) || 0;
      const matchUnder2k = priceFilter.includes('under-2000') && priceNum < 2000;
      const match2kTo4k = priceFilter.includes('2000-4000') && priceNum >= 2000 && priceNum <= 4000;
      const matchAbove4k = priceFilter.includes('above-4000') && priceNum > 4000;
      if (!matchUnder2k && !match2kTo4k && !matchAbove4k) return false;
    }

    // Amenities / Inclusions Filter
    if (amenityFilter.length > 0) {
      const amenitiesStr = (s.amenities.join(' ') + ' ' + s.description).toLowerCase();
      const matchShower = amenityFilter.includes('shower') && amenitiesStr.includes('shower');
      const matchSteam = amenityFilter.includes('steam') && (amenitiesStr.includes('steam') || amenitiesStr.includes('sauna'));
      const matchHerbal = amenityFilter.includes('herbal') && (amenitiesStr.includes('herbal') || amenitiesStr.includes('ayurvedic') || amenitiesStr.includes('organic'));
      const matchStone = amenityFilter.includes('stone') && (amenitiesStr.includes('stone') || amenitiesStr.includes('hydrotherapy'));
      if (!matchShower && !matchSteam && !matchHerbal && !matchStone) return false;
    }

    // Star Rating Filter
    if (starFilter.length > 0) {
      const match48 = starFilter.includes('4.8') && s.rating >= 4.8;
      const match45 = starFilter.includes('4.5') && s.rating >= 4.5;
      if (!match48 && !match45) return false;
    }

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
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">Filters</h2>
                    {activeFiltersCount > 0 && (
                      <span className="bg-[#0284C7] text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-[#0284C7] font-bold hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Duration Filter */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Duration
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Under 1 Hour (30–45m)', value: 'under-1h' },
                      { label: '1 – 2 Hours (60–90m)', value: '1-2h' },
                      { label: 'Deep Wellness (2h+)', value: '2h-plus' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={durationFilter.includes(item.value)}
                          onChange={() => toggleFilter(durationFilter, setDurationFilter, item.value)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Treatment Type */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Treatment Type
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: '⚡ Express Jetlag Relief', value: 'express' },
                      { label: '💆 Massages & Aromatherapy', value: 'massage' },
                      { label: '🛁 Full Day Wellness Circuit', value: 'full-day' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={treatmentFilter.includes(item.value)}
                          onChange={() => toggleFilter(treatmentFilter, setTreatmentFilter, item.value)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Terminal & Location */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Location & Enclave
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Inside T2 (Airside 0 km)', value: 'in-terminal' },
                      { label: 'Sahar Airport Enclave (1–2 km)', value: 'near-t2' },
                      { label: 'Terminal 1 Enclave (Santacruz)', value: 'near-t1' },
                      { label: 'Airport District (Powai / Luxury)', value: 'city' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={locationFilter.includes(item.value)}
                          onChange={() => toggleFilter(locationFilter, setLocationFilter, item.value)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Under ₹2,000 (Express)', value: 'under-2000' },
                      { label: '₹2,000 – ₹4,000 (Standard)', value: '2000-4000' },
                      { label: 'Above ₹4,000 (5-Star Luxury)', value: 'above-4000' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={priceFilter.includes(item.value)}
                          onChange={() => toggleFilter(priceFilter, setPriceFilter, item.value)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Inclusions & Amenities */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Transit Amenities
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: '🚿 Hot Rain Shower', value: 'shower' },
                      { label: '🧖 Steam / Sauna Suite', value: 'steam' },
                      { label: '🌿 Organic / Ayurvedic Herbs', value: 'herbal' },
                      { label: '🌊 Hydrotherapy / Hot Stone', value: 'stone' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={amenityFilter.includes(item.value)}
                          onChange={() => toggleFilter(amenityFilter, setAmenityFilter, item.value)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Rating
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: '⭐ 4.8+ Top Rated', value: '4.8' },
                      { label: '⭐ 4.5+ Verified', value: '4.5' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={starFilter.includes(item.value)}
                          onChange={() => toggleFilter(starFilter, setStarFilter, item.value)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

            {/* Marketplace Grid */}
            <div className="w-full lg:w-3/4 space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="text-sm font-medium text-slate-700">
                  Showing <strong className="text-slate-900">{filteredSpas.length}</strong> verified transit treatments
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

                      <div className="text-xs text-[#0284C7] font-semibold flex items-center justify-between gap-1 mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} /> {s.location}
                        </span>
                        <span className="text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                          {s.transitTime}
                        </span>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{s.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">Starting Price</span>
                          <strong className="text-lg font-black text-slate-900">{s.price}</strong>
                        </div>
                        <div className="border-l border-slate-200 pl-3">
                          <span className="text-slate-500 text-xs block font-medium">Est. Transit Time</span>
                          <span className="text-[#0369a1] font-bold text-sm">{s.transitTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/service-details?id=${s.id}`}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                        >
                          View Details
                        </Link>
                        {(() => {
                          const isAdded = items.some((item) => item.id === s.id);
                          return (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (isAdded) {
                                  removeFromItinerary(s.id);
                                } else {
                                  requireAuth(() => {
                                    addToItinerary({
                                      id: s.id,
                                      title: s.name,
                                      type: 'spa',
                                      price: s.price,
                                      cost: s.price,
                                      durationHours: 1.0,
                                      image: s.image,
                                      location: s.location,
                                      detail: `${s.treatment} (${s.duration})`,
                                      badge: 'Spa',
                                    });
                                  });
                                }
                              }}
                              className={`px-4 py-2 font-bold text-xs rounded-xl shadow transition cursor-pointer ${
                                isAdded ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-[#0284C7] hover:bg-[#027ab1] text-white'
                              }`}
                            >
                              {isAdded ? 'Added ✓' : 'Add to Plan'}
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
