'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GAMING_DATA, FAQS_DATA } from '@/data/layover-data';
import { useItinerary } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';
import { Gamepad2, MapPin, Clock, Star, ShieldCheck, ChevronDown, Plus } from 'lucide-react';

export default function GamingEntertainmentPage() {
  const { items = [], addToItinerary = () => {}, removeFromItinerary = () => {} } = useItinerary() || {};
  const { requireAuth } = useAuth();
  const [activeCategory, setActiveCategory] = useState<'all' | 'gaming' | 'movie'>('all');
  const [experienceFilter, setExperienceFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [featureFilter, setFeatureFilter] = useState<string[]>([]);
  const [starFilter, setStarFilter] = useState<string[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [sortBy, setSortBy] = useState('popularity');

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setList((prev) => (prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]));
  };

  const clearAllFilters = () => {
    setActiveCategory('all');
    setExperienceFilter([]);
    setLocationFilter([]);
    setPriceFilter([]);
    setFeatureFilter([]);
    setStarFilter([]);
  };

  const activeFiltersCount =
    (activeCategory !== 'all' ? 1 : 0) +
    experienceFilter.length +
    locationFilter.length +
    priceFilter.length +
    featureFilter.length +
    starFilter.length;

  const filteredGaming = GAMING_DATA.filter((g) => {
    // Category tabs
    if (activeCategory !== 'all' && g.category !== activeCategory) return false;

    // Experience Type / Category Checkboxes
    if (experienceFilter.length > 0) {
      const matchGaming = experienceFilter.includes('gaming') && g.category === 'gaming';
      const matchCinema = experienceFilter.includes('movie') && g.category === 'movie';
      const matchArcade = experienceFilter.includes('arcade') && (g.badge?.toLowerCase().includes('arcade') || g.features.some((f) => f.toLowerCase().includes('arcade') || f.toLowerCase().includes('vr')));
      if (!matchGaming && !matchCinema && !matchArcade) return false;
    }

    // Location / Enclave
    if (locationFilter.length > 0) {
      const loc = (g.location + ' ' + g.distance).toLowerCase();
      const matchInsideT2 = locationFilter.includes('in-terminal') && (loc.includes('inside t2') || loc.includes('0 km') || (g.badge?.includes('Inside') ?? false));
      const matchKurla = locationFilter.includes('kurla') && (loc.includes('kurla') || loc.includes('phoenix'));
      const matchBkc = locationFilter.includes('bkc') && loc.includes('bkc');
      const matchGhatkopar = locationFilter.includes('ghatkopar') && (loc.includes('ghatkopar') || loc.includes('r city'));
      if (!matchInsideT2 && !matchKurla && !matchBkc && !matchGhatkopar) return false;
    }

    // Price Range
    if (priceFilter.length > 0) {
      const priceNum = parseInt(g.price.replace(/[^0-9]/g, '')) || 0;
      const matchUnder1000 = priceFilter.includes('under-1000') && priceNum < 1000;
      const match1000To1500 = priceFilter.includes('1000-1500') && priceNum >= 1000 && priceNum <= 1500;
      const matchAbove1500 = priceFilter.includes('above-1500') && priceNum > 1500;
      if (!matchUnder1000 && !match1000To1500 && !matchAbove1500) return false;
    }

    // Features & Amenities
    if (featureFilter.length > 0) {
      const featStr = (g.features.join(' ') + ' ' + g.description).toLowerCase();
      const matchPs5 = featureFilter.includes('ps5') && (featStr.includes('ps5') || featStr.includes('playstation'));
      const matchVr = featureFilter.includes('vr') && (featStr.includes('vr') || featStr.includes('virtual reality'));
      const matchRecliner = featureFilter.includes('recliner') && (featStr.includes('recliner') || featStr.includes('pod') || featStr.includes('lounge'));
      const matchFood = featureFilter.includes('food') && (featStr.includes('snack') || featStr.includes('dining') || featStr.includes('food') || featStr.includes('bar'));
      const matchWifi = featureFilter.includes('wifi') && (featStr.includes('wi-fi') || featStr.includes('fiber') || featStr.includes('internet'));
      if (!matchPs5 && !matchVr && !matchRecliner && !matchFood && !matchWifi) return false;
    }

    // Star Rating
    if (starFilter.length > 0) {
      const match48 = starFilter.includes('4.8') && g.rating >= 4.8;
      const match47 = starFilter.includes('4.7') && g.rating >= 4.7;
      if (!match48 && !match47) return false;
    }

    return true;
  });

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

                {/* Experience Type */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Experience Type
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: '🎮 Esports & PS5 Lounges', value: 'gaming' },
                      { label: '🎬 Luxury Recliner Cinema', value: 'movie' },
                      { label: '🕹️ VR & Arcade Arenas', value: 'arcade' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={experienceFilter.includes(item.value)}
                          onChange={() => toggleFilter(experienceFilter, setExperienceFilter, item.value)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location / Enclave */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Location & Enclave
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Inside T2 (Airside 0 km)', value: 'in-terminal' },
                      { label: 'Phoenix Marketcity (12 Mins)', value: 'kurla' },
                      { label: 'BKC Luxury District (20 Mins)', value: 'bkc' },
                      { label: 'R City Mall (18 Mins)', value: 'ghatkopar' },
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
                      { label: 'Under ₹1,000 (Cinema / Express)', value: 'under-1000' },
                      { label: '₹1,000 – ₹1,500 (Standard Pass)', value: '1000-1500' },
                      { label: 'Above ₹1,500 (VIP Unlimited)', value: 'above-1500' },
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

                {/* Hardware & Amenities */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Setup & Amenities
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: '🎮 PS5 Pro / 4K Gaming Rigs', value: 'ps5' },
                      { label: '🥽 VR Simulators & Coasters', value: 'vr' },
                      { label: '🛋️ 180° Recliner Loungers', value: 'recliner' },
                      { label: '🍿 Gourmet Snacks & Drinks', value: 'food' },
                      { label: '⚡ Gigabit Fiber Wi-Fi', value: 'wifi' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={featureFilter.includes(item.value)}
                          onChange={() => toggleFilter(featureFilter, setFeatureFilter, item.value)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Rating
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: '⭐ 4.8+ Top Rated', value: '4.8' },
                      { label: '⭐ 4.7+ Verified', value: '4.7' },
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
                    <span className={`absolute top-4 left-4 text-white text-xs font-bold px-2.5 py-1 rounded-lg ${
                      g.category === 'movie' ? 'bg-amber-600' : 'bg-fuchsia-600'
                    }`}>
                      {g.category === 'movie' ? '🎬 CINEMA' : '🎮 GAMING'}
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

                      <div className="text-xs text-[#0284C7] font-semibold flex items-center justify-between gap-1 mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} /> {g.location}
                        </span>
                        <span className="text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                          {g.transitTime}
                        </span>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{g.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">Starting Price</span>
                          <strong className="text-lg font-black text-slate-900">{g.price}</strong>
                        </div>
                        <div className="border-l border-slate-200 pl-3">
                          <span className="text-slate-500 text-xs block font-medium">Est. Transit Time</span>
                          <span className="text-[#0369a1] font-bold text-sm">{g.transitTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/service-details?id=${g.id}`}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                        >
                          View Details
                        </Link>
                        {(() => {
                          const isAdded = items.some((item) => item.id === g.id);
                          return (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (isAdded) {
                                  removeFromItinerary(g.id);
                                } else {
                                  requireAuth(() => {
                                    addToItinerary({
                                      id: g.id,
                                      title: g.name,
                                      type: 'gaming',
                                      price: g.price,
                                      cost: g.price,
                                      durationHours: 2.0,
                                      image: g.image,
                                      location: g.location,
                                      detail: g.location,
                                      badge: 'Gaming',
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
            <span className="text-[#0284C7] font-bold text-xs uppercase tracking-wider block mb-1">
              Common Questions
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Gaming & Entertainment FAQs</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'Where is the Adani Esports Lounge located inside Terminal 2?',
                answer:
                  'The arena is situated post-security on the Departures concourse near Gate 68. International and domestic transit passengers with an onward T2 boarding pass can access it directly without exiting immigration or customs.',
              },
              {
                question: 'Can I bring my cabin trolley bag and laptop backpack into the arena?',
                answer:
                  'Yes! Every gaming station includes private monitored luggage space and lockers right beside your seat so your bags remain completely safe while you play.',
              },
              {
                question: 'What hardware, consoles, and internet speeds are provided?',
                answer:
                  'Stations feature PlayStation 5 Pro consoles, 4K 144Hz low-latency gaming monitors, VR headsets, and enterprise fiber-optic internet with sub-10ms ping for seamless multiplayer.',
              },
              {
                question: 'Are snacks and drinks included with the hourly pass?',
                answer:
                  'Yes. All 3-hour gaming passes include complimentary access to the lounge snack bar, hot artisanal coffee, tea, and chilled energy/soft drinks.',
              },
              {
                question: 'How do I ensure I do not lose track of time before my flight?',
                answer:
                  'The lounge features real-time flight departure information screens throughout the arena, and our front desk concierge alerts guests 45 minutes before gate boarding begins.',
              },
            ].map((faq, idx) => (
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
