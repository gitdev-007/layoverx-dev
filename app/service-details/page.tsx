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
  const { addItem } = useItinerary();
  const { user } = useAuth();

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

  const handleAddToItinerary = () => {
    addItem({
      title: service.name,
      detail: `${selectedSlot.label} • ${service.location}`,
      badge: service.type,
      cost: selectedSlot.price,
      durationHours: selectedSlot.hours,
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-900 text-slate-100">
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
          className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300 transition"
        >
          <ArrowLeft size={14} /> Back to {service.type} Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 md:p-8 bg-slate-800/80 border border-slate-700/60 rounded-3xl shadow-xl space-y-6">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-sky-500 text-white font-bold text-xs rounded-full shadow-md">
                  {service.badge}
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {service.name}
                </h1>
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" /> {service.location} ({service.distance})
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs border-y border-slate-700 py-3">
                <span className="flex items-center gap-1 font-bold text-white">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {service.rating} / 5.0 ({service.reviews} reviews)
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Delay Protection Included
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2">Service Overview</h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-3">Included Highlights & Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {service.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-700"
                    >
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Side Card (Clean Add to Itinerary without screenshot 2 fee breakdown) */}
          <div>
            <div className="p-6 bg-slate-800/80 border border-slate-700/60 rounded-3xl sticky top-24 shadow-xl space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h3 className="text-lg font-bold text-white">Select {service.type} Slot</h3>
                <p className="text-xs text-slate-400">Choose your duration and add directly to itinerary.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Select Duration Slot
                  </label>
                  <select
                    value={selectedSlotIndex}
                    onChange={(e) => setSelectedSlotIndex(Number(e.target.value))}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5 cursor-pointer"
                  >
                    {slotOptions.map((opt, idx) => (
                      <option key={idx} value={idx}>
                        {opt.label} — {opt.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Preferred Time
                  </label>
                  <input
                    type="datetime-local"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Travelers
                  </label>
                  <select
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(e.target.value)}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5 cursor-pointer"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3+ Passengers</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Selected Rate</span>
                  <span className="text-xl font-black text-sky-400">{selectedSlot.price}</span>
                </div>
                <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                  {selectedSlot.hours} Hours
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddToItinerary}
                className="w-full py-4 bg-[#0369a1] hover:bg-[#075985] text-white font-extrabold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
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
    <Suspense fallback={<div className="min-h-screen bg-slate-900 text-white p-12 text-center">Loading details...</div>}>
      <ServiceDetailsContent />
    </Suspense>
  );
}
