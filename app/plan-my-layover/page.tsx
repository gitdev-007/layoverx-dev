'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HOTELS_DATA, RESTAURANTS_DATA, TOURS_DATA, TRANSFERS_DATA } from '@/data/layover-data';
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
  Plus,
  Trash2,
} from 'lucide-react';

export default function PlanMyLayoverPage() {
  const [destinationArea, setDestinationArea] = useState('near-airport');
  const [arrivalTime, setArrivalTime] = useState('2026-07-28T10:00');
  const [departureTime, setDepartureTime] = useState('2026-07-28T18:00');
  const [travelers, setTravelers] = useState('2');

  const [selectedCab, setSelectedCab] = useState<'sedan' | 'suv'>('sedan');
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>('h1');
  const [selectedDiningId, setSelectedDiningId] = useState<string | null>('r1');
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);

  const cabPrice = selectedCab === 'sedan' ? 899 : 1499;
  const hotelObj = HOTELS_DATA.find((h) => h.id === selectedHotelId);
  const hotelPrice = hotelObj ? parseInt(hotelObj.price6h.replace(/[^0-9]/g, '')) || 3499 : 0;
  
  const diningObj = RESTAURANTS_DATA.find((r) => r.id === selectedDiningId);
  const diningPrice = diningObj ? parseInt(diningObj.avgCost.replace(/[^0-9]/g, '')) || 1800 : 0;

  const tourObj = TOURS_DATA.find((t) => t.id === selectedTourId);
  const tourPrice = tourObj ? parseInt(tourObj.price.replace(/[^0-9]/g, '')) || 3999 : 0;

  const totalPrice = cabPrice + hotelPrice + diningPrice + tourPrice;

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* SEARCH & CALCULATION HERO */}
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
            Input flight details to compute safe exit windows and build your custom Mumbai stopover package.
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

          {/* Calculated Safe Window Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-sky-950/60 border border-sky-900/60 p-4 rounded-2xl text-sky-200 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-sky-400" />
              <span>Transit window: <strong className="text-white">8h 00m</strong></span>
              <span className="text-sky-700">|</span>
              <span>Buffer deduction: <strong className="text-white">3h 30m</strong> (Immigration + Security)</span>
            </div>
            <div className="text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/40">
              <CheckCircle2 size={15} /> Safe Window for Exits: 4.5 Hours
            </div>
          </div>

        </div>
      </section>

      {/* SERVICE MARKETPLACE CAROUSEL */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Explore Service Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <Link href="/hotels" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center hover:border-[#0369a1] hover:bg-sky-50 transition group">
              <Hotel className="w-6 h-6 text-[#0369a1] mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Transit Hotels</span>
            </Link>
            <Link href="/restaurants" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center hover:border-orange-500 hover:bg-orange-50 transition group">
              <Utensils className="w-6 h-6 text-orange-600 mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Transit Dining</span>
            </Link>
            <Link href="/spa-wellness" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center hover:border-purple-500 hover:bg-purple-50 transition group">
              <Clock className="w-6 h-6 text-purple-600 mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Spa & Wellness</span>
            </Link>
            <Link href="/gaming-entertainment" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center hover:border-fuchsia-500 hover:bg-fuchsia-50 transition group">
              <Plane className="w-6 h-6 text-fuchsia-600 mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Gaming Lounges</span>
            </Link>
            <Link href="/experiences" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center hover:border-rose-500 hover:bg-rose-50 transition group">
              <Compass className="w-6 h-6 text-rose-600 mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">City Tours</span>
            </Link>
            <Link href="/airport-transfers" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center hover:border-slate-800 hover:bg-slate-100 transition group">
              <Car className="w-6 h-6 text-slate-800 mx-auto mb-1 group-hover:scale-110 transition" />
              <span className="text-xs font-bold text-slate-900 block">Airport Cabs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* BUILDER WORKSPACE */}
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

            </div>

            {/* SUMMARY SIDEBAR */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg sticky top-40 space-y-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-3">
                  Trip Summary & Estimate
                </h3>

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
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Total Price</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#0369a1]">₹{totalPrice.toLocaleString()}</span>
                </div>

                <Link
                  href="/my-itinerary"
                  className="w-full py-4 bg-[#0369a1] hover:bg-[#075985] text-white font-extrabold text-sm rounded-xl transition shadow-md text-center flex items-center justify-center gap-2"
                >
                  Save & Checkout Itinerary <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
