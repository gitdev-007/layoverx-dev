'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HOTELS_DATA, FAQS_DATA, REVIEWS_DATA, Hotel } from '@/data/layover-data';
import { fetchServices } from '@/lib/api';
import { useItinerary } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';
import {
  Hotel as HotelIcon,
  MapPin,
  Star,
  Search,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Clock,
  ShieldCheck,
  Building,
  Filter,
} from 'lucide-react';

export default function HotelsPage() {
  const { items = [], addToItinerary = () => {}, removeFromItinerary = () => {} } = useItinerary() || {};
  const { requireAuth } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [stayDuration, setStayDuration] = useState('6');
  const [checkinTime, setCheckinTime] = useState('2026-07-28T12:00');
  const [hotelsList, setHotelsList] = useState<Hotel[]>(HOTELS_DATA);
  const [loadingServices, setLoadingServices] = useState(false);

  useEffect(() => {
    async function loadCatalog() {
      setLoadingServices(true);
      try {
        const data = await fetchServices('hotel', parseInt(stayDuration) * 60, selectedLocation);
        if (data && data.length > 0) {
          const mapped: Hotel[] = data.map((item) => ({
            id: item.id,
            slotId: item.slotId || `slot_${item.id}_101`,
            name: item.name,
            terminal: item.terminal || 'CSMIA Terminal 2',
            distance: item.distance || '0 km',
            rating: item.rating || 4.8,
            reviews: item.reviews || 1200,
            stars: 5,
            price3h: `₹${item.price || 3499}`,
            price6h: `₹${Math.round((item.price || 3499) * 1.4)}`,
            priceFullNight: `₹${Math.round((item.price || 3499) * 1.8)}`,
            locationCategory: 'in-terminal',
            badge: item.badge || 'Verified Partner',
            amenities: item.amenities || ['🚿 Shower Facility', '⚡ Fast WiFi', '🛌 24/7 Check-in'],
            description: item.description || 'Hourly micro-stay transit accommodations.',
            image: item.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
          }));
          setHotelsList(mapped);
        }
      } catch (err) {
        console.warn('[HotelsPage] API fetch fallback to static data:', err);
      } finally {
        setLoadingServices(false);
      }
    }
    loadCatalog();
  }, [selectedLocation, stayDuration]);

  // Filters state
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [distanceFilter, setDistanceFilter] = useState<string[]>([]);
  const [starFilter, setStarFilter] = useState<string[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [sortBy, setSortBy] = useState('popularity');

  const togglePriceFilter = (val: string) => {
    setPriceFilter((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleDistanceFilter = (val: string) => {
    setDistanceFilter((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleStarFilter = (val: string) => {
    setStarFilter((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const clearAllFilters = () => {
    setSelectedLocation('all');
    setStayDuration('6');
    setPriceFilter([]);
    setDistanceFilter([]);
    setStarFilter([]);
  };

  // Filtered hotels
  const filteredHotels = hotelsList.filter((hotel) => {
    if (selectedLocation !== 'all' && hotel.locationCategory !== selectedLocation) {
      return false;
    }
    if (starFilter.length > 0 && !starFilter.includes(String(hotel.stars))) {
      return false;
    }
    return true;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === 'price-low') {
      const priceA = parseInt(a.price6h.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.price6h.replace(/[^0-9]/g, '')) || 0;
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      const priceA = parseInt(a.price6h.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.price6h.replace(/[^0-9]/g, '')) || 0;
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
      <section className="relative bg-slate-900 text-white pt-16 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <nav className="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span className="text-slate-600">/</span>
                <span className="text-white font-medium">Hotels</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                🏨 PREMIER TRANSIT ACCOMMODATION
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Luxury Transit Hotels <br />
                <span className="text-sky-400">Minutes from CSMIA</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Sleep, refresh, and recharge during your Mumbai stopover. Book premium day-rooms, airport transit hotels, and pods by the hour with flexible 24/7 check-in and complimentary terminal shuttle service.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    24/7 Flexible Check-in
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    Free Terminal Shuttles
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    Hourly Packages (3h/6h/12h)
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    Inside T2 Transit Pods
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                  alt="Premium transit hotel room near Mumbai Airport"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-white font-bold flex items-center gap-2 border border-white/10">
                  <MapPin size={14} className="text-sky-400" /> Mumbai CSMIA Airport District
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOTEL CATEGORY PILLS BAR (Matching Screenshot 2 style, related to Hotels) */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-16 z-40 shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 min-w-max pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => {
                setSelectedLocation('all');
                setStarFilter([]);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                selectedLocation === 'all' && starFilter.length === 0
                  ? 'bg-[#0369a1] text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Hotels
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedLocation('in-terminal');
                setStarFilter([]);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                selectedLocation === 'in-terminal'
                  ? 'bg-[#0369a1] text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🏨 Inside T2 (Airside)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedLocation('near-t2');
                setStarFilter([]);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                selectedLocation === 'near-t2'
                  ? 'bg-[#0369a1] text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🏬 Near Airport (Landside)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedLocation('all');
                setStarFilter(['3']);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                starFilter.includes('3') && selectedLocation === 'all'
                  ? 'bg-[#0369a1] text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🛏️ Sleeping Pods
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedLocation('all');
                setStarFilter(['5']);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                starFilter.includes('5') && selectedLocation === 'all'
                  ? 'bg-[#0369a1] text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              ⭐ 5-Star Luxury
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedLocation('near-t1');
                setStarFilter([]);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                selectedLocation === 'near-t1'
                  ? 'bg-[#0369a1] text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🚿 Hourly Rest & Shower
            </button>
          </div>
        </div>
      </section>

      {/* MAIN MARKETPLACE LAYOUT */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* FILTER SIDEBAR */}
            <aside className="w-full lg:w-1/4 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-40 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Filter size={16} className="text-[#0369a1]" /> Filters
                  </h2>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-xs text-[#0369a1] font-bold hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Price Range (INR)
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Under ₹2,500', value: 'under-2500' },
                      { label: '₹2,500 - ₹5,000', value: '2500-5000' },
                      { label: 'Above ₹5,000', value: 'above-5000' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-sm font-medium text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={priceFilter.includes(item.value)}
                          onChange={() => togglePriceFilter(item.value)}
                          className="rounded border-slate-300 text-[#0369a1] focus:ring-[#0369a1]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Star Ratings */}
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Star Rating
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { label: '⭐⭐⭐⭐⭐ 5 Star Luxury', value: '5' },
                      { label: '⭐⭐⭐⭐ 4 Star Premium', value: '4' },
                      { label: '⭐⭐⭐ 3 Star Standard', value: '3' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-3 text-sm font-medium text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={starFilter.includes(item.value)}
                          onChange={() => toggleStarFilter(item.value)}
                          className="rounded border-slate-300 text-[#0369a1] focus:ring-[#0369a1]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Transit Amenities
                  </h3>
                  <div className="space-y-2.5 text-sm font-medium text-slate-700">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#0369a1]" /> Free Airport Shuttle
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#0369a1]" /> 24/7 Check-in
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-[#0369a1]" /> Spa & Massage
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-[#0369a1]" /> Swimming Pool
                    </label>
                  </div>
                </div>

              </div>
            </aside>

            {/* HOTEL LISTINGS LIST */}
            <div className="w-full lg:w-3/4 space-y-6">
              
              {/* Count Header */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="text-sm font-medium text-slate-700">
                  Showing <strong className="text-slate-900">{filteredHotels.length}</strong> verified transit hotels near Mumbai Airport
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

              {/* Cards Loop */}
              <div className="space-y-6">
                {sortedHotels.map((hotel) => (
                  <article
                    key={hotel.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row"
                  >
                    <div className="relative w-full md:w-80 h-56 md:h-auto flex-shrink-0">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                      />
                      {hotel.badge && (
                        <span className="absolute top-4 left-4 bg-[#0369a1] text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                          {hotel.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-xl font-bold text-slate-900 hover:text-[#0369a1] transition-colors">
                            <Link href={`/service-details?id=${hotel.id}`}>{hotel.name}</Link>
                          </h3>
                          <button
                            type="button"
                            onClick={() => {
                              if (starFilter.includes('4') && starFilter.includes('5')) {
                                setStarFilter([]);
                              } else {
                                setStarFilter(['4', '5']);
                              }
                            }}
                            className="flex items-center gap-1.5 bg-slate-50 hover:bg-sky-50 text-slate-800 hover:text-[#0369a1] px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 border border-slate-100 hover:border-sky-200 transition cursor-pointer"
                            title="Quick Filter: 4+ Star Hotels"
                          >
                            <Star size={14} className="text-amber-500 fill-amber-500" /> {hotel.rating}
                            <span className="text-slate-500 font-medium">({hotel.reviews} reviews)</span>
                          </button>
                        </div>

                        <div className="text-xs text-slate-500 flex items-center gap-2 mb-3">
                          <MapPin size={14} className="text-[#0369a1] flex-shrink-0" />
                          <span>{hotel.terminal}</span>
                          <span className="text-slate-900 font-bold">• {hotel.distance}</span>
                        </div>

                        <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                          {hotel.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-2">
                          {hotel.amenities.map((amenity, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-md"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="text-slate-500 text-xs block font-medium">
                              Day-Use ({stayDuration}h slot)
                            </span>
                            <span className="text-xl font-black text-[#0369a1]">
                              {stayDuration === '3' ? hotel.price3h : hotel.price6h}
                            </span>
                          </div>
                          <div className="border-l border-slate-200 pl-3">
                            <span className="text-slate-500 text-xs block font-medium">Full Night Room</span>
                            <span className="text-slate-900 font-bold text-sm">{hotel.priceFullNight}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/service-details?id=${hotel.id}`}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                          >
                            View Details
                          </Link>
                          {(() => {
                            const isAdded = items.some((item) => item.id === hotel.id);
                            return (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (isAdded) {
                                    removeFromItinerary(hotel.id);
                                  } else {
                                    requireAuth(() => {
                                      const selectedPrice = stayDuration === '3' ? hotel.price3h : hotel.price6h;
                                      addToItinerary({
                                        id: hotel.id,
                                        title: hotel.name,
                                        type: 'hotel',
                                        price: selectedPrice,
                                        cost: selectedPrice,
                                        durationHours: parseInt(stayDuration) || 3,
                                        image: hotel.image,
                                        location: hotel.terminal,
                                        detail: `${hotel.terminal} • ${stayDuration}h slot`,
                                        badge: 'Hotel',
                                      });
                                    });
                                  }
                                }}
                                className={`px-4 py-2 font-bold text-xs rounded-xl shadow-md transition cursor-pointer ${
                                  isAdded ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-[#0369a1] hover:bg-[#075985] text-white'
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
        </div>
      </section>

      {/* FEATURED IN-TERMINAL SPOTLIGHT SECTION */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="inline-block text-[#0369a1] font-bold text-xs uppercase tracking-wider">
                Exclusive Partner
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Premium In-Terminal Transit
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Have a layover under 5 hours? Avoid clearing immigration altogether. Niranta Transit Hotel is located directly inside Terminal 2 Arrivals, offering luxury sleep pods, hot showers, and high-speed working desks. Book by the hour with zero boarding anxiety.
              </p>
              <div className="flex items-center gap-6 pt-2">
                <div>
                  <div className="text-3xl font-black text-[#0369a1]">0 min</div>
                  <div className="text-xs text-slate-500 font-bold">Immigration Wait</div>
                </div>
                <div className="border-l border-slate-200 pl-6">
                  <div className="text-3xl font-black text-[#0369a1]">24/7</div>
                  <div className="text-xs text-slate-500 font-bold">Check-in Availability</div>
                </div>
                <div className="border-l border-slate-200 pl-6">
                  <div className="text-3xl font-black text-[#0369a1]">4.8★</div>
                  <div className="text-xs text-slate-500 font-bold">Guest Rating</div>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl h-80">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                alt="Transit hotel lounge room"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GUEST REVIEWS SECTION */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#0369a1] font-bold text-xs uppercase tracking-wider block mb-1">
              Guest Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">What Transit Guests Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
                <div className="text-amber-500 text-sm flex gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                  "{rev.comment}"
                </p>
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
            <span className="text-[#0369a1] font-bold text-xs uppercase tracking-wider block mb-1">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Airport Hotels FAQ</h2>
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
