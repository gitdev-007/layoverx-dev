'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Star,
  MapPin,
  ShieldCheck,
  Clock,
  Check,
  Plus,
  AlertCircle,
  ArrowLeft,
  Luggage,
  Wifi,
  Coffee,
  Sparkles,
  Navigation,
  Info,
  Utensils,
  Bed,
  Compass,
  Gamepad2,
  Car,
  FileCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { HOTELS_DATA, RESTAURANTS_DATA, SPAS_DATA, GAMING_DATA, TOURS_DATA } from '@/data/layover-data';
import { EXTENDED_SERVICE_DETAILS } from '@/data/service-details-extended';
import { useItinerary } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';

function ServiceDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('id') || 'h1';
  const extended = EXTENDED_SERVICE_DETAILS[serviceId];
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

  const isAirside =
    (hotelMatch && (hotelMatch.terminal?.includes('T2') && hotelMatch.locationCategory === 'in-terminal')) ||
    serviceId === 'h1' ||
    serviceId === 's1' ||
    serviceId === 's4' ||
    serviceId === 'g1' ||
    (hotelMatch?.terminal?.toLowerCase().includes('inside') ?? false);

  const transitTime =
    hotelMatch?.transitTime ||
    restaurantMatch?.transitTime ||
    spaMatch?.transitTime ||
    gamingMatch?.transitTime ||
    tourMatch?.transitTime ||
    '10–20 mins taxi';

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
    transitTime,
    isAirside,
    minLayover:
      isAirside ? '2.5+ Hours Layover' : '5+ Hours Layover Recommended',
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
      (isAirside ? 'Inside T2 Security' : 'Airport Enclave'),
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
  const [checkInTime, setCheckInTime] = useState(() => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const d = new Date(Date.now() + 2 * 60 * 60 * 1000);
    d.setMinutes(0, 0, 0);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  });
  const [travelersCount, setTravelersCount] = useState('1 Adult');

  const selectedSlot = slotOptions[selectedSlotIndex] || slotOptions[0];

  const handleAddToItinerary = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (new Date(checkInTime).getTime() < Date.now() - 60 * 1000) {
      alert('⚠️ Preferred booking time cannot be in the past. Please select the current time or a future date/time.');
      return;
    }

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
                {extended?.tagline && (
                  <p className="text-xs sm:text-sm font-semibold text-[#0369a1]">
                    {extended.tagline}
                  </p>
                )}
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <MapPin className={`w-4 h-4 flex-shrink-0 ${isDining ? 'text-amber-600' : 'text-sky-600'}`} /> {service.location} ({service.distance})
                </p>
              </div>

              {/* Transit Quick Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-xs">
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Transit Commute</span>
                  <strong className="text-slate-900 font-extrabold flex items-center gap-1 mt-0.5">
                    <Clock size={13} className="text-[#0369a1]" /> {service.transitTime}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Clearance Zone</span>
                  <strong className={`font-extrabold flex items-center gap-1 mt-0.5 ${
                    service.isAirside ? 'text-emerald-700' : 'text-amber-800'
                  }`}>
                    <Navigation size={13} /> {service.isAirside ? 'Airside (Inside T2)' : 'Landside (City)'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Suggested Window</span>
                  <strong className="text-slate-900 font-extrabold flex items-center gap-1 mt-0.5">
                    <ShieldCheck size={13} className="text-emerald-600" /> {service.minLayover}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Luggage Security</span>
                  <strong className="text-slate-900 font-extrabold flex items-center gap-1 mt-0.5">
                    <Luggage size={13} className="text-[#0369a1]" /> Included / Safe
                  </strong>
                </div>
              </div>

              {/* Clearance & Immigration Advisory Notice */}
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
                service.isAirside
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}>
                <Info size={16} className={`flex-shrink-0 mt-0.5 ${service.isAirside ? 'text-emerald-700' : 'text-amber-700'}`} />
                <div>
                  <strong className="font-extrabold block mb-0.5">
                    {service.isAirside
                      ? '✈️ Airside Post-Security Facility (Inside Terminal 2)'
                      : '🛬 Landside Airport Enclave (Outside Terminal Building)'}
                  </strong>
                  <p>
                    {service.isAirside
                      ? 'Directly accessible from domestic and international transit concourses inside Terminal 2 without passing through Indian Immigration or Customs. Requires an onward boarding pass for a connecting flight departing from Terminal 2.'
                      : 'Located outside the terminal gates. International passengers must pass through Indian Immigration and Customs (valid Indian Tourist or Transit e-Visa required). LayoverX builds traffic-buffered return windows so you return to security on time.'}
                  </p>
                </div>
              </div>

              {/* Detailed Service Overview */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck size={18} className="text-[#0369a1]" /> About This Venue & Layover Suitability
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {extended?.fullOverview || service.description}
                </p>
              </div>

              {/* Terminal Access & Transit Route Guide */}
              {extended?.terminalAccessGuide && (
                <div className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-2xl space-y-2 text-xs">
                  <div className="font-bold text-sky-950 flex items-center gap-2 text-sm">
                    <Navigation size={16} className="text-[#0369a1]" /> Airport Terminal & Commute Route
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {extended.terminalAccessGuide}
                  </p>
                  {extended.transitTimingBreakdown && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-sky-200/60 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Normal Travel Time:</span>
                        <strong className="text-slate-900">{extended.transitTimingBreakdown.normalMinutes}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Peak Traffic Travel:</span>
                        <strong className="text-slate-900">{extended.transitTimingBreakdown.peakMinutes}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Recommended Departure Buffer:</span>
                        <strong className="text-emerald-700">{extended.transitTimingBreakdown.recommendedDepartureBuffer}</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Venue Specifications */}
              {extended?.venueSpecifications && extended.venueSpecifications.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-600" /> Venue Specifications
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {extended.venueSpecifications.map((spec, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">{spec.label}</span>
                        <strong className="text-slate-900 font-bold text-right ml-2">{spec.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Signature Highlights */}
              {extended?.signatureHighlights && extended.signatureHighlights.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Star size={18} className="text-amber-500 fill-amber-500" /> Signature Highlights & What Sets It Apart
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {extended.signatureHighlights.map((hl, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <strong className="text-xs font-bold text-slate-900 block">{hl.title}</strong>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{hl.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included & What's Excluded */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl space-y-2">
                  <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-emerald-600" /> What's Included
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {(extended?.whatsIncluded || service.amenities).map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span> {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle size={15} className="text-slate-400" /> What's Excluded
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {(extended?.whatsExcluded || ['Personal retail shopping', 'Alcoholic beverages (unless specified)']).map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400">✕</span> {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Insider Layover Tips */}
              {extended?.layoverTips && extended.layoverTips.length > 0 && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-2 text-xs">
                  <div className="font-bold text-amber-950 flex items-center gap-1.5">
                    <HelpCircle size={16} className="text-amber-700" /> Transit Insider Advice
                  </div>
                  <ul className="space-y-1 text-[11px] text-amber-900 leading-relaxed">
                    {extended.layoverTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3-Step Layover Guide */}
              <div className="space-y-3 pt-2">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Navigation size={18} className="text-[#0369a1]" /> How It Works on Your Layover
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#0369a1] text-white text-xs font-extrabold flex items-center justify-center">1</span>
                    <strong className="text-xs font-bold text-slate-900 block">Touchdown & Path</strong>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {service.isAirside ? 'Follow transit signs inside T2 concourse directly to the venue.' : 'Exit baggage claim and meet your pre-arranged shuttle/taxi at the pickup zone.'}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#0369a1] text-white text-xs font-extrabold flex items-center justify-center">2</span>
                    <strong className="text-xs font-bold text-slate-900 block">Instant Check-in</strong>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Show your LayoverX confirmation voucher and boarding pass on your phone for instant entry.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#0369a1] text-white text-xs font-extrabold flex items-center justify-center">3</span>
                    <strong className="text-xs font-bold text-slate-900 block">Timed Departure</strong>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Receive an automated alert when it is time to return to security gates (90–150m buffer).
                    </p>
                  </div>
                </div>
              </div>

              {/* Policies & Delay Safeguard */}
              <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-600" /> LayoverX Transit Guarantee & Policies
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div>• <strong>Flight Delay Reschedule:</strong> Inbound flight late? Slot auto-adjusts at zero cost.</div>
                  <div>• <strong>Required Documents:</strong> Valid photo ID/passport + onward flight boarding pass.</div>
                  <div>• <strong>Luggage Protocol:</strong> Hand luggage & trolley bags stored safely on-premises.</div>
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
                    min={(() => {
                      const pad = (n: number) => String(n).padStart(2, '0');
                      const d = new Date();
                      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                    })()}
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
                <Plus size={16} /> Add to Plan
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
