'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RESTAURANTS_DATA, FAQS_DATA, REVIEWS_DATA, Restaurant } from '@/data/layover-data';
import { useItinerary } from '@/context/itinerary-context';
import {
  Utensils,
  MapPin,
  Star,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Clock,
  ShieldCheck,
  Award,
} from 'lucide-react';

export default function RestaurantsPage() {
  const { addItem } = useItinerary();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [costFilter, setCostFilter] = useState<string[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [sortBy, setSortBy] = useState('popularity');

  const toggleCostFilter = (val: string) => {
    setCostFilter((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const filteredRestaurants = RESTAURANTS_DATA.filter((res) => {
    if (selectedCategory !== 'all' && res.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'price-low') {
      const priceA = parseInt(a.avgCost.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.avgCost.replace(/[^0-9]/g, '')) || 0;
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      const priceA = parseInt(a.avgCost.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.avgCost.replace(/[^0-9]/g, '')) || 0;
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
      <section className="relative bg-gradient-to-br from-orange-950 via-slate-900 to-red-950 text-white pt-16 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <nav className="flex items-center gap-2 text-xs text-orange-200" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-orange-400">/</span>
                <span className="text-white font-medium">Restaurants</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-orange-500/20 text-orange-300 border border-orange-400/30">
                🍽️ EXQUISITE TRANSIT DINING
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Premium Dining & Local <br />
                <span className="text-orange-400">Food Experiences</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                Indulge in Mumbai's legendary culinary landscape without missing your flight. Escape the terminal gates to relish fresh coastal seafood, authentic Maharashtra thalis, and luxury fine dining.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    Airport Proximity (under 15 mins)
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    Verified High-Hygiene Standards
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    Fixed-Time Dining Guarantees
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    Chauffeur Wait-and-Return
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Premium dining near Mumbai Airport"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-white font-bold flex items-center gap-2 border border-white/10">
                  <MapPin size={14} className="text-orange-400" /> Mumbai CSMIA Culinary District
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CUISINE QUICK CATEGORIES TABS */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Cuisines' },
              { id: 'seafood', label: '🦀 Coastal Seafood' },
              { id: 'local', label: '🥘 Local Maharashtrian' },
              { id: 'north-indian', label: '🍢 North Indian' },
              { id: 'street-food', label: '🌶️ Mumbai Street Food' },
              { id: 'fine-dining', label: '✨ Fine Dining' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex-shrink-0 transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-[#0369a1] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN MARKETPLACE LAYOUT */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* FILTERS PANEL */}
            <aside className="w-full lg:w-1/4 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-40 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Filter size={16} className="text-[#0369a1]" /> Filters
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setCostFilter([]);
                    }}
                    className="text-xs text-[#0369a1] font-bold hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Cost for Two
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Under ₹1,000', value: 'under-1000' },
                      { label: '₹1,000 - ₹2,500', value: '1000-2500' },
                      { label: 'Above ₹2,500', value: 'above-2500' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-sm font-medium text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={costFilter.includes(item.value)}
                          onChange={() => toggleCostFilter(item.value)}
                          className="rounded border-slate-300 text-[#0369a1] focus:ring-[#0369a1]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Distance From CSMIA
                  </h3>
                  <div className="space-y-2.5 text-sm font-medium text-slate-700">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#0369a1]" /> Under 2 km
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#0369a1]" /> 2 km to 6 km
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* RESTAURANT LISTINGS */}
            <div className="w-full lg:w-3/4 space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="text-sm font-medium text-slate-700">
                  Showing <strong className="text-slate-900">{filteredRestaurants.length}</strong> verified transit dining spots
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Sort By:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Cost: Low to High</option>
                    <option value="price-high">Cost: High to Low</option>
                    <option value="rating">Guest Rating</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {sortedRestaurants.map((res) => (
                  <article
                    key={res.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row"
                  >
                    <div className="relative w-full md:w-80 h-56 md:h-auto flex-shrink-0">
                      <Image src={res.image} alt={res.name} fill className="object-cover" />
                      {res.badge && (
                        <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                          {res.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-xl font-bold text-slate-900 hover:text-[#0369a1] transition-colors">
                            <Link href={`/service-details?id=${res.id}`}>{res.name}</Link>
                          </h3>
                          <div className="flex items-center gap-1.5 bg-slate-50 text-slate-800 px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-100">
                            <Star size={14} className="text-amber-500 fill-amber-500" /> {res.rating}
                            <span className="text-slate-500 font-medium">({res.reviews} reviews)</span>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 flex items-center gap-2 mb-3">
                          <MapPin size={14} className="text-[#0369a1] flex-shrink-0" />
                          <span>{res.location}</span>
                          <span className="text-slate-900 font-bold">• {res.distance}</span>
                        </div>

                        <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                          {res.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-2">
                          {res.amenities.map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-md">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="text-slate-500 text-xs block font-medium">Cost for Two</span>
                            <span className="text-xl font-black text-slate-900">{res.avgCost}</span>
                          </div>
                          <div className="border-l border-slate-200 pl-3">
                            <span className="text-slate-500 text-xs block font-medium">Est. Transit Time</span>
                            <span className="text-[#0369a1] font-bold text-sm">{res.transitTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/service-details?id=${res.id}`}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                          >
                            View Details
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              addItem({
                                title: res.name,
                                detail: `${res.cuisine} • ${res.location}`,
                                badge: 'Dining',
                                cost: res.avgCost,
                                durationHours: 1.5,
                              });
                            }}
                            className="px-4 py-2 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                          >
                            Reserve & Add
                          </button>
                        </div>
                      </div>

                    </div>
                  </article>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SPOTLIGHT */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-orange-600 font-bold text-xs uppercase tracking-wider block">
                Exclusive Fast-Track
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Guaranteed Table & Flight-Time Sync
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Don't waste transit time waiting in lines. LayoverX pre-reserves your table and pre-orders signature dishes so your meal is ready the moment your driver drops you off.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl h-80">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Express dining"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GUEST REVIEWS */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#0369a1] font-bold text-xs uppercase tracking-wider block mb-1">Guest Feedback</span>
            <h2 className="text-3xl font-extrabold text-slate-900">What Foodies Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
                <div className="text-amber-500 text-sm flex gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">"{rev.comment}"</p>
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900">{rev.author}</div>
                  <div className="text-[11px] text-[#0369a1] font-medium">{rev.flight}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-[#0369a1] font-bold text-xs uppercase tracking-wider block mb-1">Got Questions?</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Dining & Transit FAQ</h2>
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
                    className={`text-[#0369a1] transition-transform duration-200 ${
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
