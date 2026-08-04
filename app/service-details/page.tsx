'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Star, MapPin, ShieldCheck, Clock, Check, Plus, AlertCircle, ArrowLeft } from 'lucide-react';
import { HOTELS_DATA, RESTAURANTS_DATA, SPAS_DATA, GAMING_DATA, TOURS_DATA } from '@/data/layover-data';
import { useItinerary } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';

function ServiceDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('id') || 'h1';
  const { addToItinerary = () => {} } = useItinerary() || {};
  const { user, requireAuth } = useAuth();

  // Look up item across catalogs
  const hotelMatch = HOTELS_DATA.find((h) => h.id === serviceId);
  const restaurantMatch = RESTAURANTS_DATA.find((r) => r.id === serviceId);
  const spaMatch = SPAS_DATA.find((s) => s.id === serviceId);
  const gamingMatch = GAMING_DATA.find((g) => g.id === serviceId);
  const tourMatch = TOURS_DATA.find((t) => t.id === serviceId);

  const matchedType = hotelMatch
    ? 'Hotel'
    : restaurantMatch
    ? 'Dining'
    : spaMatch
    ? 'Spa'
    : gamingMatch
    ? 'Gaming'
    : tourMatch
    ? 'Tour'
    : 'Hotel';

  const service = {
    id: serviceId,
    name:
      hotelMatch?.name ||
      restaurantMatch?.name ||
      spaMatch?.name ||
      gamingMatch?.name ||
      tourMatch?.name ||
      'Niranta Transit Hotel & Lounge',
    location:
      hotelMatch?.terminal ||
      restaurantMatch?.location ||
      spaMatch?.location ||
      gamingMatch?.location ||
      'Mumbai CSMIA Terminal 2',
    distance:
      hotelMatch?.distance ||
      restaurantMatch?.distance ||
      spaMatch?.distance ||
      gamingMatch?.distance ||
      '0 km',
    rating:
      hotelMatch?.rating ||
      restaurantMatch?.rating ||
      spaMatch?.rating ||
      gamingMatch?.rating ||
      tourMatch?.rating ||
      4.8,
    reviews:
      hotelMatch?.reviews ||
      restaurantMatch?.reviews ||
      spaMatch?.reviews ||
      gamingMatch?.reviews ||
      tourMatch?.reviews ||
      320,
    badge:
      hotelMatch?.badge ||
      restaurantMatch?.badge ||
      spaMatch?.badge ||
      gamingMatch?.badge ||
      tourMatch?.badge ||
      'Inside Airport Security (T2)',
    amenities:
      hotelMatch?.amenities ||
      restaurantMatch?.amenities ||
      spaMatch?.amenities ||
      gamingMatch?.features ||
      tourMatch?.highlights || [
        '🚿 Rain Shower',
        '⚡ High-Speed Wi-Fi',
        '🛋️ 24/7 Check-In',
        '✈️ Flight Status Monitor',
      ],
    description:
      hotelMatch?.description ||
      restaurantMatch?.description ||
      spaMatch?.description ||
      gamingMatch?.description ||
      tourMatch?.description ||
      'Premium stopover service designed for international transit travelers.',
    image:
      hotelMatch?.image ||
      restaurantMatch?.image ||
      spaMatch?.image ||
      gamingMatch?.image ||
      tourMatch?.image ||
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    type: matchedType,
    price:
      hotelMatch?.price3h ||
      restaurantMatch?.avgCost ||
      spaMatch?.price ||
      gamingMatch?.price ||
      tourMatch?.price ||
      '₹0',
    durationHours: hotelMatch ? 3.0 : restaurantMatch ? 1.5 : spaMatch ? 1.0 : gamingMatch ? 2.0 : tourMatch ? 4.0 : 1.0,
  };

  // Slot options based on category
  const slotOptions =
    service.type === 'Hotel'
      ? [
          { label: '3 Hours Micro-Stay', price: '₹3,499', hours: 3 },
          { label: '6 Hours Micro-Stay', price: '₹5,299', hours: 6 },
          { label: '12 Hours Full Stay', price: '₹8,999', hours: 12 },
        ]
      : service.type === 'Dining'
      ? [
          { label: '1.0 Hour Express Table', price: '₹1,299', hours: 1 },
          { label: '1.5 Hours Buffet & Lounge', price: '₹1,800', hours: 1.5 },
          { label: '2.0 Hours Chef Special Table', price: '₹2,400', hours: 2 },
        ]
      : service.type === 'Spa'
      ? [
          { label: '45 Mins Express Reflexology', price: '₹1,999', hours: 0.75 },
          { label: '60 Mins Deep Tissue Massage', price: '₹2,600', hours: 1 },
          { label: '90 Mins Full Body Therapy', price: '₹3,500', hours: 1.5 },
        ]
      : service.type === 'Gaming'
      ? [
          { label: '1 Hour VR & PS5 Station', price: '₹800', hours: 1 },
          { label: '2 Hours Pro Gaming Station', price: '₹1,499', hours: 2 },
          { label: '3 Hours VIP Lounge Access', price: '₹1,999', hours: 3 },
        ]
      : [
          { label: '3 Hours Express Mumbai Tour', price: '₹2,499', hours: 3 },
          { label: '5 Hours Gateway & Colaba Tour', price: '₹3,999', hours: 5 },
          { label: '7 Hours Full Day City Tour', price: '₹5,499', hours: 7 },
        ];

  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  const [checkInTime, setCheckInTime] = useState('2026-07-28T12:00');
  const [travelersCount, setTravelersCount] = useState('1 Adult');

  const selectedSlot = slotOptions[selectedSlotIndex] || slotOptions[0];

  const handleAddToItinerary = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(() => {
      const itemToAdd = {
        id: service.id,
        title: service.name,
        type: service.type.toLowerCase() === 'dining' ? 'restaurant' : service.type.toLowerCase(),
        price: selectedSlot.price || service.price,
        cost: selectedSlot.price || service.price,
        durationHours: selectedSlot.hours || service.durationHours || 1.0,
        image: service.image,
        location: service.location,
        detail: `${selectedSlot.label} • ${service.location} (${travelersCount} Travelers)`,
        badge: service.type,
        time: checkInTime,
      };
      addToItinerary(itemToAdd);
    });
  };

  const isDining = service.type === 'Dining';

  return (
    <div className="min-h-screen pb-20 bg-slate-50/80 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Back Link */}
        <Link
          href={
            service.type === 'Hotel'
              ? '/hotels'
              : service.type === 'Dining'
              ? '/restaurants'
              : service.type === 'Spa'
              ? '/spa-wellness'
              : service.type === 'Gaming'
              ? '/gaming-entertainment'
              : '/experiences'
          }
          className={`inline-flex items-center gap-2 text-xs font-black transition ${
            isDining ? 'text-amber-700 hover:text-amber-800' : 'text-sky-700 hover:text-sky-800'
          }`}
        >
          <ArrowLeft size={14} /> Back to {service.type} Catalog
        </Link>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 md:p-8 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-6">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <span className={`absolute top-4 left-4 px-3 py-1 font-extrabold text-xs rounded-full shadow ${
                  isDining ? 'bg-amber-600 text-white' : 'bg-sky-600 text-white'
                }`}>
                  {service.badge}
                </span>
              </div>
 
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                    isDining ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-sky-50 text-sky-800 border border-sky-200'
                  }`}>
                    {service.type}
                  </span>
                  {service.rating && (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                      ★ {service.rating}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {service.name}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <MapPin className={`w-4 h-4 flex-shrink-0 ${isDining ? 'text-amber-600' : 'text-sky-600'}`} /> {service.location} ({service.distance})
                </p>
              </div>
 
              <div className="flex items-center gap-4 text-xs border-y border-slate-200 py-3">
                <span className="flex items-center gap-1 font-bold text-slate-800">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {service.rating} / 5.0 ({service.reviews} reviews)
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Delay Protection Included
                </span>
              </div>
 
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">Service Overview</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
 
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">Included Highlights & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-sm hover:shadow transition-all ${
                        isDining ? 'hover:bg-rose-50/50 hover:border-rose-300' : 'hover:bg-sky-50/50 hover:border-sky-300'
                      }`}
                    >
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
 
          {/* Booking Side Card */}
          <div>
            <div className="p-6 bg-white border border-slate-200 rounded-3xl sticky top-24 shadow-md space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg font-bold text-slate-900">Select {service.type} Slot</h3>
                <p className="text-xs text-slate-500">Choose your duration and add directly to itinerary.</p>
              </div>
 
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1 tracking-wider">
                    Select Duration Slot
                  </label>
                  <select
                    value={selectedSlotIndex}
                    onChange={(e) => setSelectedSlotIndex(Number(e.target.value))}
                    className={`w-full text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50 text-slate-900 px-3 py-3 cursor-pointer outline-none transition focus:bg-white focus:ring-2 ${
                      isDining ? 'focus:ring-amber-500 focus:border-amber-500' : 'focus:ring-sky-500 focus:border-sky-500'
                    }`}
                  >
                    {slotOptions.map((opt, idx) => (
                      <option key={idx} value={idx}>
                        {opt.label} — {opt.price}
                      </option>
                    ))}
                  </select>
                </div>
 
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1 tracking-wider">
                    Preferred Time
                  </label>
                  <input
                    type="datetime-local"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className={`w-full text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50 text-slate-900 px-3 py-3 outline-none transition focus:bg-white focus:ring-2 ${
                      isDining ? 'focus:ring-amber-500 focus:border-amber-500' : 'focus:ring-sky-500 focus:border-sky-500'
                    }`}
                  />
                </div>
 
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1 tracking-wider">
                    Travelers
                  </label>
                  <select
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(e.target.value)}
                    className={`w-full text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50 text-slate-900 px-3 py-3 cursor-pointer outline-none transition focus:bg-white focus:ring-2 ${
                      isDining ? 'focus:ring-amber-500 focus:border-amber-500' : 'focus:ring-sky-500 focus:border-sky-500'
                    }`}
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3+ Passengers</option>
                  </select>
                </div>
              </div>
 
              <div className={`border p-4 rounded-2xl flex items-center justify-between shadow-inner ${
                isDining ? 'bg-amber-50/70 border-amber-200' : 'bg-sky-50/70 border-sky-200'
              }`}>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Selected Rate</span>
                  <span className={`text-xl font-black ${isDining ? 'text-amber-950' : 'text-sky-950'}`}>{selectedSlot.price}</span>
                </div>
                <span className={`text-xs font-bold bg-white px-3 py-1.5 rounded-lg shadow-sm border ${
                  isDining ? 'text-amber-800 border-amber-200' : 'text-sky-800 border-sky-200'
                }`}>
                  {selectedSlot.hours} Hours
                </span>
              </div>
 
              <button
                type="button"
                onClick={handleAddToItinerary}
                className={`w-full py-4 text-white font-extrabold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isDining 
                    ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800' 
                    : 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800'
                }`}
              >
                <Plus size={16} /> Add to Itinerary
              </button>
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 text-slate-800 p-12 text-center font-bold">Loading details...</div>}>
      <ServiceDetailsContent />
    </Suspense>
  );
}
