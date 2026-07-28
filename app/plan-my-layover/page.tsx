'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

export default function PlanMyLayoverPage() {
  const [destinationArea, setDestinationArea] = useState('near-airport');
  const [arrivalTime, setArrivalTime] = useState('2026-07-28T10:00');
  const [departureTime, setDepartureTime] = useState('2026-07-28T18:00');
  const [travelers, setTravelers] = useState('2');

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
  const [leadPassengerName, setLeadPassengerName] = useState('John Doe');
  const [passportNumber, setPassportNumber] = useState('');
  const [flightIn, setFlightIn] = useState('AI 102 (JFK-BOM)');
  const [emergencyContact, setEmergencyContact] = useState('');

  // Cost calculations
  const cabPrice = selectedCab === 'sedan' ? 899 : 1499;
  const hotelObj = HOTELS_DATA.find((h) => h.id === selectedHotelId);
  const hotelPrice = hotelObj ? parseInt(hotelObj.price6h.replace(/[^0-9]/g, '')) || 3499 : 0;
  
  const diningObj = RESTAURANTS_DATA.find((r) => r.id === selectedDiningId);
  const diningPrice = diningObj ? parseInt(diningObj.avgCost.replace(/[^0-9]/g, '')) || 1800 : 0;

  const tourObj = TOURS_DATA.find((t) => t.id === selectedTourId);
  const tourPrice = tourObj ? parseInt(tourObj.price.replace(/[^0-9]/g, '')) || 3999 : 0;

  const spaObj = SPAS_DATA.find((s) => s.id === selectedSpaId);
  const spaPrice = spaObj ? parseInt(spaObj.price.replace(/[^0-9]/g, '')) || 1999 : 0;

  const gamingObj = GAMING_DATA.find((g) => g.id === selectedGamingId);
  const gamingPrice = gamingObj ? parseInt(gamingObj.price.replace(/[^0-9]/g, '')) || 1499 : 0;

  const totalPrice = cabPrice + hotelPrice + diningPrice + tourPrice + spaPrice + gamingPrice;

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* SEARCH INPUT & HERO */}
      <section className="bg-slate-900 text-white pt-20 pb-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <nav className="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">Plan Layover</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            AI Itinerary Builder & Estimator
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Configure transit details, pick verified hotels, dining, and tours, and generate real-time exit timings.
          </p>

          {/* Interactive Inputs Bar */}
          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-xl">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Destination Area
              </label>
              <select
                value={destinationArea}
                onChange={(e) => setDestinationArea(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm font-semibold text-white focus:ring-2 focus:ring-sky-500"
              >
                <option value="near-airport">Near Mumbai Airport</option>
                <option value="bandra">Bandra (Sea Link District)</option>
                <option value="colaba">Colaba (South Mumbai Heritage)</option>
                <option value="juhu">Juhu Beach Area</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Landing Flight Arrival
              </label>
              <input
                type="datetime-local"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm font-semibold text-white focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Boarding Flight Departure
              </label>
              <input
                type="datetime-local"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm font-semibold text-white focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Travelers Count
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm font-semibold text-white focus:ring-2 focus:ring-sky-500"
              >
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3 Travelers</option>
                <option value="4">4+ Travelers</option>
              </select>
            </div>
          </form>

          {/* Safe Exit Window Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-sky-950/60 border border-sky-900/60 p-4 rounded-2xl text-sky-200 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-sky-400" />
              <span>Calculated Transit window: <strong className="text-white">8h 00m</strong></span>
              <span className="text-sky-700">|</span>
              <span>Buffer allowance: <strong className="text-white">3h 30m</strong> (Immigration + Security check)</span>
            </div>
            <div className="text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/40">
              <CheckCircle2 size={15} /> Safe Window for Exits: 4.5 Hours
            </div>
          </div>

        </div>
      </section>

      {/* SERVICE MARKETPLACE CAROUSEL CHIPS */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Explore Micro-Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <Link href="/hotels" className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center hover:border-[#0369a1] hover:bg-sky-50 transition group">
              <Hotel className="w-5 h-5 text-[#0369a1] mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Hotels</span>
            </Link>
            <Link href="/restaurants" className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center hover:border-orange-500 hover:bg-orange-50 transition group">
              <Utensils className="w-5 h-5 text-orange-600 mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Dining</span>
            </Link>
            <Link href="/spa-wellness" className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center hover:border-purple-500 hover:bg-purple-50 transition group">
              <Sparkles className="w-5 h-5 text-purple-600 mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Spa</span>
            </Link>
            <Link href="/gaming-entertainment" className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center hover:border-fuchsia-500 hover:bg-fuchsia-50 transition group">
              <Gamepad2 className="w-5 h-5 text-fuchsia-600 mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Gaming</span>
            </Link>
            <Link href="/experiences" className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center hover:border-rose-500 hover:bg-rose-50 transition group">
              <Compass className="w-5 h-5 text-rose-600 mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Tours</span>
            </Link>
            <Link href="/airport-transfers" className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center hover:border-slate-800 hover:bg-slate-100 transition group">
              <Car className="w-5 h-5 text-slate-800 mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Cabs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN PLANNER WORKSPACE */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* BUILDER STEPS */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Step 1: Airport Cabs */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-[#0369a1] font-bold flex items-center justify-center text-xs">1</span>
                    <h2 className="text-lg font-bold text-slate-900">Choose Airport Transfer Cab</h2>
                  </div>
                  <span className="text-xs text-slate-500 font-bold uppercase">Surge Proof Flat Rates</span>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setSelectedCab('sedan')}
                    className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition ${
                      selectedCab === 'sedan' ? 'border-[#0369a1] bg-sky-50/50' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={selectedCab === 'sedan'} readOnly className="text-[#0369a1]" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">AC Sedan Transfer (Toyota Etios)</h4>
                        <p className="text-xs text-slate-500">Fits 4 Passengers, 2 Standard Bags. Verified Driver.</p>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-slate-900">₹899 <span className="text-xs font-normal text-slate-500">flat</span></span>
                  </label>

                  <label
                    onClick={() => setSelectedCab('suv')}
                    className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition ${
                      selectedCab === 'suv' ? 'border-[#0369a1] bg-sky-50/50' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={selectedCab === 'suv'} readOnly className="text-[#0369a1]" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">AC SUV Transfer (Innova Crysta)</h4>
                        <p className="text-xs text-slate-500">Fits 6 Passengers, 4 Standard Bags. Extra comfort.</p>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-slate-900">₹1,499 <span className="text-xs font-normal text-slate-500">flat</span></span>
                  </label>
                </div>
              </div>

              {/* Step 2: Transit Hotel */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-[#0369a1] font-bold flex items-center justify-center text-xs">2</span>
                    <h2 className="text-lg font-bold text-slate-900">Add Transit Hotel (Optional)</h2>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">Hourly check-in</span>
                </div>

                <div className="space-y-3">
                  {HOTELS_DATA.slice(0, 3).map((h) => (
                    <label
                      key={h.id}
                      onClick={() => setSelectedHotelId(selectedHotelId === h.id ? null : h.id)}
                      className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition ${
                        selectedHotelId === h.id ? 'border-[#0369a1] bg-sky-50/50' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedHotelId === h.id} readOnly className="text-[#0369a1] rounded" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{h.name}</h4>
                          <p className="text-xs text-slate-500">⭐ {h.rating} | {h.terminal}</p>
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-[#0369a1]">{h.price6h} <span className="text-xs font-normal text-slate-500">/6h</span></span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 3: Dining */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-[#0369a1] font-bold flex items-center justify-center text-xs">3</span>
                    <h2 className="text-lg font-bold text-slate-900">Add Dining Reservation (Optional)</h2>
                  </div>
                  <span className="text-xs text-slate-500 font-bold uppercase">Pre-Booked Tables</span>
                </div>

                <div className="space-y-3">
                  {RESTAURANTS_DATA.slice(0, 2).map((r) => (
                    <label
                      key={r.id}
                      onClick={() => setSelectedDiningId(selectedDiningId === r.id ? null : r.id)}
                      className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition ${
                        selectedDiningId === r.id ? 'border-orange-500 bg-orange-50/50' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedDiningId === r.id} readOnly className="text-orange-600 rounded" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{r.name}</h4>
                          <p className="text-xs text-slate-500">⭐ {r.rating} | {r.location}</p>
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-slate-900">{r.avgCost}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 4: Add Experiences with Tab Switcher */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-[#0369a1] font-bold flex items-center justify-center text-xs">4</span>
                    <h2 className="text-lg font-bold text-slate-900">Add Experiences (Optional)</h2>
                  </div>

                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setExpTab('tours')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        expTab === 'tours' ? 'bg-white text-[#0369a1] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Tours
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpTab('spa')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        expTab === 'spa' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Spa & Wellness
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpTab('gaming')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        expTab === 'gaming' ? 'bg-white text-fuchsia-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Gaming
                    </button>
                  </div>
                </div>

                {/* Tab Content: Tours */}
                {expTab === 'tours' && (
                  <div className="space-y-3">
                    {TOURS_DATA.map((t) => (
                      <label
                        key={t.id}
                        onClick={() => setSelectedTourId(selectedTourId === t.id ? null : t.id)}
                        className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition ${
                          selectedTourId === t.id ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={selectedTourId === t.id} readOnly className="text-rose-600 rounded" />
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                            <p className="text-xs text-slate-500">⭐ {t.rating} | ⏱️ {t.duration} ({t.safeWindow})</p>
                          </div>
                        </div>
                        <span className="text-sm font-extrabold text-slate-900">{t.price}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Tab Content: Spa */}
                {expTab === 'spa' && (
                  <div className="space-y-3">
                    {SPAS_DATA.map((s) => (
                      <label
                        key={s.id}
                        onClick={() => setSelectedSpaId(selectedSpaId === s.id ? null : s.id)}
                        className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition ${
                          selectedSpaId === s.id ? 'border-purple-500 bg-purple-50/50' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={selectedSpaId === s.id} readOnly className="text-purple-600 rounded" />
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{s.name}</h4>
                            <p className="text-xs text-slate-500">⭐ {s.rating} | {s.treatment}</p>
                          </div>
                        </div>
                        <span className="text-sm font-extrabold text-[#0369a1]">{s.price}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Tab Content: Gaming */}
                {expTab === 'gaming' && (
                  <div className="space-y-3">
                    {GAMING_DATA.map((g) => (
                      <label
                        key={g.id}
                        onClick={() => setSelectedGamingId(selectedGamingId === g.id ? null : g.id)}
                        className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition ${
                          selectedGamingId === g.id ? 'border-fuchsia-500 bg-fuchsia-50/50' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={selectedGamingId === g.id} readOnly className="text-fuchsia-600 rounded" />
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{g.name}</h4>
                            <p className="text-xs text-slate-500">⭐ {g.rating} | {g.location}</p>
                          </div>
                        </div>
                        <span className="text-sm font-extrabold text-slate-900">{g.price}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 5: Passenger Registration */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-[#0369a1] font-bold flex items-center justify-center text-xs">5</span>
                    <h2 className="text-lg font-bold text-slate-900">Review & Passenger Registration</h2>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">Instant Sync</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Lead Passenger Name</label>
                    <input
                      type="text"
                      value={leadPassengerName}
                      onChange={(e) => setLeadPassengerName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Passport / ID Number</label>
                    <input
                      type="text"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      placeholder="e.g. A29883910"
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Incoming Flight Number</label>
                    <input
                      type="text"
                      value={flightIn}
                      onChange={(e) => setFlightIn(e.target.value)}
                      placeholder="e.g. AI 102"
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Emergency Contact</label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="+1-xxx-xxx-xxxx"
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-600" /> LayoverX Delay Protection & Visa Guarantee Included
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Free reschedule if your incoming flight is delayed.</li>
                    <li>Full refund on activities if immigration queue exceeds 2 hours.</li>
                    <li>Chauffeur pickup scheduled automatically for 30 minutes after actual landing time.</li>
                  </ul>
                </div>

                <Link
                  href="/my-itinerary"
                  className="w-full py-4 bg-[#0369a1] hover:bg-[#075985] text-white font-extrabold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  🚀 Proceed to Secure Checkout <ArrowRight size={16} />
                </Link>
              </div>

            </div>

            {/* RIGHT SIDEBAR SUMMARY */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Summary Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg sticky top-40 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                    Booking Summary
                  </h3>
                  <span className="bg-sky-50 text-[#0369a1] text-xs font-bold px-2.5 py-0.5 rounded-full border border-sky-100">
                    {travelers} Guests
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex justify-between items-center">
                    <span>Cab Transfer ({selectedCab.toUpperCase()}):</span>
                    <strong className="text-slate-900">₹{cabPrice}</strong>
                  </div>

                  {hotelObj && (
                    <div className="flex justify-between items-center text-emerald-800 font-medium">
                      <span className="truncate max-w-[180px]">{hotelObj.name}:</span>
                      <strong>{hotelObj.price6h}</strong>
                    </div>
                  )}

                  {diningObj && (
                    <div className="flex justify-between items-center text-orange-800 font-medium">
                      <span className="truncate max-w-[180px]">{diningObj.name}:</span>
                      <strong>{diningObj.avgCost}</strong>
                    </div>
                  )}

                  {tourObj && (
                    <div className="flex justify-between items-center text-rose-800 font-medium">
                      <span className="truncate max-w-[180px]">{tourObj.name}:</span>
                      <strong>{tourObj.price}</strong>
                    </div>
                  )}

                  {spaObj && (
                    <div className="flex justify-between items-center text-purple-800 font-medium">
                      <span className="truncate max-w-[180px]">{spaObj.name}:</span>
                      <strong>{spaObj.price}</strong>
                    </div>
                  )}

                  {gamingObj && (
                    <div className="flex justify-between items-center text-fuchsia-800 font-medium">
                      <span className="truncate max-w-[180px]">{gamingObj.name}:</span>
                      <strong>{gamingObj.price}</strong>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Total Price</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#0369a1]">₹{totalPrice.toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button className="py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5">
                    <Bookmark size={14} /> Save Draft
                  </button>
                  <button className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5">
                    <Share2 size={14} /> Share Plan
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
