'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TOURS_DATA, Tour } from '@/data/layover-data';
import { useItinerary } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';
import { parseDurationToMinutes } from '@/lib/validations/layover';
import {
  Compass,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  Filter,
  Car,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

const TOUR_FAQS = [
  {
    question: 'Will my tour chauffeur meet me directly at the Terminal 2 arrival gate?',
    answer:
      'Yes! Your private chauffeur tracks your incoming flight radar in real time and meets you right outside Terminal 2 Arrivals (Pillar 4 designated pickup lane) holding an official LayoverX digital name placard. No waiting, no haggling with street taxis, and zero terminal confusion.',
  },
  {
    question: 'What happens to my luggage during the city tour?',
    answer:
      'Your luggage stays 100% safe. You can place all suitcases, trolleys, and backpacks directly inside the secure, locked boot of your private air-conditioned vehicle. Your chauffeur remains with the vehicle at all stops while you explore monuments and take photos.',
  },
  {
    question: 'How do you guarantee I will not miss my connecting flight?',
    answer:
      'Every LayoverX transit tour enforces a mandatory 2.5-hour airport return buffer. Our operations system continuously monitors live Mumbai traffic along the Western Express Highway and Sea Link. If traffic builds up, your chauffeur receives an automatic alert to start the return route early.',
  },
  {
    question: 'Do I need an Indian visa to take a Mumbai layover city tour?',
    answer:
      'Yes. Because city tours explore outside the airport terminal perimeter, you must pass through Indian Immigration and Customs. Most international travelers can quickly obtain an Indian e-Tourist or e-Transit Visa online at least 4 days before departure.',
  },
  {
    question: 'Can the tour itinerary be adjusted if I only want to see specific sights?',
    answer:
      'Absolutely. Because all tours are private vehicles with dedicated chauffeurs, you can tailor your itinerary on the spot. If you want to spend more time photographing the Gateway of India or prefer to skip shopping to taste authentic street food in Bandra, your driver will customize the stops.',
  },
  {
    question: 'What happens if my inbound flight to Mumbai is delayed?',
    answer:
      'Your tour booking automatically synchronizes with your live flight number. If your flight lands late, our system recalculates your remaining dwell time. If the layover becomes too short to safely tour the city, you receive a full credit to switch to an in-terminal transit hotel or airport spa.',
  },
];

export default function ExperiencesPage() {
  const { items = [], addToItinerary = () => {}, removeFromItinerary = () => {} } = useItinerary() || {};
  const { requireAuth } = useAuth();

  // Multi-facet filter states
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState<string[]>([]);
  const [vehicleFilter, setVehicleFilter] = useState<string[]>([]);
  const [amenityFilter, setAmenityFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [starFilter, setStarFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const toggleFilter = (
    currentList: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    val: string
  ) => {
    setter(
      currentList.includes(val)
        ? currentList.filter((x) => x !== val)
        : [...currentList, val]
    );
  };

  const activeFiltersCount =
    (activeCategory !== 'all' ? 1 : 0) +
    durationFilter.length +
    vehicleFilter.length +
    amenityFilter.length +
    priceFilter.length +
    starFilter.length;

  const clearAllFilters = () => {
    setActiveCategory('all');
    setDurationFilter([]);
    setVehicleFilter([]);
    setAmenityFilter([]);
    setPriceFilter([]);
    setStarFilter([]);
    setSortBy('recommended');
  };

  // Filter application
  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // 1. Category
      if (activeCategory !== 'all' && tour.category !== activeCategory) {
        return false;
      }

      // 2. Duration filter
      if (durationFilter.length > 0) {
        const hours = parseFloat(tour.duration.replace(/[^0-9.]/g, '')) || 4;
        const matchUnder4 = durationFilter.includes('under-4h') && hours < 4;
        const match4to6 = durationFilter.includes('4-6h') && hours >= 4 && hours <= 6;
        const match6plus = durationFilter.includes('6h-plus') && hours > 6;
        if (!matchUnder4 && !match4to6 && !match6plus) return false;
      }

      // 3. Vehicle / Transport filter
      if (vehicleFilter.length > 0) {
        const descAndHl = (tour.description + ' ' + (tour.highlights || []).join(' ')).toLowerCase();
        const matchSedan =
          vehicleFilter.includes('sedan') &&
          (descAndHl.includes('car') || descAndHl.includes('sedan') || descAndHl.includes('chauffeur'));
        const matchSuv =
          vehicleFilter.includes('suv') &&
          (descAndHl.includes('car') || descAndHl.includes('suv') || descAndHl.includes('ferry'));
        const matchWalk =
          vehicleFilter.includes('walk') &&
          (descAndHl.includes('walk') || descAndHl.includes('stroll') || descAndHl.includes('pedestrian') || descAndHl.includes('crawl'));
        if (!matchSedan && !matchSuv && !matchWalk) return false;
      }

      // 4. Inclusions filter
      if (amenityFilter.length > 0) {
        const descAndHl = (tour.description + ' ' + (tour.highlights || []).join(' ')).toLowerCase();
        const matchGuide =
          amenityFilter.includes('guide') &&
          (descAndHl.includes('guide') || descAndHl.includes('guided') || descAndHl.includes('chauffeur'));
        const matchLuggage =
          amenityFilter.includes('luggage') &&
          (descAndHl.includes('boot') || descAndHl.includes('luggage') || descAndHl.includes('car') || true);
        const matchMonument =
          amenityFilter.includes('monument') &&
          (descAndHl.includes('gateway') || descAndHl.includes('caves') || descAndHl.includes('heritage') || descAndHl.includes('basilica'));
        const matchAirport =
          amenityFilter.includes('airport') &&
          (descAndHl.includes('pickup') || descAndHl.includes('airport') || descAndHl.includes('door-to-door'));
        const matchWater = amenityFilter.includes('water');
        if (!matchGuide && !matchLuggage && !matchMonument && !matchAirport && !matchWater) return false;
      }

      // 5. Price filter
      if (priceFilter.length > 0) {
        const priceNum = parseInt(tour.price.replace(/[^0-9]/g, '')) || 3000;
        const matchUnder2500 = priceFilter.includes('under-2500') && priceNum < 2500;
        const match2500to4500 = priceFilter.includes('2500-4500') && priceNum >= 2500 && priceNum <= 4500;
        const matchAbove4500 = priceFilter.includes('above-4500') && priceNum > 4500;
        if (!matchUnder2500 && !match2500to4500 && !matchAbove4500) return false;
      }

      // 6. Star rating filter
      if (starFilter.length > 0) {
        const match48 = starFilter.includes('4.8') && tour.rating >= 4.8;
        const match47 = starFilter.includes('4.7') && tour.rating >= 4.7;
        if (!match48 && !match47) return false;
      }

      return true;
    });
  }, [activeCategory, durationFilter, vehicleFilter, amenityFilter, priceFilter, starFilter]);

  // Sorting
  const sortedTours = useMemo(() => {
    return [...filteredTours].sort((a, b) => {
      if (sortBy === 'price-low') {
        const pA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const pB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return pA - pB;
      }
      if (sortBy === 'price-high') {
        const pA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const pB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return pB - pA;
      }
      if (sortBy === 'duration-low') {
        const dA = parseFloat(a.duration.replace(/[^0-9.]/g, '')) || 0;
        const dB = parseFloat(b.duration.replace(/[^0-9.]/g, '')) || 0;
        return dA - dB;
      }
      if (sortBy === 'duration-high') {
        const dA = parseFloat(a.duration.replace(/[^0-9.]/g, '')) || 0;
        const dB = parseFloat(b.duration.replace(/[^0-9.]/g, '')) || 0;
        return dB - dA;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [filteredTours, sortBy]);

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
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Luggage Storage in Vehicle</span>
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

      {/* CATEGORY TABS BAR */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Activities' },
              { id: 'sightseeing', label: '📸 Sightseeing' },
              { id: 'culture', label: '🕌 Culture & Heritage' },
              { id: 'food', label: '🍲 Food Crawls' },
              { id: 'shopping', label: '🛍️ Shopping' },
              { id: 'nightlife', label: '🌙 Evening Views' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0284C7] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN LISTINGS & VERTICAL FILTERS */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filter Sidebar */}
            <aside className="w-full lg:w-1/4 flex-shrink-0">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sticky top-36 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      <Filter size={16} className="text-[#0284C7]" /> Filters
                    </h2>
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

                {/* 1. Layover Duration */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Layover Duration
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: '⚡ Quick stops (Under 4h)', value: 'under-4h' },
                      { label: '⏱️ Standard stays (4h – 6h)', value: '4-6h' },
                      { label: '🌟 Extended transits (6h+)', value: '6h-plus' },
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

                {/* 2. Activity & Tour Type */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Tour & Activity Type
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: '📸 Sightseeing & Landmarks', value: 'sightseeing' },
                      { label: '🕌 Culture & Heritage', value: 'culture' },
                      { label: '🍲 Food & Street Bites', value: 'food' },
                      { label: '🛍️ Shopping & Bazaars', value: 'shopping' },
                      { label: '🌙 Sunset & Evening Views', value: 'nightlife' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="categorySelect"
                          checked={activeCategory === item.value}
                          onChange={() => setActiveCategory(activeCategory === item.value ? 'all' : item.value)}
                          className="text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. Transport & Vehicle Type */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Transport & Vehicle
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: '🚗 Private AC Sedan (Dzire / Etios)', value: 'sedan' },
                      { label: '🚙 Premium AC SUV (Innova Crysta)', value: 'suv' },
                      { label: '🚶 Guided Heritage Walk', value: 'walk' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={vehicleFilter.includes(item.value)}
                          onChange={() => toggleFilter(vehicleFilter, setVehicleFilter, item.value)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Inclusions & Amenities */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Inclusions & Perks
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: '👨‍✈️ Dedicated English Guide', value: 'guide' },
                      { label: '🧳 Luggage Storage in Car Boot', value: 'luggage' },
                      { label: '🎟️ Fast-Track Monument Entry', value: 'monument' },
                      { label: '✈️ Airport Door-to-Door Pickup', value: 'airport' },
                      { label: '💧 Chilled Bottled Water', value: 'water' },
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

                {/* 5. Price Range */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Under ₹2,500 (Express Tour)', value: 'under-2500' },
                      { label: '₹2,500 – ₹4,500 (Private Sedan)', value: '2500-4500' },
                      { label: 'Above ₹4,500 (Full Day / SUV)', value: 'above-4500' },
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

                {/* 6. Guest Rating */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Guest Rating
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

            {/* Vertical Tours List */}
            <div className="w-full lg:w-3/4 space-y-6">
              
              {/* Results Control Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#0284C7]" />
                  <span className="text-sm font-bold text-slate-800">
                    Showing <strong className="text-slate-900">{sortedTours.length}</strong> Layover Tours
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    • Mumbai Transit Corridor
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-800 px-3 py-2 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0284C7] cursor-pointer w-full sm:w-auto"
                  >
                    <option value="recommended">LayoverX Recommended</option>
                    <option value="duration-low">Duration: Shortest First</option>
                    <option value="duration-high">Duration: Longest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </div>
              </div>

              {/* No Results Empty State */}
              {sortedTours.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-amber-300 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-inner">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">No tours match your selected filters</h3>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
                    Try broadening your duration, budget, or activity criteria to view more Mumbai transit tour options.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369a1] text-white font-bold text-xs shadow transition cursor-pointer"
                  >
                    <RotateCcw size={14} /> Reset All Filters
                  </button>
                </div>
              ) : (
                /* Sticked Vertical List of Tour Cards */
                <div className="space-y-6">
                  {sortedTours.map((tour) => {
                    const isAdded = items.some((item) => item.id === tour.id);

                    return (
                      <article
                        key={tour.id}
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row"
                      >
                        {/* Image Left Column */}
                        <div className="relative w-full md:w-80 h-56 md:h-auto flex-shrink-0">
                          <Image
                            src={tour.image}
                            alt={tour.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 320px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          {tour.badge && (
                            <span className="absolute top-4 left-4 bg-[#0284C7] text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                              {tour.badge}
                            </span>
                          )}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                              <Clock size={13} className="text-amber-400" /> {tour.duration}
                            </span>
                            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-300 font-bold flex items-center gap-1">
                              ★ {tour.rating}
                            </span>
                          </div>
                        </div>

                        {/* Content Right Column */}
                        <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h3 className="text-xl font-bold text-slate-900 hover:text-[#0284C7] transition-colors">
                                <Link href={`/service-details?id=${tour.id}`}>{tour.name}</Link>
                              </h3>
                              <span className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0">
                                ★ {tour.rating}
                              </span>
                            </div>

                            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mb-3">
                              <MapPin size={14} className="text-[#0284C7] flex-shrink-0" />
                              <span>Mumbai Transit Corridor</span>
                              <span className="text-slate-900 font-bold">• {tour.safeWindow}</span>
                              {tour.transitTime && (
                                <span className="text-[#0284C7] font-bold bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100 flex items-center gap-1">
                                  <Car size={12} /> {tour.transitTime}
                                </span>
                              )}
                            </div>

                            <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                              {tour.description}
                            </p>

                            {tour.highlights && tour.highlights.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-2">
                                {tour.highlights.map((hl, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-md"
                                  >
                                    {hl}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Card Footer Actions */}
                          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div>
                                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                                  Price Per Booking
                                </span>
                                <strong className="text-xl font-black text-slate-900">{tour.price}</strong>
                              </div>
                              {tour.transitTime && (
                                <div className="border-l border-slate-200 pl-3">
                                  <span className="text-slate-500 text-xs block font-medium">Est. Taxi Time</span>
                                  <span className="text-[#0284C7] font-bold text-sm">{tour.transitTime}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <Link
                                href={`/service-details?id=${tour.id}`}
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                              >
                                View Details
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  if (isAdded) {
                                    removeFromItinerary(tour.id);
                                  } else {
                                    requireAuth(() => {
                                      addToItinerary({
                                        id: tour.id,
                                        title: tour.name,
                                        type: 'tour',
                                        price: tour.price,
                                        cost: tour.price,
                                        durationHours: parseDurationToMinutes(tour.duration) / 60 || 4.0,
                                        image: tour.image,
                                        location: tour.location || 'Mumbai',
                                        detail: `${tour.duration} • ${tour.safeWindow || 'Traffic-Buffered Departure'}`,
                                        badge: 'Tour',
                                      });
                                    });
                                  }
                                }}
                                className={`px-4 py-2 font-bold text-xs rounded-xl shadow transition cursor-pointer ${
                                  isAdded
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    : 'bg-[#0284C7] hover:bg-[#0369a1] text-white'
                                }`}
                              >
                                {isAdded ? 'Added ✓' : 'Add to Plan'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* FAQS SECTION BELOW LISTINGS */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-[#0284C7] font-bold text-xs uppercase tracking-wider block mb-1">
              Layover City Tours FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm mt-2">
              Everything transit travelers need to know before leaving the airport for a Mumbai city tour.
            </p>
          </div>

          <div className="space-y-4">
            {TOUR_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-5 cursor-pointer transition hover:border-sky-300"
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
              >
                <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-900">
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#0284C7] transition-transform duration-200 flex-shrink-0 ml-2 ${
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
