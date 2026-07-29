'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HOTELS_DATA, RESTAURANTS_DATA, SPAS_DATA, GAMING_DATA, TOURS_DATA } from '@/data/layover-data';
import {
  Plane,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Car,
  Hotel,
  Utensils,
  Compass,
  Sparkles,
  Gamepad2,
  User,
  FileText,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function PlanMyLayoverPage() {
  const [destinationArea, setDestinationArea] = useState('near-airport');
  const [arrivalTime, setArrivalTime] = useState('2026-07-28T10:00');
  const [departureTime, setDepartureTime] = useState('2026-07-28T18:00');
  const [travelers, setTravelers] = useState('2');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  React.useEffect(() => {
    const now = new Date();
    const arr = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
    arr.setMinutes(0);
    const dep = new Date(arr.getTime() + 8 * 60 * 60 * 1000); // 8 hours layover
    setArrivalTime(arr.toISOString().slice(0, 16));
    setDepartureTime(dep.toISOString().slice(0, 16));
  }, []);

  const handleSaveDraft = () => {
    const draftData = {
      destinationArea,
      arrivalTime,
      departureTime,
      travelers,
      selectedCab,
      selectedHotelId,
      selectedDiningId,
      selectedTourId,
      selectedSpaId,
      selectedGamingId,
      totalPrice
    };
    localStorage.setItem('layoverx_draft', JSON.stringify(draftData));
    setSaveStatus('Draft saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSharePlan = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Mumbai Stopover Plan - LayoverX',
        text: `Check out my stopover plan at CSMIA Mumbai for ₹${totalPrice.toLocaleString()}!`,
        url: window.location.href,
      }).catch((err) => console.warn(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSaveStatus('Plan link copied to clipboard!');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };
  const router = useRouter();
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleProceedCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPassengerName.trim()) {
      setValidationError('Lead Passenger Name is required.');
      return;
    }
    if (!passportNumber.trim()) {
      setValidationError('Passport / ID Number is required.');
      return;
    }
    if (!flightIn.trim()) {
      setValidationError('Incoming Flight Number is required.');
      return;
    }
    if (!emergencyContact.trim()) {
      setValidationError('Emergency Contact is required.');
      return;
    }

    setValidationError(null);
    router.push('/my-itinerary');
  };
  // Step selections
  const [selectedCab, setSelectedCab] = useState<'sedan' | 'suv'>('sedan');
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>('h1');
  const [selectedDiningId, setSelectedDiningId] = useState<string | null>('r1');
  
  // Step 4 Experience Tab State
  const [expTab, setExpTab] = useState<'tours' | 'spa' | 'gaming'>('tours');
  const [selectedTourId, setSelectedTourId] = useState<string | null>('t1');
  const [selectedSpaId, setSelectedSpaId] = useState<string | null>(null);
  const [selectedGamingId, setSelectedGamingId] = useState<string | null>(null);

  // Step 5 Registration Inputs
  const [leadPassengerName, setLeadPassengerName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [flightIn, setFlightIn] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  // Cost calculations
  const cabPrice = selectedCab === 'sedan' ? 899 : 1499;
  const hotelObj = HOTELS_DATA.find((h) => h.id === selectedHotelId);
  const hotelPrice = hotelObj ? parseInt(hotelObj.price6h.replace(/[^0-9]/g, '')) || 3499 : 0;
  
  const diningObj = RESTAURANTS_DATA.find((r) => r.id === selectedDiningId);
  const diningPrice = diningObj ? parseInt(diningObj.avgCost.replace(/[^0-9]/g, '')) || 1800 : 0;

  const tourObj = TOURS_DATA.find((t) => t.id === selectedTourId);
  const tourPrice = tourObj ? parseInt(tourObj.price.replace(/[^0-9]/g, '')) || 2899 : 0;

  const spaObj = SPAS_DATA.find((s) => s.id === selectedSpaId);
  const spaPrice = spaObj ? parseInt(spaObj.price.replace(/[^0-9]/g, '')) || 1800 : 0;

  const gamingObj = GAMING_DATA.find((g) => g.id === selectedGamingId);
  const gamingPrice = gamingObj ? parseInt(gamingObj.price.replace(/[^0-9]/g, '')) || 1200 : 0;

  const totalPrice = cabPrice + hotelPrice + diningPrice + tourPrice + spaPrice + gamingPrice;

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* SEARCH INPUT & HERO SECTION */}
      <section className="bg-gray-900 text-white pt-20 sm:pt-24 pb-10 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <nav className="flex items-center gap-2 text-xs text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Plan Layover</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            AI Itinerary Builder & Estimator
          </h1>

          {/* Interactive Inputs Bar */}
          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-800 p-4 rounded-2xl border border-gray-700">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Destination Area
              </label>
              <select
                value={destinationArea}
                onChange={(e) => setDestinationArea(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-xl p-3 text-sm font-semibold text-white focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="near-airport">Near Mumbai Airport</option>
                <option value="bandra">Bandra (Sea Link District)</option>
                <option value="colaba">Colaba (South Mumbai Heritage)</option>
                <option value="juhu">Juhu Beach Area</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Landing Flight Arrival
              </label>
              <input
                type="datetime-local"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-xl p-3 text-sm font-semibold text-white focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Boarding Flight Departure
              </label>
              <input
                type="datetime-local"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-xl p-3 text-sm font-semibold text-white focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Travelers Count
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-xl p-3 text-sm font-semibold text-white focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3 Travelers</option>
                <option value="4">4+ Travelers</option>
              </select>
            </div>
          </form>

          {/* Safe Window Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-sky-950/40 border border-sky-900/50 p-3.5 rounded-xl text-sky-200 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-sky-400" />
              <span>Calculated Transit window: <strong className="text-white">30h 30m</strong></span>
              <span className="text-sky-700">|</span>
              <span>Buffer allowance: <strong className="text-white">3h 30m</strong> (Immigration + Security check)</span>
            </div>
            <div className="text-emerald-400 font-bold flex items-center gap-1">
              🟢 Safe Window for Exits: 27.0 Hours
            </div>
          </div>

        </div>
      </section>

      {/* PREMIUM SERVICE MARKETPLACE CAROUSEL */}
      <section className="bg-white border-b border-gray-100 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Premium Service Marketplace</h2>
              <p className="text-gray-700 text-sm">Add luxury to your transit window</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                <ChevronLeft size={16} className="text-gray-900" />
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                <ChevronRight size={16} className="text-gray-900" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2">
            
            {/* Transit Hotels */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-sky-300 transition duration-300 group flex flex-col justify-between">
              <div className="h-40 relative rounded-xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=75"
                  alt="Hotels"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Transit Hotels</h3>
                <p className="text-gray-700 text-xs mb-4">Luxury day-rooms inside T2 or minutes away.</p>
              </div>
              <Link href="/hotels" className="text-sky-700 text-xs font-bold flex items-center gap-1 hover:underline">
                Explore Hotels &rarr;
              </Link>
            </div>

            {/* Transit Dining */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-sky-300 transition duration-300 group flex flex-col justify-between">
              <div className="h-40 relative rounded-xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=75"
                  alt="Dining"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Transit Dining</h3>
                <p className="text-gray-700 text-xs mb-4">Gourmet seafood and local fine dining guides.</p>
              </div>
              <Link href="/restaurants" className="text-sky-700 text-xs font-bold flex items-center gap-1 hover:underline">
                Explore Dining &rarr;
              </Link>
            </div>

            {/* Spa & Wellness */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-sky-300 transition duration-300 group flex flex-col justify-between">
              <div className="h-40 relative rounded-xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=75"
                  alt="Spa"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Spa & Wellness</h3>
                <p className="text-gray-700 text-xs mb-4">Express massages to melt away travel fatigue.</p>
              </div>
              <Link href="/spa-wellness" className="text-sky-700 text-xs font-bold flex items-center gap-1 hover:underline">
                Explore Spa &rarr;
              </Link>
            </div>

            {/* Gaming & Fun */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-sky-300 transition duration-300 group flex flex-col justify-between">
              <div className="h-40 relative rounded-xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=75"
                  alt="Gaming"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Gaming & Fun</h3>
                <p className="text-gray-700 text-xs mb-4">VR zones and entertainment hubs near terminal.</p>
              </div>
              <Link href="/gaming-entertainment" className="text-sky-700 text-xs font-bold flex items-center gap-1 hover:underline">
                Explore Gaming &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN PLANNER WORKSPACE */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: BUILDER STEPS */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Step 1: Airport Cabs */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">1</span>
                    <h2 className="text-lg font-bold text-gray-900">Choose Airport Transfer Cab</h2>
                  </div>
                  <span className="text-xs text-gray-700 font-semibold uppercase">SURGE PROOF FLAT RATES</span>
                </div>

                <div className="space-y-4">
                  <label
                    onClick={() => setSelectedCab('sedan')}
                    className={`relative border rounded-xl p-4 flex items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                      selectedCab === 'sedan' ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input type="radio" checked={selectedCab === 'sedan'} readOnly className="text-sky-700 focus:ring-sky-500 h-4 w-4 border-gray-300" />
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">AC Sedan Transfer (Toyota Etios)</h3>
                        <p className="text-gray-700 text-xs mt-0.5">Fits 4 Passengers, 2 Standard Bags. Verified Driver.</p>
                      </div>
                    </div>
                    <strong className="text-gray-900 text-sm">₹899 <span className="text-gray-700 text-xs font-normal">flat</span></strong>
                  </label>

                  <label
                    onClick={() => setSelectedCab('suv')}
                    className={`relative border rounded-xl p-4 flex items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                      selectedCab === 'suv' ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input type="radio" checked={selectedCab === 'suv'} readOnly className="text-sky-700 focus:ring-sky-500 h-4 w-4 border-gray-300" />
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">AC SUV Transfer (Innova Crysta)</h3>
                        <p className="text-gray-700 text-xs mt-0.5">Fits 6 Passengers, 4 Standard Bags. Extra comfort.</p>
                      </div>
                    </div>
                    <strong className="text-gray-900 text-sm">₹1,499 <span className="text-gray-700 text-xs font-normal">flat</span></strong>
                  </label>
                </div>
              </div>

              {/* Step 2: Transit Hotel */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">2</span>
                    <h2 className="text-lg font-bold text-gray-900">Add Transit Hotel (Optional)</h2>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg">Hourly check-in</span>
                </div>

                <div className="space-y-4">
                  {HOTELS_DATA.slice(0, 2).map((h) => (
                    <label
                      key={h.id}
                      onClick={() => setSelectedHotelId(selectedHotelId === h.id ? null : h.id)}
                      className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                        selectedHotelId === h.id ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <input type="checkbox" checked={selectedHotelId === h.id} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4" />
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                            {h.name}
                            <span className="bg-sky-100 text-sky-700 text-xs font-bold px-1.5 py-0.5 rounded">
                              {h.locationCategory === 'in-terminal' ? 'Inside T2' : h.distance}
                            </span>
                          </h3>
                          <p className="text-gray-700 text-xs mt-0.5">⭐ {h.rating} | {h.description}</p>
                        </div>
                      </div>
                      <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                        <strong className="text-sky-700 text-sm block">{h.price6h} <span className="text-gray-700 text-xs font-normal">/6h</span></strong>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 3: Dining */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">3</span>
                    <h2 className="text-lg font-bold text-gray-900">Add Dining Reservation (Optional)</h2>
                  </div>
                  <span className="text-xs text-gray-700 font-semibold uppercase">PRE-BOOKED TABLES</span>
                </div>

                <div className="space-y-4">
                  {RESTAURANTS_DATA.slice(0, 2).map((r) => (
                    <label
                      key={r.id}
                      onClick={() => setSelectedDiningId(selectedDiningId === r.id ? null : r.id)}
                      className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                        selectedDiningId === r.id ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <input type="checkbox" checked={selectedDiningId === r.id} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4" />
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm">{r.name}</h3>
                          <p className="text-gray-700 text-xs mt-0.5">⭐ {r.rating} | {r.location}. {r.description}</p>
                        </div>
                      </div>
                      <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                        <strong className="text-sky-700 text-sm block">{r.avgCost} <span className="text-gray-700 text-xs font-normal">for 2</span></strong>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 4: Add Experiences with Tab Switcher */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">4</span>
                    <h2 className="text-lg font-bold text-gray-900">Add Experiences (Optional)</h2>
                  </div>

                  <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setExpTab('tours')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        expTab === 'tours' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Tours
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpTab('spa')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        expTab === 'spa' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Spa & Wellness
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpTab('gaming')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        expTab === 'gaming' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Gaming
                    </button>
                  </div>
                </div>

                {/* Tab Content: Tours */}
                {expTab === 'tours' && (
                  <div className="space-y-4">
                    {TOURS_DATA.slice(0, 2).map((t) => (
                      <label
                        key={t.id}
                        onClick={() => setSelectedTourId(selectedTourId === t.id ? null : t.id)}
                        className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                          selectedTourId === t.id ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input type="checkbox" checked={selectedTourId === t.id} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4" />
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{t.name}</h3>
                            <p className="text-gray-700 text-xs mt-0.5">⭐ {t.rating} | ⏱️ {t.duration} duration. {t.highlights.join(', ')}</p>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                          <strong className="text-sky-700 text-sm block">{t.price} <span className="text-gray-700 text-xs font-normal">/ traveler</span></strong>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {/* Tab Content: Spa */}
                {expTab === 'spa' && (
                  <div className="space-y-4">
                    {SPAS_DATA.slice(0, 2).map((s) => (
                      <label
                        key={s.id}
                        onClick={() => setSelectedSpaId(selectedSpaId === s.id ? null : s.id)}
                        className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                          selectedSpaId === s.id ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input type="checkbox" checked={selectedSpaId === s.id} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4" />
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{s.name}</h3>
                            <p className="text-gray-700 text-xs mt-0.5">⭐ {s.rating} | {s.treatment}. ({s.duration})</p>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                          <strong className="text-sky-700 text-sm block">{s.price} <span className="text-gray-700 text-xs font-normal">/ session</span></strong>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {/* Tab Content: Gaming */}
                {expTab === 'gaming' && (
                  <div className="space-y-4">
                    {GAMING_DATA.slice(0, 2).map((g) => (
                      <label
                        key={g.id}
                        onClick={() => setSelectedGamingId(selectedGamingId === g.id ? null : g.id)}
                        className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                          selectedGamingId === g.id ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input type="checkbox" checked={selectedGamingId === g.id} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4" />
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{g.name}</h3>
                            <p className="text-gray-700 text-xs mt-0.5">⭐ {g.rating} | {g.description}</p>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                          <strong className="text-sky-700 text-sm block">{g.price} <span className="text-gray-700 text-xs font-normal">/ person</span></strong>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 5: Passenger Registration */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">5</span>
                    <h2 className="text-lg font-bold text-gray-900">Review & Passenger Registration</h2>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg">Instant Sync</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lead Passenger Name</label>
                    <input
                      type="text"
                      value={leadPassengerName}
                      onChange={(e) => setLeadPassengerName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Passport / ID Number</label>
                    <input
                      type="text"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      placeholder="Enter passport number"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Incoming Flight Number</label>
                    <input
                      type="text"
                      value={flightIn}
                      onChange={(e) => setFlightIn(e.target.value)}
                      placeholder="e.g. EK-504"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Emergency Contact</label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="+1-xxx-xxx-xxxx"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 border border-gray-200 p-4 rounded-xl text-xs text-gray-700 space-y-2">
                  <p className="font-bold text-gray-900">🛡️ LayoverX Delay Protection & Visa Guarantee Included</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Free reschedule if your incoming flight is delayed.</li>
                    <li>Full refund on activities if immigration queue exceeds 2 hours.</li>
                    <li>Chauffeur pickup scheduled automatically for 30 minutes after actual landing time.</li>
                  </ul>
                </div>

                {validationError && (
                  <div className="p-3 text-xs font-bold text-rose-800 bg-rose-50 border border-rose-100 rounded-xl">
                    ⚠️ {validationError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleProceedCheckout}
                  className="w-full py-4 bg-[#0284C7] hover:bg-[#027ab1] text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  🚀 Proceed to Secure Checkout
                </button>
              </div>

            </div>

            {/* RIGHT SIDEBAR: BOOKING SUMMARY, TIMELINE, MAP */}
            <aside className="w-full lg:col-span-4 space-y-8 lg:sticky lg:top-24">
              
              {/* Booking Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">BOOKING SUMMARY</h2>
                  <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2 py-0.5 rounded-full border border-sky-100">
                    {travelers} Guests
                  </span>
                </div>

                <div className="space-y-3 text-xs text-gray-800">
                  <div className="flex justify-between items-center">
                    <span>🚗 Airport Cabs (Return)</span>
                    <strong className="text-gray-900">₹{cabPrice}</strong>
                  </div>

                  {hotelObj && (
                    <div className="flex justify-between items-center text-sky-800 font-medium">
                      <span className="truncate max-w-[180px]">🏨 {hotelObj.name}</span>
                      <strong>{hotelObj.price6h}</strong>
                    </div>
                  )}

                  {diningObj && (
                    <div className="flex justify-between items-center text-orange-800 font-medium">
                      <span className="truncate max-w-[180px]">🍽️ {diningObj.name}</span>
                      <strong>{diningObj.avgCost}</strong>
                    </div>
                  )}

                  {tourObj && (
                    <div className="flex justify-between items-center text-rose-800 font-medium">
                      <span className="truncate max-w-[180px]">🌆 {tourObj.name}</span>
                      <strong>{tourObj.price}</strong>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-end justify-between mb-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">TOTAL PRICE</span>
                    <div className="text-2xl font-black text-[#0284C7] leading-none">₹{totalPrice.toLocaleString()}</div>
                  </div>
                  <p className="text-[11px] text-gray-400">All taxes, flat-rate cab fees & airport charges included.</p>
                </div>

                <Link
                  href="/my-itinerary"
                  className="h-12 flex items-center justify-center bg-[#0284C7] hover:bg-[#027ab1] text-white font-bold text-sm rounded-xl shadow-md transition w-full"
                >
                  Continue to Book
                </Link>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button 
                    onClick={handleSaveDraft}
                    type="button"
                    className="h-10 flex items-center justify-center bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm transition gap-1.5"
                  >
                    <Bookmark size={14} /> Save Draft
                  </button>
                  <button 
                    onClick={handleSharePlan}
                    type="button"
                    className="h-10 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-bold text-xs rounded-xl border border-gray-200 shadow-sm transition gap-1.5"
                  >
                    <Share2 size={14} /> Share Plan
                  </button>
                </div>
                
                {saveStatus && (
                  <div className="p-2.5 text-center text-xs font-bold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-100 animate-pulse">
                    {saveStatus}
                  </div>
                )}
              </div>

              {/* Your Smart AI Timeline */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h2 className="text-sm font-bold text-gray-900">Your Smart AI Timeline</h2>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    CHECKED
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                    <div className="font-bold text-slate-900">02:55 PM • 🛫 Landing & Customs Exit</div>
                    <div className="text-slate-500 text-[11px]">De-board and pass immigration (calculated wait buffer: 1.5h).</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                    <div className="font-bold text-slate-900">04:25 PM • 🚖 Chauffeur Pickup</div>
                    <div className="text-slate-500 text-[11px]">Meet your driver at Exit Gate 2. Board AC SEDAN.</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                    <div className="font-bold text-slate-900">07:25 PM • 🚖 Airport Dropoff</div>
                    <div className="text-slate-500 text-[11px]">Driver drops you directly at departure ramp T2.</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                    <div className="font-bold text-slate-900">09:25 PM • 🛫 Takeoff & Departure</div>
                    <div className="text-slate-500 text-[11px]">Security cleared. Boarding at assigned gate. Safe travels!</div>
                  </div>
                </div>
              </div>

              {/* Estimated Travel Route Map */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-sm text-gray-900">Estimated Travel Route Map</h3>
                </div>
                <div className="h-44 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=75"
                    alt="Route Map"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* My Saved Itineraries */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h2 className="text-sm font-bold text-gray-900">My Saved Itineraries</h2>
                  <span className="w-5 h-5 bg-sky-50 text-sky-700 rounded-full flex items-center justify-center text-xs font-bold">
                    0
                  </span>
                </div>
                <p className="text-xs text-gray-500 italic text-center py-2">
                  No saved itineraries. Build a plan and click "Save Plan" above.
                </p>
              </div>

            </aside>

          </div>
        </div>
      </section>

    </div>
  );
}
